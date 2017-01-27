jQuery(document).ready(function ($) {

    var playersNumberElement = $(".group-number").groupNumber();
    var startTimeElement = $(".group-number-time").groupNumberTime();
    var durationElement = $(".group-duration").groupDuration();
    var priceElement = $("#price");

    durationElement.on("change", calculatePrice);

    function calculatePrice() {
        var startTime = startTimeElement.getValue();
        var playersNumber = playersNumberElement.getValue();
        var duration = durationElement.getValue();

        var price = playersNumber * duration * (1/6) + 10;
        price = Math.round(price);
        priceElement.text("$" + price);
    }








    $(".time-list li span").click(function () {
        var element = $(this);
        var duration = getDuration();

        if (element.hasClass("badge-primary")) {
            element.removeClass("badge-primary").addClass("badge-success");
            duration -= element.data("duration");
            $("#startTime").val("");

        } else {
            element.removeClass("badge-success").addClass("badge-primary");
            var t = element.text();
            $("#startTime").val(t);
            duration += element.data("duration");

        }


        setDuration(duration);
        calculatePrice();
    });

    function _calculatePrice() {
        var duration = parseInt($("#duration").val());
        var playersNumber = parseInt($("#playersNumber").val()) ;

        var price = playersNumber * (duration * 20);

    }


    $("#show").click(function () {
        $(".contactInformationGroup").show("fast");
    });

    $("#hide").click(function () {
        $(".contactInformationGroup").hide("fast");
    });

    function setDuration(duration) {
        var hour = parseInt(duration / 60);
        var minute = parseInt(duration % 60);
        if (minute < 10) {
            minute = "0" + minute;
        }
        $("#duration").data("duration", duration).val(hour + ":" + minute);
    }

    function getDuration() {
        return $("#duration").data("duration") || 0;
    }

});
