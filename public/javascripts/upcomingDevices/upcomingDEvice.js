/*
 * upcomingDevice.js
 * This file adds the upcoming device to database successfully.
 * @project   Asset Tracker
 * @author    Plavika Singh, SapientNitro
 */

(function($, at, window, document) {
    'use strict';
    var upcomingDevice,
        init;

    upcomingDevice= function() {

        var checkUpcomingDevice,
            _submitData;

        //Drop down using jquery ui
        $("#browserDropBox").selectmenu();

        _submitData = function (response) {

            var $popUpContent = $(".popup-data");
            if (response) {
                $popUpContent.find("span").text(config.infoMsg.successfulUpdate);
                $(".popup-button-hide").on("click", function () {
                    window.location.href = config.templateUrl.upcomingDevicePage;
                });
            }
            else {
                $popUpContent.find("span").text();
                $(".popup-button-hide").on("click", function () {
                    window.location.href = config.templateUrl.upcomingDevicePage;
                });
            }

        };

        checkUpcomingDevice = function () {

            $("#upcomingDevice").validate({
                //Validation rules
                rules: at.formValidator.formValidation.rules,
                messages: at.formValidator.formValidation.messages,
                highlight: at.formValidator.formValidation.highlight,
                unhighlight: at.formValidator.formValidation.unhighlight,
                checkNameMethod: at.formValidator.formValidation.checkNameMethod,
                submitHandler : function () {
                    var data;
                    data = {
                        data: [{
                            deviceType: $('#deviceType').val(),
                            deviceName: $('#deviceName').val(),
                            os: $('#os').val(),
                            defaultApplications: $('#defaultApplications').val(),
                            browserDropBox: $('#browserDropBox').val()
                        }],
                        key: "deviceType"
                    };
                    //AJAX request to put data to JSON file
                    util.ajaxCall(config.json.putUpcomingDevice, "PUT", data, _submitData);

                }

            })
        };

        init =function(){
            checkUpcomingDevice();
        };
        $(document).ready(init);
    };

    at.upcomingDeviceValidation = new upcomingDevice();

})((typeof window.jQuery !== "undefined") ? window.jQuery : null , window.AT || window , window.document);

