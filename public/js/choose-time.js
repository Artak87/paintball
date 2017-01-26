jQuery(document).ready(function ($) {

    $(".time-list li span").click(function () {
        var element = $(this);

        if (element.hasClass("badge-primary")) {
            element.removeClass("badge-primary").addClass("badge-success");
        } else {
            element.removeClass("badge-success").addClass("badge-primary");
            var t = element.text();
            // alert(t);
            $("#startTime").val(t);
        }
        //console.log(element);



    });

    $("#show").click(function () {
        $(".contactInformationGroup").show(1000);
    });

    $("#hide").click(function () {
        $(".contactInformationGroup").hide(1000);
    });



});
