jQuery(document).ready(function ($) {

    var step = 10;
    var playersNumberElement = $(".group-number").groupNumber();
    var startTimeElement = $(".group-number-time").groupNumberTime({
        step: step
    });
    var durationElement = $(".group-duration").groupDuration({
        step: step
    });
    var priceElement = $("#price").price({
        hour: 5,
        input: $("input[name='price']")
    });
    var timeList = $("#time-list").timeList({
        step: step
    });


    durationElement.on("change", calculatePrice);
    startTimeElement.on("change", calculatePrice);
    playersNumberElement.on("change", calculatePrice);

    function calculatePrice() {
        var startTime = startTimeElement.getValue();
        var playersNumber = playersNumberElement.getValue();
        var duration = durationElement.getValue();

        priceElement.calculate(playersNumber, duration, startTime);
    }
    calculatePrice();

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

    $("#deselect-all").click(function () {
        timeList.deselectAll();
        return false;
    });

    function _calculatePrice() {
        var duration = parseInt($("#duration").val());
        var playersNumber = parseInt($("#playersNumber").val()) ;

        var price = playersNumber * (duration * 20);

    }


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
