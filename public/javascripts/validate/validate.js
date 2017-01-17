/*
 * validate.js
 * This file contains common validation for forms
 * @project   Asset Tracker
 * @author    RICHA, SapientNitro
 */
(function($, AT, window, document, undefined) {
    'use strict';
    var formValidation = {
        //Rules for form validation
        rules: {
            username: {
                required: true,
                sapientEmail: true
            },
            userpassword: config.infoMsg.fieldRequired,
            fullName: {
                required: true,
                lettersOnly: true
            },
            oracleId: {
                required: true,
                number: true,
                maxlength: 6
            },
            email: {
                required: true,
                sapientEmail: true
            },
            phone: {
                required: true,
                phoneNo: true
            },
            jobTitle: config.infoMsg.fieldRequired,
            jobLocation: {
                required: true,
                rangelength: [3, 250]
            },
            password: {
                required: true,
                rangelength: [6, 15]
            },
            confirmPassword: {
                required: true,
                equalTo: "#password"
            },
            serialNumber: {
                required: true,
                maxlength: 8
            },
            assetNumber: {
                required: true,
                number: true,
                maxlength: 6
            },
            deviceType: {
                required: true,
                lettersOnly: true
            },
            deviceName: config.infoMsg.fieldRequired,
            os: config.infoMsg.fieldRequired,
            defaultApplications: config.infoMsg.fieldRequired,
            browserDropBox: {
                valueNotEquals: config.infoMsg.dropBoxSelect,
                required: true

            }
        },
        // messages to be displayed while validating and error messages to be thrown
        messages: {
            username: {
                required: config.errorMsg.usernameRequired
            },
            userpassword: config.errorMsg.userPasswordRequired,
            fullName: {
                required: config.errorMsg.fullNameRequired
            },
            oracleId: {
                required: config.errorMsg.oracleIdRequired,
                maxlength: config.errorMsg.fieldMaxLength
            },
            email: {
                required: config.errorMsg.fieldRequired
            },
            phone: {
                required: config.errorMsg.fieldRequired
            },
            jobTitle: config.errorMsg.fieldRequired,
            jobLocation: {
                required: config.errorMsg.fieldRequired,
                rangelength: config.errorMsg.jobLocationRangeLength
            },
            password: {
                required: config.errorMsg.passwordRequired,
                rangelength: config.errorMsg.passwordRangeLength
            },
            confirmPass: {
                required: config.errorMsg.confirmPasswordRequired,
                equalTo: config.errorMsg.confirmPasswordEqualTo
            },
            serialNumber: {
                required: config.errorMsg.serialNumberRequired,
                maxlength: config.errorMsg.serialNumberMaxlength
            },
            assetNumber: {
                required: config.errorMsg.assetNumberRequired,
                maxlength: config.errorMsg.fieldMaxlength
            },
            deviceType: {
                required: config.errorMsg.deviceTypeRequired
            },
            deviceName: config.errorMsg.deviceNameRequired,
            os: config.errorMsg.osRequired,
            defaultApplications: config.errorMsg.defaultApplicationsRequired,
            browserDropBox: {
                valueNotEquals: config.errorMsg.dropBoxMsg
            },
            confirmPassword: {
                required: config.errorMsg.confirmPasswordRequired,
                equalTo: config.errorMsg.confirmPasswordEqualTo
            },
            newPass: {
                required: config.errorMsg.newPassword
            }

        },

        /**
         * [highlighting errors]
         * @param  {object} element is a label that gets highlighted in case any error occurs
         * @return {void}
         */
        highlight: function(element) {
            $(element).parent().addClass('form-error');
        },

        /**
         * [unhighlight errors]
         * @param  {object} element is a label that gets unhighlighted in case errors get removed
         * @return {void}
         */
        unhighlight: function(element) {
            $(element).parent().removeClass('form-error');
        },

        /**
         * [email validation for sapient domain]
         * @param  {String} value is a string that Takes the user's input
         * @return {boolean}
         */
        emailMethod: function(value) {
            return /^.+@sapient.com$/.test(value);
        },

        /**
         * [phone number validation for indian mobile numbers]
         * @param  {String} phoneNumber is a string that Takes the user's input
         * @return {boolean}
         */
        phoneNumberMethod: function(phoneNumber) {
            if ((phoneNumber.length > 9) && (phoneNumber.match(/^[7-9][0-9]{9}$/)))
                return true;
            else
                return false;
        },

        /**
         * [Device name should be letters only]
         * @param  {String} value is a string that Takes the user's input and element is the text box
         * @return {boolean}
         */
        checkNameMethod: function(value) {
            if (value.match(/^[a-zA-Z\s]+$/))
                return true;
            else
                return false;
        }

    };

    jQuery.validator.addMethod("sapientEmail", formValidation.emailMethod, config.errorMsg.sapientEmailRequired);

    jQuery.validator.addMethod("phoneNo", formValidation.phoneNumberMethod, config.errorMsg.phoneNoRequired);

    jQuery.validator.addMethod("lettersOnly",  formValidation.checkNameMethod,  config.errorMsg.deviceNameLettersOnly);
    var passwordValidate = {
        rules: {
            newPass: {
                required: true
            },

            confirmPass: {
                required: true,
                equalTo: "#newPass"
            }
        }
    };

    AT.formValidation = formValidation;
    AT.passwordValidate = passwordValidate;

})(jQuery, window.AT || {}, window, window.document);
