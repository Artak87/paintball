jQuery(document).ready(function ($) {

    var duration = 0;

    $(".time-list li span").click(function () {
        var element = $(this);

        if (element.hasClass("badge-primary")) {
            element.removeClass("badge-primary").addClass("badge-success");
            $("#startTime").val("");
            duration -= 0.5;
        } else {
            element.removeClass("badge-success").addClass("badge-primary");
            var t = element.text();
            $("#startTime").val(t);
            duration += 0.5;

        }
        //console.log(element);
        $("#duration").val(duration);
    });

    function calcualtePrice(playersNumber, duration) {
        var x, y, z;
        x = playersNumber;
        y = duration;
        z = x * (y * 20);
        return z;
    }


    $("#show").click(function () {
        $(".contactInformationGroup").show(1000);
    });

    $("#hide").click(function () {
        $(".contactInformationGroup").hide(1000);
    });



});
