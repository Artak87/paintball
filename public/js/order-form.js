jQuery(document).ready(function ($) {

    var form = $('#order-form');
    var loadingForm = form.find(".loading");
    var isFirstTime = true;

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
            if (isFirstTime) {
                input.focusout(function () {
                    if (!checkValidation(input)) {
                        showDanger(formGroup, input[0].validationMessage);
                    } else {
                        hideDanger(formGroup);
                    }
                });
            }
            message[input.prop("name")] = input.val();
        });

        if (isValid) {
            sendMessage(message);
        }
        isFirstTime = false;
    });

    function sendMessage(message) {
        $.ajax({
            url: '/order',
            method: 'POST',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({
                message: message,
            }),
            dataType: 'json',
            success: function (res) {
                form.fadeOut('fast', function () {
                    $('#order-form-success-message').fadeIn('fast');
                });
            },
            error: function (err) {
                $(".errorBox").text("An error occurred");
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
