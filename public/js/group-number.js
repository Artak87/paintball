(function ( $ ) {

    $.fn.groupNumber = function(options) {
        options = options || {};
        var el = this;
        var settings = $.extend({}, el.data(), options);
        var value;

        var input = el.find("input");
        var plus = el.find("button").last();
        var minus = el.find("button").first();


        var to = null; // Timeout object
        var int = null; // Interval object

        if (settings.default) {
            input.val(settings.default);
        }
        setValue(input.val());

        input.on("change focusout blur", function () {
            setValue($(this).val());
        });

        plus.on("mousedown", function () {
            setValue(value+1);
            to = setTimeout(function () {
                int = setInterval(function () {
                    setValue(value+1);
                }, 75);
            }, 500);
        }).on("mouseup mouseleave", function () {
            clearTimeout(to);
            clearInterval(int);
        });
        minus.on("mousedown", function () {
            setValue(value-1);
            to = setTimeout(function () {
                int = setInterval(function () {
                    setValue(value-1);
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
            input.val(value);
        }

        el.getValue = function() {
            return value;
        };

        return el;
    };

}( jQuery ));
