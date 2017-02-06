(function ($) {


    $.fn.timeNow = function (options) {
        options = options || {};

        var el = this;

        var currentdate = new Date();
        var datetime = "Now: " + currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        document.write(datetime);

        return el;
    }

}(jQuery));
