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
    var form = $('#order-form');
    var loadingForm = $(".loading");
    var contactInformationGroup = form.find(".contactInformationGroup");
    var isFirstTime = true;
    var isErrorOnTimes = false;

    durationElement.on("change", calculatePrice);
    startTimeElement.on("change", calculatePrice);
    playersNumberElement.on("change", calculatePrice);
    timeList.on("change", changeTimes);

    form.submit(function (event) {
        event.preventDefault();

        var isValid = true;

        form.find('.form-group').each(function() {
            var formGroup = $(this);
            var input = formGroup.find("input,textarea");
            if (["duration", "startTime"].indexOf(input[0].id) !== -1) {
                return;
            }
            if (!checkValidation(input)) {
                isValid = false;
                showDanger(formGroup, input[0].validationMessage);
                if (['fullname', 'email', 'phone'].indexOf(input[0].name) !== -1) {
                    contactInformationGroup.trigger('group-collapse.open');
                }
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
        });

        isFirstTime = false;
        isValid &= !isErrorOnTimes;

        if (isValid) {
            var orderData = {};
            form.find("input,textarea").each(function () {
                if (this.name) {
                    orderData[this.name] = $(this).val();
                }
            });
            createOrder(orderData);
        }
    });

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

    calculatePrice();

    //================================== functions

    function changeTimes(event, times) {
        hideTimesDanger();
        isErrorOnTimes = false;
        var duration = 0;
        if (times.start) {
            var d = new Date();
            var now = d.setHours(0,0,0,0);
            var start = (times.start - now) / (60 * 1000);
            startTimeElement.setValue(start);
            if (times.end) {
                duration = (times.end - times.start) / (60 * 1000);
            }
        }
        durationElement.setValue(duration);
        calculatePrice(false);
    }

    function calculatePrice(fillTime) {
        var startTime = startTimeElement.getValue();
        var playersNumber = playersNumberElement.getValue();
        var duration = durationElement.getValue();

        if (fillTime !== false) {
            var res = timeList.fillTime(startTime, duration);
            isErrorOnTimes = res.isError;
            if (res.isError) {
                showTimesDanger();
            } else {
                hideTimesDanger();
            }
        }

        priceElement.calculate(playersNumber, duration, startTime);
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

    function createOrder(orderData) {
        $.ajax({
            url: '/order',
            method: 'POST',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify({
                order: orderData,
            }),
            dataType: 'json',
            success: function (res) {
                var order = res.order;
                $("#order-id").val(order.id);
                $("#paypal-checkout-url").prop('href', order.payment.redirectUrl);
                for (var key in order) {
                    var tmpEl = $("#order-" + key);
                    if (tmpEl.length) {
                        tmpEl.text(order[key]);
                    }
                }
                form.fadeOut('fast', function () {
                    $('#order-form-success-message').fadeIn('fast');
                });
            },
            error: function (err) {
                $("#order-form-error-message").text("An error occurred");
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

    function showTimesDanger() {
        $('#times-error').fadeIn('fast');
        showDanger($('#duration').closest('.form-group'));
        showDanger($('#startTime').closest('.form-group'));
    }

    function hideTimesDanger() {
        $('#times-error').fadeOut('fast');
        hideDanger($('#duration').closest('.form-group'));
        hideDanger($('#startTime').closest('.form-group'));
    }
});
