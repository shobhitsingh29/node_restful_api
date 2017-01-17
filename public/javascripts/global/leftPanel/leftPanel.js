/*
 * leftPanel.js
 * This file contains users data in the left panel
 * @project   Asset Tracker Left Panel
 * @author    Plavika Singh , SapientNitro
 */

(function($, AT, window, document) {
    'use strict';

    var leftPanel = function() {
        var _setUserData,
            _init;

        /**
         * [_setUserData Fetches user data according to the user logged in from local storage and sets in the corresponding html]
         * @param {Object} userData Id name to set html according to user logged in
         * @return {boolean} Returns true in case local storage exists amd ID name passed is correct else false
         */
        _setUserData = function (userData) {
            var val;

            //To get login data from local storage
            val = util.getLoginData(config.storeData.loginDataKey);

            if (val == undefined || userData.length === 0) {
                return false;
            }
            //User data exists in local storage so data populated in left panel
            else {
                userData.find('img').attr("src", val.templateUrl);
                userData.find('.name').html(val.fullName);
                userData.find('.oracleID').html(val.oracleId);
                userData.find('.emailID').html(val.email);
                userData.find('.jobTitle').html(val.jobTitle);
                userData.find('.location').html(val.jobLocation);

                return true;
            }
        };


        _init = function() {
            _setUserData($('#userData'));
        };


        return {
            init: _init
        };
    };


    AT.leftPanel = leftPanel();

    })(jQuery, window.AT || {}, window, window.document);

AT.leftPanel.init();

if ($("#leftPanel")) {

    AT.leftPanel.init();
}