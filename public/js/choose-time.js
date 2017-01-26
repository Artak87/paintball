jQuery(document).ready(function ($) {

    $(".time-list li span").click(function () {
        var element = $(this);

        element.removeClass("badge-success").addClass("badge-primary");
        //console.log(element);
            var t = element.text();
            // alert(t);
            $("#startTime").val(t);


    });

    $("#show").click(function () {
        $(".contactInformationGroup").show(1000);
    });

    $("#hide").click(function () {
        $(".contactInformationGroup").hide(1000);
    });



});
