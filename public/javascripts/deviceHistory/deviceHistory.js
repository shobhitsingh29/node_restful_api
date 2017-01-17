/*
 * deviceHistory.js
 * This file contains functionality for Device History page
 * @project   Assest Tracker
 * @author    Harnoor Bandesh
 */
(function($, AT, window, document) {

    "use strict";

    /**
     * atdevicehistory [namespace for module device History ]
     * @returns {{init: (_init|*)}}[ function init to initialize the module]
     */

    var atDeviceHistory = function() {
        var $deviceHistory = $("#deviceHistory"),
            $innerDiv = $("#innerDiv"),
            _createDeviceHistory,
            _renderDeviceHistoryData,
            _renderDeviceSearchData,
            _attachEvents,
            _deviceHistory,
            _deleteHistory,
            _receiveJson,
            _fetchSearchResults,
            filterData,
            finalList,
            searchResultList,
            _appendDeviceHistory,
            entry,
            init,
            count,
            $clickedImage;

        /**
         * _createDeviceHistory [Render the device history data according to the Device History Information JSON]
         * @param  {Array} data is array of objects of the information of the persons related to the device
         * @return {void}
         */
        _createDeviceHistory = function(data) {
            var stringArr = [],
                deviceHistoryIndex = 0;
            count = data.data.length;
            for (; deviceHistoryIndex < count; deviceHistoryIndex++) {
                var currentNode = data.data[deviceHistoryIndex];
                stringArr.push('<li  id="li' + deviceHistoryIndex + '" class="to-left data-details">' +
                    '<div class="col-2">' + currentNode.personID + '</div>' +
                    '<div class="col-2">' + currentNode.personName + '</div>' +
                    '<div class="col-2">' + currentNode.dateOfIssue + '</div>' +
                    '<div class="col-2">' + currentNode.returnDate + '</div>' +
                    '<div class="col-2">' + currentNode.pid + '</div>' +
                    '<div class="col-2">' + currentNode.Manager + '</div>' +
                    '</li>');
            }
            //remove the LI elements if they exist previously in the DOM
            $innerDiv.find(".data-details").remove();
            //now append the new LI elements according to the its respective data is appended here
            $innerDiv.find(".deviceHistoryData").append(stringArr);
            _appendDeviceHistory();
        };

        /**
         *  _renderDeviceHistoryData [Render the data according to the JSON]
         * @param  {Array} data is Array of objects of the devices avaialable in our database
         * @return {void}
         */
        _renderDeviceHistoryData = function(data) {
            var strArray = [];
            count = data.length;
            $("<ul>").attr({
                id: "availableDevices",
                class: "clear-fix"
            }).insertAfter("#content .head-row");
            for (var i = 0; i < count; i++) {
                strArray.push('<li class="mob-col-10" id="li' + i + '" data-id="' + data[i].id + '">' +
                    '<div class="mob-col-10 col-2"><p class="mob-col-4 desktopHide">Assest Numb. :</p>' + data[i].id + '</div>' +
                    '<div class="mob-col-10 col-2"><p class="mob-col-4 desktopHide">Device Name :</p>' + data[i].deviceName + '</div>' +
                    '<div class="mob-col-10 col-5" id="Browser' + i + '"><p class="mob-col-4 desktopHide">Configuration :</p>Browser :' + data[i].browser +
                    '<p class="mob-col-6 mob-to-right"> Operating System:' + data[i].os + '</p>' +
                    '<p class="mob-col-6 mob-to-right">Default Apps:Undefined</p></div>' +
                    '<div class="col-3 image-div" id="imageWrapper' + i + '">' +
                    '<div class="sprite plus"></div>' +
                    '<div class="sprite minus minus-button"></div></div><div class="asset-details"></div></li>');
            }
            $("#availableDevices").append(strArray);
            _attachEvents();
        };

        /**
         * _deviceHistory [checks the asset number of the device which has been clicked and gets the history of that device
         * through ajax call]
         * @return {void}
         */
        _deviceHistory = function() {
            var assetNum;
            $clickedImage = $(this);
            assetNum = $clickedImage.parents("li:first").data("id");
            //An AJAX call is made with the asset number to the server and the server responds with the entries
            //corresponding to that asset number.
            util.ajaxCall(config.json.deviceHistoryDetails + assetNum, "GET", null, _createDeviceHistory);
        };
        /**
         * _appendDeviceHistory [Appends the Device History information to the respective Li ELEMENT on click of plus button]
         * @return {void}
         */
        _appendDeviceHistory = function() {
            var clonedEle = $innerDiv.html();
            $clickedImage.parents("li:first").find(".asset-details").empty().append(clonedEle);
            $clickedImage.siblings().css("display", "table");
            $clickedImage.hide();
        };
        /**
         * _deleteHistory [Removes the Device History information from the respective Li ELEMENT on click of Minus button]
         * @return {void}
         */
        _deleteHistory = function() {
            var $clickedImage = $(this);
            $clickedImage.parents("li:first").find(".asset-details").empty();
            $clickedImage.siblings().show();
            $clickedImage.hide();
        };

        /**
         * _attachEvents [Attaches the events on the buttons]
         * @return {void}
         */
        _attachEvents = function() {
            $deviceHistory.find(".plus").on("click", _deviceHistory);
            $deviceHistory.find(".minus").on("click", _deleteHistory);
        };

        /**
         * _receiveJson [Render the page according to the data fetched from filter in the arg parameter and it is a call
         * back function
         * of ajax call]
         * @param  {Array} data is an Array of objects of the devices available in our database
         * @return {void}
         */
        _receiveJson = function(data) {
            var assetsToBeFiltered = data.data,
                jsonDataIndex,
                filterBrowserCount = filterData.browsers.length,
                _isInSelection;
            finalList = [];
            /**
             *  _isInSelection [selects the elements that satisfies all the properties of the filter Data]
             * @param  {object} asset is an object which is points to the current asset that is going to get matched with
             * filter data properties in this function
             * @return {boolean} returns true if the asset matches with all the properties
             */
            _isInSelection = function(asset) {
                /*checks whether OS or browsers have been clicked or not*/
                if (filterData.osName.length !== 0 || filterData.browsers.length !== 0) {
                    /*checks if the os has been clicked or not*/
                    if (filterData.osName.length !== 0) {
                        /* checks if the asset's os matches with the array of os that have been clicked*/
                        if (filterData.osName.indexOf(asset.os) !== -1) {
                            /*checks if the browsers have been clicked or not*/
                            if (filterData.browsers.length !== 0) {
                                /*In this loop browsers are matched*/
                                for (var j = 0; j < filterBrowserCount; j++) {
                                    /*checks if the clicked browsers exists in the asset*/
                                    if (asset.browser.indexOf(filterData.browsers[j]) !== -1) {
                                        return true;
                                    }
                                }
                            } else {
                                return true;
                            }
                        }
                    } else {
                        /*In this loop browsers are matched*/
                        for (var z = 0; z < filterBrowserCount; z++) {
                            /*checks if the clicked browsers exists in the asset*/
                            if (asset.browser.indexOf(filterData.browsers[z]) !== -1) {
                                return true;
                            }
                        }
                    }
                } else {
                    return true;
                }
            };
            count = assetsToBeFiltered.length;
            /*In this loop the clicked properties are matches against the assets to be filtered and the desired assets are
             pushed in a inal list*/
            for (jsonDataIndex = 0; jsonDataIndex < count; jsonDataIndex++) {
                if (_isInSelection(assetsToBeFiltered[jsonDataIndex])) {
                    finalList.push(assetsToBeFiltered[jsonDataIndex]);
                }
            }
            $("#availableDevices").remove();
            _renderDeviceHistoryData(finalList);
        };

        /**
         *  _renderDeviceSearchData [Sets finalList so that search text input by the user can be looked up inside the data returned by commonData JSON]
         * @param  {[object]} data [Refers to the data returned by AJAX call made for commonData JSON]
         */
        _renderDeviceSearchData = function(data) {
            finalList = data;
        };

        /**
         * _fetchSearchResults [Displays the search results]
         * @param  {[string]} keySearchTerm [Refers to the search text input by the user]
         */
        _fetchSearchResults = function(keySearchTerm) {
            searchResultList = [];
            for (entry in finalList) {
                //Checking if the search term entered by the user is present in the JSON data returned
                if ((finalList[entry].id.toString().toLowerCase().indexOf(keySearchTerm.toLowerCase()) > -1 || finalList[entry].deviceName.toLowerCase().indexOf(keySearchTerm.toLowerCase()) > -1)) {
                    searchResultList.push(finalList[entry]);
                }
            }
            $('#availableDevices').remove();
            _renderDeviceHistoryData(searchResultList);
        };
        /**
         * [Render the page according to the data fetched from filter in the arg parameter and a custom event filterChange
         * is bieng attached to the DOM element with id as filter and this event is triggered from filter module]
         * @param  {Object} arg is an object in which the data which is to be filtered is passed from the filter
         * @return {void}
         */
        $("#filter").on("filterChange", function(event, arg) {
            filterData = JSON.parse(arg);
            var dataToBeFiltered = {
                key: "deviceName",
                value: filterData.devices
            };
            //send the ajax call along with the device names so that the server itself send the entries corresponding to the device Names
            util.ajaxCall(config.json.commonDataGet, "GET", dataToBeFiltered, _receiveJson);
        });

        /**
         * [Searches through the data, returned by commonData JSON, if the text entered by user matches any of the element's text ]
         * @param  {String} arg [Refers to the value input by the user]
         */
        $('#search').on("searchChange", function(event, arg) {
            _fetchSearchResults(arg);
        });

        init = function() {
            util.ajaxCall(config.json.commonData, "GET", null, _renderDeviceHistoryData);
            if (typeof(finalList) === "undefined") {
                util.ajaxCall(config.json.commonData, "GET", null, _renderDeviceSearchData);
            }
        };
        return {
            init: init
        };

    };

    AT.DeviceHistory = atDeviceHistory();

})(jQuery, window.AT || {}, window, window.document);

$(document).ready(function() {
    AT.DeviceHistory.init();
});