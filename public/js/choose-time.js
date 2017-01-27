jQuery(document).ready(function ($) {

    $(".group-number").groupNumber();
    $(".group-number-time").groupNumberTime();
    $(".group-duration").groupDuration();

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

    function calculatePrice() {
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
