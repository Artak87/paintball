(function ($) {


    $.fn.price = function (options) {
        options = options || {};

        var el = this;
        var priceValueElement = el.find(".price-value");
        var setting = $.extend({}, options);

        function formatMoney(n, c, d, t) {
            c = isNaN(c = Math.abs(c)) ? 2 : c;
            d = d == undefined ? "." : d;
            t = t == undefined ? "," : t;
            var s = n < 0 ? "-" : "",
                i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
                j = (j = i.length) > 3 ? j % 3 : 0;
            return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        }

        function priceForMinute() {
            if (setting.minute) {
                return setting.minute;
            }
            if (setting.hour) {
                return setting.hour / 60;
            }

            return 0;
        }

        el.calculate = function (playersNumber, duration, startTime) {
            var k = priceForMinute();
            var price = playersNumber * duration * k;

            el.showPrice(price);
        };

        el.showPrice = function (val) {
            val = formatMoney(val, 2, ".", " ");
            priceValueElement.text(val);
        };

        return el;
    }

}(jQuery));
