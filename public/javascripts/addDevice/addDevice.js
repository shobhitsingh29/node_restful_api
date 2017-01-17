/*!
 * addDevice.js
 * This file contains the code for adding device.
 *
 * @project   ASSET TRACKER
 * @author    ANU JAIN, SapientNitro <ajain114@sapient.com>
 */

(function($, at, window, document) {
    'use strict';
    var addDevice = function () {
        var addDeviceValidate,
            _submitData,
            _setSerialNo,
            initData,
            submitHandler;

        //Drop down using jquery ui
        $("#browserDropBox").selectmenu();

        initData = function () {
            var deviceInfo;
            deviceInfo = util.getDeviceData(config.storeData.editDataKey);
            _setSerialNo();
            $('#assetNumber').val(deviceInfo.assetNo);
            $('#deviceName').val(deviceInfo.deviceName);

        };

        _setSerialNo = function () {
            util.ajaxCall(config.json.getDeviceList, "GET", null, function (data) {
                $('#serialNumber').val(data.length + 1);
            });

        };


        submitHandler = function () {
            alert("call ajax");
            var data;
            data = {
                data: [{
                    serialNumber: $('#serialNumber').val(),
                    assetNumber: $('#assetNumber').val(),
                    deviceType: $('#deviceType').val(),
                    deviceName: $('#deviceName').val(),
                    os: $('#os').val(),
                    defaultApplications: $('#defaultApplications').val(),
                    browserDropBox: $('#browserDropBox').val()
                }],
                key: "assetNumber"
            };
            //AJAX request to put data to JSON file

            util.ajaxCall(config.json.addNewDevice, "PUT", data, _submitData);

        };

        _submitData = function (response) {

            var $popUpContent = $(".popup-data");
            if (response) {
                $popUpContent.find("span").text(config.infoMsg.successfulAdd);
                $(".popup-button-hide").on("click", function () {
                    $(location).attr('href', config.templateUrl.addDevicePage);
                });
            }
            else {
                $popUpContent.find("span").text();
                $(".popup-button-hide").on("click", function () {
                    $(location).attr('href', config.templateUrl.addDevicePage);
                });
            }

        };

        addDeviceValidate = function () {

            $("#deviceDetails").validate({
                //Validation rules
                rules: at.formValidator.formValidation.rules,
                messages: at.formValidator.formValidation.messages,
                highlight: at.formValidator.formValidation.highlight,
                unhighlight: at.formValidator.formValidation.unhighlight,
                checkNameMethod: at.formValidator.formValidation.checkNameMethod,
                submitHandler: submitHandler

            })
        };

        var init = function () {
            addDeviceValidate();
            initData();
        };
        $(document).ready(init);

    };
    at.addDeviceValidation = addDevice();

})((typeof window.jQuery !== "undefined") ? window.jQuery : null , windowAT || window , window.document);