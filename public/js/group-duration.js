(function ($) {

    $.fn.groupDuration = function (options) {
        var el = this;
        var settings = $.extend(el.data(), options || {});
        if(settings.default !== null) settings.default = strToValue(settings.default);
        if(settings.min !== null) settings.min = strToValue(settings.min);
        if(settings.max !== null) settings.max = strToValue(settings.max);
        var value;

        var input = el.find("input");
        var plus = el.find("button").last();
        var minus = el.find("button").first();


        var to = null;
        var int = null;

        if (settings.default) {
            input.val(settings.default);
        }
        setValue(strToValue(input.val()));

        input.on("change focusout blur", function () {
            setValue(strToValue($(this).val()));
        });

        plus.on("mousedown", function () {
            setValue(++value);
            to = setTimeout(function () {
                int = setInterval(function () {
                    setValue(++value);
                }, 75);
            }, 500);
        }).on("mouseup mouseleave", function () {
            clearTimeout(to);
            clearInterval(int);
        });
        minus.on("mousedown", function () {
            setValue(--value);
            to = setTimeout(function () {
                int = setInterval(function () {
                    setValue(--value);
                }, 75);
            }, 500);
        }).on("mouseup mouseleave", function () {
            clearTimeout(to);
            clearInterval(int);
        });


        function setValue(val) {
            value = parseInt(val);
            if (isNaN(value)) {
                value = 0;
            }

            if (settings.max !== null) {
                if (value > settings.max) {
                    value = settings.max;
                }
            }

            if (settings.min !== null) {
                if (value < settings.min) {
                    value = settings.min;
                }
            }

            el.data("value", value);
            el.data("value-time", valueToTime(value));
            input.val(valueToTime(value));
        }

        function strToValue(time) {
            if (!time) {
                return null;
            }
            var num = 0;

            var arr = time.split(" ");
            if (arr[1] === "pm") {
                num += 12 * 60;
            }
            var arr2 = arr[0].split(":");

            var hour = parseInt(arr2[0]);
            var minute = parseInt(arr2[1]);

            num += hour * 60 + minute;

            return num;
        }

        function valueToTime(num) {
            var hour = Math.floor(num / 60);
            var minute = num % 60;
            if (hour >= 12) {
                if (hour > 12) {
                    hour %= 12;
                }
            }
            if (minute < 10) {
                minute = "0" + minute;
            }
            return hour + ":" + minute;
        }

        return this;
    };
}(jQuery));
