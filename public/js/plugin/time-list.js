(function ($) {


    $.fn.timeList = function (options) {
        options = options || {};
        var setting = $.extend({
            start: (new Date()).setHours(6, 0, 0, 0),
            end: (new Date()).setHours(20, 0, 0, 0),
            step: 10,
            disable: [
                {start: (new Date()).setHours(14, 0, 0, 0), end: (new Date()).setHours(15, 30, 0, 0)}
            ], // {start, end} -- js timestamp
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
                    var timeStart = row[0] + (i - 1) * setting.step * 60 * 1000;
                    var timeEnd = row[0] + i * setting.step * 60 * 1000;
                    var className = '';
                    if (!isFreeTime(timeStart)) {
                        className = ' d'
                    }

                    li = $("<li class='i" + className + "' style='width: " + size + "%;'><div><small>" + row[i] + "</div></small></li>");

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

            if (!selectStart) {
                selectStart = timeStart;
                selectEnd = timeEnd;
                selectItem(item);
            } else if (selectStart === timeStart) {
                // todo
            } else {
                if (selectStart < timeStart) {
                    fillTime(selectStart, timeEnd, true);
                } else {
                    fillTime(timeStart, selectEnd, false);
                }
            }

            // if (isFreeTime(timeStart)) {
            //     if (!selectStart) {
            //         selectStart = timeStart;
            //         selectEnd = timeEnd;
            //         selectItem(item);
            //     } else if (selectEnd === timeStart) {
            //         selectEnd = timeEnd;
            //         selectItem(item);
            //     } else if (isCanFillTime(selectEnd, timeStart)) {
            //         fillTime(selectEnd, timeEnd);
            //         selectEnd = timeEnd;
            //     } else {
            //         selectStart = timeStart;
            //         selectEnd = timeEnd;
            //         deselectAll();
            //         selectItem(item);
            //     }
            // } else {
            //     // handel error
            // }
        }

        function dblclickItem() {
            var item = $(this);
        }

        function isFreeTime(time) {
            for (var i = 0; i < setting.disable.length; ++i) {
                if (time >= setting.disable[0].start && time < setting.disable[0].end) {
                    return false;
                }
            }
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

        function fillTime(start, end, inc) {
            var step = setting.step * 60 * 1000;
            var doSelect = true;
            var selStart = null;
            var selEnd = null;
            var i;
            if (inc) {
                selStart = start;
                for (i = start; i < end; i += step) {
                    if (!isFreeTime(i)) {
                        errorItem(getItemByTime(i));
                        doSelect = false;
                    }
                    if (doSelect) {
                        selEnd = i;
                        selectItem(getItemByTime(i));
                    }
                }
            } else {
                doSelect = false;
                for (i = end; i > start; i -= step) {
                    if (isFreeTime(i)) {
                        doSelect = true;
                        selectItem(getItemByTime(i));
                    } else {
                        doSelect = doSelect && false;
                    }
                    selectItem(getItemByTime(i));
                }
            }
            return {
                start: selStart,
                end: selEnd,
            };
        }

        function getItemByTime(time) {
            return items[time];
        }

        function deselectAll() {
            items.forEach(function() {
                deselectItem(item);
            });
        }

        function errorItem(item) {
            var timer = item.data("timer");
            var timerError = item.data("timerError");
            if (timer) {
                clearTimeout(timer);
            }
            if (timerError) {
                clearTimeout(timerError);
            }
            item.addClass("e");
            item.addClass("e-a");
            timer = setTimeout((function (item) {
                return function () {
                    item.removeClass("e-a");
                    item.data("timer", null);
                }
            })(item), 400);
            timerError = setTimeout((function (item) {
                return function () {
                    item.removeClass("e");
                    item.data("timerError", null);
                }
            })(item), 1400);
            item.data("timer", timer);
            item.data("timerError", timerError);
        }

        function selectItem(item) {
            if (item.hasClass("s")) {
                return;
            }
            var timer = item.data("timer");
            if (timer) {
                clearTimeout(timer);
            }
            item.addClass("s");
            item.addClass("s-a");
            timer = setTimeout((function (item) {
                return function () {
                    item.removeClass("s-a");
                    item.data("timer", null);
                }
            })(item), 300);
            item.data("timer", timer);
        }

        function deselectItem(item) {
            item.removeClass("s");
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
