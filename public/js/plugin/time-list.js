(function ($) {


    $.fn.timeList = function (options) {
        options = options || {};
        var setting = $.extend({
            start: (new Date()).setHours(6, 0, 0, 0),
            end: (new Date()).setHours(20, 0, 0, 0),
        }, options);

        var el = this;
        var data = toArray();
        console.log(data);
        function render() {

        }

        function toArray() {
            var step = 5 * 60 * 1000;
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
