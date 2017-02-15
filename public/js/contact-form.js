jQuery(document).ready(function ($) {

    $('#contact-form').submit(function () {
        var isValid = true;

        $(this).find('.form-group').each(function() {
            var formGroup = $(this);
            var input = formGroup.find("input,textarea");
            if (!checkValidation(input)) {
                isValid = false;
                showDanger(formGroup, input[0].validationMessage);
            } else {
                hideDanger(formGroup);
            }
        });

        return isValid;
    });

    function checkValidation(input) {
        return input[0].checkValidity();
    }

    // function validatorForm() {
    //
    //     var nameReg = /^[A-Za-z]+$/;
    //     var emailReg = /^([\w\-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    //
    //     var names = $('#name').val();
    //     var company = $('#subject').val();
    //     var email = $('#email').val();
    //     var message = $('#message').val();
    //
    //     var inputVal = [names, company, email, message];
    //
    //     var inputMessage = ["name", "company", "email address", "message"];
    //
    //     $('.error').hide();
    //
    //     if(inputVal[0] == ""){
    //         $('#name').after('<span class="error"> Please enter your ' + inputMessage[0] + '</span>');
    //     }
    //     else if(!nameReg.test(names)){
    //         $('#name').after('<span class="error"> Letters only</span>');
    //     }
    //
    //     if(inputVal[1] == ""){
    //         $('#subject').after('<span class="error"> Please enter your ' + inputMessage[1] + '</span>');
    //     }
    //
    //     if(inputVal[2] == ""){
    //         $('#email').after('<span class="error"> Please enter your ' + inputMessage[2] + '</span>');
    //     }
    //     else if(!emailReg.test(email)){
    //         $('#email').after('<span class="error"> Please enter a valid email address</span>');
    //     }
    //
    //
    //     if(inputVal[3] == ""){
    //         $('#message').after('<span class="error"> Please enter your ' + inputMessage[3] + '</span>');
    //     }
    //
    //     return true;
    // }

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