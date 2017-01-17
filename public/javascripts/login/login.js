/*!
 * login.js
 * This file contains the code for the USER LOGIN.
 *
 * @project   ASSET TRACKER
 * @author    SHOBHIT SINGH, SapientNitro <ssingh239@sapient.com>
 *
 */

(function($, AT, window, document) {

    'use strict';

    /**
     * Login [namespace for module login ]
     * @returns {{init: (_init|*)}}[ function init to initialize the module]
     * @constructor
     */
    var Login = function() {


        var _validate,
            _attachEvents,
            _setData,
            _submitHandler,
            _getSetVerifyData,
            _init;

        /**
         * _validate [ sets validation rules for login page ]
         * @return {void}
         * @private
         */

        _validate = function() {


            $("#loginForm").validate({

                //VALIDATION FOR ADMIN FORM

                rules: AT.formValidation.rules,
                messages: AT.formValidation.messages,
                highlight: AT.formValidation.highlight,
                unhighlight: AT.formValidation.unhighlight,
                emailMethod: AT.formValidation.emailMethod,
                submitHandler: _submitHandler
            });
        };



        /**
         * _submitHandler [ makes an ajax call for verification
         * of login credentials and then verifies and sets data to local storage]
         * @return {void}
         * @private
         */

        _submitHandler = function() {

            var url = config.json.loginUserData + $("#username").val();

            util.ajaxCall(url, "GET", null, _getSetVerifyData); //  ajax call to common js


        };


        /**
         * _getSetVerifyData [ Fetches user data according to the user logged in then
         * verifies data if verified then sets data to storage]
         * @param  data {Object} data Data to be updated in localStorage from registration.json file
          *@returns {boolean}
         * @private
         */


        _getSetVerifyData = function(data) {

            var $popUpContent = $(".popup-data"),
                $popupOpaque = $(".popup-opaque"),
                $lightBox = $("#lightBox"),
                $guidelinesPopup = $(".popup-heading");

            if (!data.data.length) {
                $popupOpaque.css("opacity", "0.6");
                $lightBox.show();

                $guidelinesPopup.find("h2").text(config.errorMsg.sorry);
                $popUpContent.find("p").html("");
                $popUpContent.find("span").text(config.errorMsg.pleaseSignUp);

                return false;

            } else {
                var loggedInUser = null;

                if (data.data[0].email === $("#username").val() &&
                    data.data[0].password === $("#password").val()) {

                    loggedInUser = data.data[0];

                    _setData(loggedInUser); //details of logged in user

                    if (localStorage[config.storeData.loginDataKey]) {
                        location.replace("adminDashboard.shtml"); // on successful login redirecting to dashboard
                    }
                } else {
                    $popupOpaque.css("opacity", "0.6");
                    $lightBox.show();
                    $guidelinesPopup.find("h2").text(config.errorMsg.sorry);
                    $popUpContent.find("p").html("");
                    $popUpContent.find("span").text(config.errorMsg.unsuccessfulLogin);

                }
                loggedInUser = null;
                return true;
            }
        };


        /**
         * _setData[ sets user data according to the verified user logged in then
         * sets data to storage]
         * @param  loggedInUser {Object}  [loggedInUserData to be updated in localStorage from registration.json file]
         * @return {void}
         * @private
         */

        _setData = function(loggedInUser) {

            var loginData = {
                'fullName': loggedInUser.fullName,
                'oracleId': loggedInUser.oracleId,
                'email': loggedInUser.email,
                'phone': loggedInUser.phone,
                'jobTitle': loggedInUser.jobTitle,
                'jobLocation': loggedInUser.jobLocation,
                'password': loggedInUser.password,
                'url': loggedInUser.templateUrl
            };

            util.setLoginData(config.storeData.loginDataKey, loginData); //setting the data to storage

        };

        /**
         * _attachEvents[ function to handle redirection and attach events ]
         * @return {void}
         * @private
         */
        _attachEvents = function() {
            $("#loginBtn").on("click", _validate);
        };

        /**
         * _init [ a global function to initialise module ]
         * @return {void}
         *
         */

        _init = function() {
            // checks if a user is logged in.. then replaces the location of login with dashboard

            if (localStorage[config.storeData.loginDataKey]) {
                location.replace(config.templateUrl.adminDashboard);
            }

            _attachEvents();
        };



        /**
         *  returning functions here that are global to make them accessible
         */
        return {
            init: _init
        };
    };


    AT.Login = Login();

})(jQuery, window.AT || {}, window, window.document);


$(document).ready(function(){
    AT.Login.init();

});

