/*
 * filter.js
 * This file contains functionality for filter pannel which is sending selected checkboxes
 * @project   Assest Tracker
 * @author    Harnoor Bandesh
 * SapientNitro <hbandesh@sapient.com>
 */
(function($, AT, window, document) {

    "use strict";

    /**
     * atFilter [namespace for module Filter ]
     * @returns {{init: (_init|*)}}[ function init to initialize the module]
     */

    var atFilter = function() {
        var init,
            _callOnclick,
            $checkBoxes;
        /**
         * [This function is called when the checkboxes are selected and is called after the delay of config.filteringData
         * send the data to respective page by triggering the event of that page.]
         * @return {void}
         */
        _callOnclick = function() {
            var $checkedEle = $(":checked"),
                $filter = $("#filter"),
                deviceName = [],
                browserName = [],
                osName = [],
                selectedData,
                jsonData;
            //check out under which heading does current check box falls and push into its respective array
            for (var i = 0; i < $checkedEle.length; i++) {
                if ($checkedEle.eq(i).closest("ul").hasClass("deviceList"))
                    deviceName.push($checkedEle.eq(i).siblings("label").text());
                else if ($checkedEle.eq(i).closest("ul").hasClass("browserList"))
                    browserName.push($checkedEle.eq(i).siblings("label").text());
                else if ($checkedEle.eq(i).closest("ul").hasClass("operatingSystemList"))
                    osName.push($checkedEle.eq(i).siblings("label").text());
            }

            selectedData = {
                devices: deviceName,
                browsers: browserName,
                osName: osName
            };
            /**
             * [This function sets the value of the object that needs to be passed to the other page]
             * @return {void}
             */
            function setValue(data) {
                selectedData = data;
            }
            // checks if the no devices has been selected then send all the assets available in the database
            if (selectedData.devices.length === 0) {
                util.ajaxCall(config.json.commonData, "GET", null, setValue);
            }
            // checks if nothing has been selected then send alll the assets available in the database
            else if (selectedData.osName.length === 0 && selectedData.devices.length === 0 && selectedData.browsers.length === 0) {
                util.ajaxCall(config.json.commonData, "GET", null, setValue);
            }
            jsonData = JSON.stringify(selectedData);
            // checks if the filter is present on that page oir not and if yes then trigger the event and send the data
            if ($filter.length) {
                $filter.trigger("filterChange", [jsonData]);
            }
        };
        /**
         * [Attaches event click and event handler on all the checkboxes]
         */
        init = function() {
            $checkBoxes = $("input:checkbox");
            $checkBoxes.click($.debounce(config.storeData.filteringData, _callOnclick));
        };
        return {
            init: init
        }
    };

    AT.Filter = atFilter();

})(jQuery, window.AT || {}, window, window.document);

$(document).ready(function() {
    AT.Filter.init();
});