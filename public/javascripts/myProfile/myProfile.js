/*!
 * myProfile.js
 * This file contains the code for the User Profile.
 *
 * @project   ASSET TRACKER
 * @author    ANU JAIN, SapientNitro <ajain114@sapient.com>
 */
(function($, AT, window, document) {
    "use strict";
    var myProfile = function() {

        var $fullName,
            $oracleId,
            $email,
            $phone,
            $location,
            $currentPassword,
            $newPass,
            $confirmPass,
            loginFullName,
            loginOracleID,
            loginEmail,
            loginPhone,
            loginLocation,
            $profileMenu,
            initData,
            _submitData,
            dataObject,
            _renderData,
            _attachData,
            _validatePassword,
            _dataValidate,
            _init;


        /**
         * [_initData function initialises all variables and invokes functions _renderData and _attachData]
         *
         */
        initData = function initData() {
            var myProfileData;

            myProfileData = util.getLoginData(config.storeData.loginDataKey); // fetching userdata of logged in user from local storage

            loginFullName = myProfileData.fullName;
            loginOracleID = myProfileData.oracleId;
            loginEmail = myProfileData.email;
            loginPhone = myProfileData.phone;
            loginLocation = myProfileData.jobLocation;

            $profileMenu = $('#profileMenu');
            $fullName = $profileMenu.find('#fullName');
            $oracleId = $profileMenu.find('#oracleId');
            $email = $profileMenu.find('#email');
            $phone = $profileMenu.find('#phone');
            $location = $profileMenu.find('#jobLocation');
            $currentPassword = $profileMenu.find('#currentPassword');
            $newPass = $profileMenu.find('#newPass');
            $confirmPass = $profileMenu.find('#confirmPass');

            dataObject = {}; //initializing object to be passed to ajax call

            _renderData(); //renders data of logged in user to page
            _dataValidate(); //enables form validation and puts data via ajax call
            _attachData(); //invokes all event handlers


        };


        /**
         * [_renderData function populates user information on page]
         * @return void
         */
        _renderData = function renderData() {
            $fullName.val(loginFullName);
            $oracleId.val(loginOracleID);
            $email.val(loginEmail);
            $phone.val(loginPhone);
            $location.val(loginLocation);
        };


        /**
         * [_attachData function attaches event handlers to events]
         * @return void
         */
        _attachData = function attachData() {
            var childRead;
            $(".edit-content").on("click", function() {
                childRead = $(this).parent().children(".change-read");
                childRead.removeProp("readonly");
                childRead.focus();

            });

            $fullName.on("change", function() {
                dataObject.fullName = $fullName.val();
            });

            $oracleId.on("change", function() {
                dataObject.oracleId = $oracleId.val();
            });

            $email.on("change", function() {
                dataObject.email = $email.val();
            });

            $phone.on("change", function() {
                dataObject.phone = $phone.val();
            });

            $location.on("change", function() {
                dataObject.jobLocation = $location.val();
            });


            $currentPassword.on("change", function() {
                $newPass.removeProp("readonly");
                $confirmPass.removeProp("readonly");
                $newPass.rules("add", at.passwordValidate.rules.newPass);
                $confirmPass.rules("add", at.passwordValidate.rules.confirmPass);
            });


            $("#updateInfo").on("click", function() {
                if (_validatePassword()) {
                    if (util.verifyPassword($currentPassword.val())) {
                        dataObject.password = $newPass.val();
                        dataObject.confirmPassword = $confirmPass.val();
                    }

                }

            });
        };


        /**
         * [_validatePassword function validates that new passwords are same and are different from current password]
         * @return [boolean]
         */
        _validatePassword = function _validatePassword() {
            if ($currentPassword.val() != "" || $newPass.val() != "" || $confirmPass.val() != "") {

                if ($newPass.val() == $confirmPass.val() && $newPass.val() != $currentPassword.val()) {
                    return true;
                } else
                    return false;
            } else
                return false;

        };


        /**
         * [_dataValidate function enable form validation and puts data via ajax call]
         * @return [void]
         */
        _dataValidate = function _dataValidate() {

            $("#profileForm").validate({
                messages: AT.formValidation.messages,
                rules: AT.formValidation.rules,
                highlight: AT.formValidation.highlight,
                unhighlight: AT.formValidation.unhighlight,
                emailMethod: AT.formValidation.emailMethod,
                phoneNumberMethod: AT.formValidation.phoneNumberMethod,

                submitHandler: function() {

                    var popUpContent,
                        data;

                    data = {
                        data: [dataObject],
                        key: "email",
                        value: $email.val()
                    };
                    //callback function to submit the form
                    _submitData = function(response) {

                        popUpContent = $(".popup-data");
                        if (response) {
                            $(".popup-heading").find("h2").text(config.infoMsg.congrats);
                            popUpContent.find("p").html("");
                            popUpContent.find("span").text(config.infoMsg.successfulProfileUpdate);

                            $(".popup-button-hide").on("click", function() {
                                $(location).attr('href', config.url.myProfile);
                            });
                        } else {
                            $(".popup-heading").find("h2").text(config.errorMsg.sorry);
                            popUpContent.find("p").html("");
                            popUpContent.find("span").text(config.errorMsg.unsuccessfulUpdate);

                        }

                    };

                    //AJAX request to put data to JSON file
                    util.ajaxCall(config.json.updateRegistrationData, "PUT", data, _submitData)

                }
            });
        };


        _init = function() {
            initData();
        };
        return {
            init: _init
        };
    };

    AT.myProfile = myProfile();


})((typeof window.jQuery !== "undefined") ? window.jQuery : null, window.AT || window, window.document);

$(document).ready(function(){
    AT.myProfile.init();

});