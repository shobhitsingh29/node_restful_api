/*
 * lostDevice.js
 * This file contains validation for lostDevice form.
 * Update the database for lost devices from dummy json and also keep track of devices
 * which has been deleted from manage device and update the database for the same.
 * @project   Asset Tracker
 * @author    RICHA, SapientNitro
 */
(function($, at, window, document) {
    'use strict';
    var lostDevice,
        init;

    lostDevice = function() {
        var lostDeviceValidate,
            _submitHandler,
            _successfulUpdate,
            _successfulGetData,
            $lostDeviceId,
            lostData;

        $lostDeviceId = $("#lostDevice");

        /**
         * [setting the value from local storage to lostDevice page after the delete from manage device]
         * @return {void}
         */
        lostData = function() {
            var manageDeviceDelete,
                DeletedAssetNo,
                DeletedDeviceName;
            manageDeviceDelete = util.getDeviceData(config.storeData.deleteDataKey);
            DeletedAssetNo = manageDeviceDelete.assetNo;
            DeletedDeviceName = manageDeviceDelete.deviceName;
            $lostDeviceId.find('#assetNumber').val(DeletedAssetNo);
            $lostDeviceId.find('#deviceName').val(DeletedDeviceName);
            lostDeviceValidate();
        };

        /**
         * [callback function, for put data]
         * @return {void}
         */
        _successfulUpdate = function(response) {
            var $popUpContent = $(".popup-data");
            if (response) {
                $popUpContent.find("span").text(config.infoMsg.successfulLostUpdate);
                $(".popup-button-hide").on("click", function() {
                    $(location).attr('href', config.templateUrl.lostDevicePage);
                });
            } else {
                $popUpContent.find("span").text(config.errorMsg.unsuccessfulLostUpdate);
            }

        };

        /**
         * [function to get the user's input and put that to lostDevice json]
         * @return {}
         */
        _submitHandler = function() {
            var data;
            data = {
                data: [{
                    serialNumber: $('#serialNumber').val(),
                    assetNumber: $('#assetNumber').val(),
                    deviceType: $('#deviceType').val(),
                    deviceName: $('#deviceName').val()
                }],
                key: "assetNumber"
            };
            util.ajaxCall(config.json.addLostDeviceData, "PUT", data, _successfulUpdate);
        };

        /**
         * [Function to set the values to input boxes from dummy json]
         * @return {}
         */
        _successfulGetData = function(data) {
            $lostDeviceId.find('#serialNumber').val(data.data[0].serialNumber);
            $lostDeviceId.find('#deviceType').val(data.data[0].deviceType);
            $lostDeviceId.find('#deviceName').val(data.data[0].deviceName);
        };

        /**
         * [getting the data on focusout]
         * @return {}
         */
        lostDeviceValidate = function() {
            $(".lost-device").validate({
                rules: at.formValidation.rules,
                messages: AT.formValidation.messages,
                highlight: AT.formValidation.highlight,
                unhighlight: AT.formValidation.unhighlight,
                submitHandler: _submitHandler
            });
            var url,
                $assetNumber;
            $assetNumber = $("#assetNumber");
            $assetNumber.focusout(function() {
                url = config.json.getLostDeviceData + $assetNumber.val();
                util.ajaxCall(url, "GET", null, _successfulGetData);
            });
        };

        init = function() {
            lostDeviceValidate();
            lostData()
         };
        $(document).ready(init);
    };
    at.lostDevice = lostDevice();
})((typeof window.jQuery !== "undefined") ? window.jQuery : null, window.at || window, window.document);