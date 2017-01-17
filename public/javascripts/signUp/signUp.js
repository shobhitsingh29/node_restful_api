/*
 * registration.js
 * This file contains validation for registration form
 * @project   Asset Tracker
 * @author    RICHA, SapientNitro
 */
(function($, AT, window, document, undefined) {
    'use strict';
    var registration;

    registration = function() {
        var _submitSuccessHandler,
            _submitHandler,
            _registrationValidate,
            _init;

        /**
         *  _submitSuccessHandler is a callback function
         *  for true response it navigate to login page and for false response it remains to same page]
         *  @param  {boolean} response is true in case data is successfully posted else false
         * @return {void}
         */
        _submitSuccessHandler = function(response) {
            //To show custom message
            var $popUpContent = $(".popup-data");
            if (response) {
                $(".popup-heading").find("h2").text(config.infoMsg.congrats);
                 $(".popup-data").find("p").html("");
                $popUpContent.find("span").text(config.infoMsg.successfulRegistration);
                $(".popup-opaque").css("opacity", "0.6");
                $("#lightBox").show();
                $(".popup-button-hide").on("click", function() {
                    $(location).attr('href', config.templateUrl.loginPage);
                });
            } else {
              $(".popup-heading").find("h2").text(config.errorMsg.sorry);
                 $(".popup-data").find("p").html("");
                $popUpContent.find("span").text(config.errorMsg.unsuccessfulRegistration);
                $(".popup-opaque").css("opacity", "0.6");
                $("#lightBox").show();
            }
        };

        /**
         * [submitHandler take inputs from registration form
         *  makes an ajax call to store data in json file on successful registration]
         * @param  {void}
         * @return {void}
         */
        _submitHandler = function() {
            var data;
            data = {
                data: [{
                    fullName: $('#fullName').val(),
                    oracleId: $('#oracleId').val(),
                    email: $('#email').val(),
                    phoneNo: $('#phone').val(),
                    jobTitle: $('#jobTitle').val(),
                    jobLocation: $('#jobLocation').val(),
                    password: $('#password').val(),
                    confirmPassword: $('#confirmPassword').val()
                }],
                //Ensuring email id for registration is unique
                key: "email"
            };
            //AJAX request to put data to JSON file
            util.ajaxCall(config.json.putRegData, "PUT", data, _submitSuccessHandler);
        };

        /**
         * [registrationValidate sets validation rules for  registration page]
         * @return {void}
         */
        _registrationValidate = function() {
            $("#loginForm").validate({
                rules: AT.formValidation.rules,
                messages: AT.formValidation.messages,
                highlight: AT.formValidation.highlight,
                unhighlight: AT.formValidation.unhighlight,
                emailMethod: AT.formValidation.emailMethod,
                phoneNumberMethod: AT.formValidation.phoneNumberMethod,
                checkNameMethod: AT.formValidation.checkNameMethod,
                submitHandler: _submitHandler
            })
        };

        _init = function() {
            _registrationValidate();
        };

        return {
            init: _init
        };
    };

    if ($("#loginForm")) {
        AT.registration = registration();
    }

})(jQuery, window.AT || {}, window, window.document);
AT.registration.init();