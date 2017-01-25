jQuery(document).ready(function ($) {

    $(".time-list li span").click(function () {
        var element = $(this);
        element.removeClass("badge-success").addClass("badge-primary");
    })
});
