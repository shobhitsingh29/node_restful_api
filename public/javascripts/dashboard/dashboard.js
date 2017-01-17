/*
 * dashboard.js
 * This file contains Demo for Node Restful Crud Api calls
 * @project   Asset Tracker Dashboard
 * @author    Plavika Singh , SapientNitro
 */

(function($, AT, window, document) {
    'use strict';


    var dashboard = function() {
        var $noOfDevices = $('#services'),
            _getData,
            _getDummyData,
            init;




        /**
         * [getData Fetches data of devices in the corresponding page]
         * @param  {Object} data Data to be updated in the section of dashboard from dashboard json file
         * @return  {void}
         */
        _getData = function (data) {
            var len = data.length;
            $noOfDevices.find('.noOfDevicesBtn').html(len + config.dashboard.noOfDevice);
            $noOfDevices.find('.allocatedBtn').html(len + config.dashboard.allocatedDevice);
            $noOfDevices.find('.availDeviceBtn').html(len + config.dashboard.availableDevice);
            $noOfDevices.find('.lostDeviceBtn').html(len + config.dashboard.lostDevice);
            $noOfDevices.find('.upcomingBtn').html(len + config.dashboard.noOfDevice);
        };

        /**
         * [getDummyData Fetches dummy data of number of devices in the corresponding section of dashboard]
         * @param  {Object} data Data to be updated in the section of dashboard from dashboardDummy json file
         * @return  {void}
         */
        _getDummyData = function (data) {
            $noOfDevices.find('.damagedDeviceBtn').html(data[0].deviceCount);
            $noOfDevices.find('.unusedDeviceBtn').html(data[1].deviceCount);
            $noOfDevices.find('.pendingDeviceBtn').html(data[2].deviceCount);
            $noOfDevices.find('.queueDeviceBtn').html(data[3].deviceCount);
        };

        /**
         * [init To initialize ajax calls]
         * @return  {void}
         */
        init = function () {
            //AJAX request to fetch the data from JSON
            util.ajaxCall(config.json.dashboardData, "GET", null, _getData);

            //AJAX call to get dummy JSON data from file for devices
            util.ajaxCall(config.json.dashboardDummyData, "GET", null, _getDummyData);
        };

        $(document).ready(init);

    };

    AT.dashboard = new dashboard();
})((typeof window.jQuery !== "undefined") ? window.jQuery : null , window.AT || window , window.document);
