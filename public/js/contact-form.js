jQuery(document).ready(function ($) {

    var form = $('#contact-form');
    var loadingForm = form.find(".loading");

    form.submit(function (event) {
        event.preventDefault();

        var isValid = true;
        var message = {};

        form.find('.form-group').each(function() {
            var formGroup = $(this);
            var input = formGroup.find("input,textarea");
            if (!checkValidation(input)) {
                isValid = false;
                showDanger(formGroup, input[0].validationMessage);
            } else {
                hideDanger(formGroup);
            }
            message[input.prop("name")] = input.val();
        });
        if (isValid) {
            sendMessage(message);
        }
    });

    function sendMessage(message) {
        $.ajax({
            url: '/contact',
            method: 'POST',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({
                message: message,
            }),
            dataType: 'json',
            success: function (res) {
                form.fadeOut('fast', function () {
                    $('#contact-form-success-message').fadeIn('fast');
                });
            },
            error: function (err) {
                $(".errorBox").fadeIn('fast');//.text("An error occurred");
            },
            beforeSend: function () {
                loadingForm.fadeIn('fast');
            },
            complete: function () {
                loadingForm.fadeOut('fast');
            },
        });
    }

    function checkValidation(input) {
        return input[0].checkValidity();
    }

    function showDanger(formGroup, text) {
        formGroup.addClass('has-danger');
        var formControl = formGroup.find('.form-control');
        var feedback = formGroup.find('.form-control-feedback');
        if (!feedback.length) {
            formControl.after('<div class="form-control-feedback" style="display: none;"></div>');
            feedback = formGroup.find('.form-control-feedback');
        }
        feedback.text(text);
        formControl.addClass('form-control-danger');
        feedback.show("slow");
    }

    function hideDanger(formGroup) {
        formGroup.removeClass('has-danger');
        formGroup.find('.form-control').removeClass('form-control-danger');
        formGroup.find('.form-control-feedback').remove();
    }

});
