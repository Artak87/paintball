(function ($) {


    $.fn.timeList = function (options) {
        options = options || {};
        var setting = $.extend({
            start: (new Date()).setHours(6, 0, 0, 0),
            end: (new Date()).setHours(20, 0, 0, 0),
            step: 10,
        }, options);

        var el = this;
        var selectStart = null;
        var selectEnd = null;
        var data = toArray();
        var items = {};

        function render() {
            var ul = $("<ul class='m-0 p-0'></ul>");

            data.forEach(function (row) {
                var li;
                var size = 75 / (row.length - 1);

                li = $("<li style='width: 25%;' class='text-right'><small class='pr-2'>" + formatTime(row[0]) + "</small></li>");
                ul.append(li);


                for (var i = 1; i < row.length; ++i) {
                    li = $("<li style='width: " + size + "%;'><small>" + row[i] + "</small></li>");

                    var timeStart = row[0] + (i - 1) * setting.step * 60 * 1000;
                    var timeEnd = row[0] + i * setting.step * 60 * 1000;
                    li.data('timeStart', timeStart);
                    li.data('timeEnd', timeEnd);

                    li.click(clickItem);
                    li.dblclick(dblclickItem);

                    items[timeStart] = li;

                    ul.append(li);
                }
            });

            el.append(ul);
        }

        function clickItem() {
            var item = $(this);
            var timeStart = item.data('timeStart');
            var timeEnd = item.data('timeEnd');
            if (isFreeTime(timeStart)) {
                if (!selectStart) {
                    selectStart = timeStart;
                    selectEnd = timeEnd;
                    selectItem(item);
                } else if (selectEnd === timeStart) {
                    selectEnd = timeEnd;
                    selectItem(item);
                } else  if (isCanFillTime(selectEnd, timeStart)) {
                    fillTime(selectEnd, timeEnd);
                    selectEnd = timeEnd;
                } else {
                    selectStart = timeStart;
                    selectEnd = timeEnd;
                    deselectAll();
                    selectItem(item);
                }
            } else {
                // handel error
            }
        }

        function dblclickItem() {
            var item = $(this);
        }

        function isFreeTime(time) {
            return true;
        }

        function isCanFillTime(start, end) {
            var step = setting.step * 60 * 1000;
            for (var i = start; i <= end; i += step) {
                if (!isFreeTime(i)) {
                    return false;
                }
            }
            return true;
        }

        function fillTime(start, end) {
            var step = setting.step * 60 * 1000;
            for (var i = start + step; i <= end; i += step) {
                selectItem(getItemByTime(i));
            }
        }

        function getItemByTime(time) {
            return items[time];
        }

        function deselectAll() {
            items.forEach(function() {
                deselectItem(item);
            });
        }

        function selectItem(item) {
            item.addClass("o");
        }

        function deselectItem(item) {
            item.removeClass("o");
        }

        function formatTime(timestamp) {
            var date = new Date(timestamp);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            return hours + ':' + minutes + ' ' + ampm;
        }

        function toArray() {
            var step = setting.step * 60 * 1000;
            var res = [];
            var index;
            for (var time = setting.start; time < setting.end; time += step) {
                index = Math.floor((time - setting.start) / (60 * 60 * 1000));
                if (!res[index]) {
                    res[index] = [];
                    res[index].push(time);
                }
                res[index].push( (time - res[index][0] + step) / (60 * 1000));
            }
            return res;
        }

        render();


        return el;
    }

}(jQuery));
