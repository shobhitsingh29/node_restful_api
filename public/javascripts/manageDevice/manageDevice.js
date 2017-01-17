/*
 * manageDevice.js
 * This file contains functionality for manageDevice page
 * @project   ASSET TRACKER
 * @author    SHOBHIT SINGH, SapientNitro <ssingh239@sapient.com>
 */
(function($, AT, window, document) {

    'use strict';

    /**
     *  manageDevice [namespace for module login ]
     * @returns {{init: (_init|*)}}[ function init to initialize the module]

     */
    var manageDevice = function() {

        var $manageDevice = $("#manageDevice"),
            _renderDeviceHistoryData,
            _attachEvents,
            _recieveJson,
            _fetchSearchResults,
            _renderDeviceSearchData,
            _deviceRedirect,
            filterData,
            finalList,
            searchResultList,
            entry,
            _init;


        /**
         * _renderDeviceHistoryData [Render the data according to the JSON]
         * @param  {Array} data is Array of objects of the devices avaialable in our database
         * @return {void}
         * @private
         */
        _renderDeviceHistoryData = function(data) {
            var count = data.length,
                strArray = [];
            $("<ul>").attr({
                id: "availableDevices",
                class: "clear-fix"
            }).insertAfter("#content .head-row");
            for (var i = 0; i < count; i++) {
                strArray.push('<li class="mob-col-10" id="li' + i + '">' +
                    '<div class="mob-col-10 col-2"><p class="mob-col-4 desktopHide">Assest Numb. :</p>' + data[i].id + '</div>' +
                    '<div class="mob-col-10 col-2"><p class="mob-col-4 desktopHide">Device Name :</p>' + data[i].deviceName + '</div>' +
                    '<div class="mob-col-10 col-5" id="Browser' + i + '"><p class="mob-col-4 desktopHide">Configuration :</p>Browser :' + data[i].browser +
                    '<p class="mob-col-6 mob-to-right"> Operating System:' + data[i].os + '</p>' +
                    '<p class="mob-col-6 mob-to-right">Default Apps:Undefined</p></div>' +
                    '<div class="col-3 image-div" id="imageWrapper' + i + '">' +
                    '<span class="sprite edit" ></span>' +
                    '<span class="sprite delete" ></span></div></li>');
            }
            $("#availableDevices").append(strArray);
            _attachEvents();
        };



        /**
         * _deviceRedirect [sets the data according to addition or deletion of device to storage
         * and then redirects to their corresponding page the events on the buttons]
         * @return void
         * @private
         */

        _deviceRedirect = function() {
            var li,
                assetNo,
                deviceName,
                deviceConfigurationTmp,
                browser,
                deleteData,
                defaultApps,
                os,
                $this = $(this);


            li = $this.closest("li");

            assetNo = li.eq(0).find("div").eq(0).text().split(':')[1];
            deviceName = li.eq(0).find("div").eq(1).text().split(':')[1];
            deviceConfigurationTmp = li.eq(0).find("div").eq(2).text().split(':');
            browser = deviceConfigurationTmp[2].split(" ")[0];
            defaultApps = deviceConfigurationTmp[4];
            os = deviceConfigurationTmp[3].split(" ")[0];


            //if edit is clicked
            if ($this.hasClass("edit")) {

                var editData = {
                    'assetNo': assetNo,
                    'deviceName': deviceName,
                    'browser': browser,
                    'os': os,
                    'defaultApps': defaultApps
                };

                util.setDeviceData(config.storeData.editDataKey, editData); //calling function to set data to local storage

                //REDIRECTION TO ADD DEVICE PAGE
                location.replace("addDevice.shtml");

            }
            //if delete is clicked
            if ($this.hasClass("delete")) {
                deleteData = {
                    'assetNo': assetNo,
                    'deviceName': deviceName
                };

                util.setDeviceData(config.storeData.deleteDataKey, deleteData); //calling function to set data to local storage

                //REDIRECTION TO LOST DEVICE PAGE
                location.replace("lostDevice.shtml");

            }
        };


        /**
         * _attachEvents [Attaches the events on the buttons]
         * @return void
         * @private
         */
        _attachEvents = function() {
            $manageDevice.find(".edit").on("click", _deviceRedirect);
            $manageDevice.find(".delete").on("click", _deviceRedirect);
        };



        /**
         * _recieveJson [Render the page according to the data fetched from filter in the arg parameter and it is a call back function
         * of ajax call]
         * @param  {Array} data is an Array of objects of the devices available in our database
         * @return {void}
         * @private
         */

        _recieveJson = function(data) {
            var assetsToBeFiltered = data.data,
                count,
                i,
                filterBrowserCount = filterData.browsers.length,
                _isInSelection;
            finalList = [];

            /**
             *_isInSelection [selectes the elements that satisfies all the properties of the filter Data]
             * @param  {object} asset is an object which is points to the current asset that is going to get matched with
             * filter data properties in this function
             * @return {boolean} returns true if the asset matches with all the properties
             * @private
             */
            _isInSelection = function(asset) {
                /*checks whether OS or browsers have been clicked or not*/
                if (filterData.osName.length !== 0 || filterData.browsers.length !== 0) {
                    /*checks if the os has been clicked or not*/
                    if (filterData.osName.length !== 0) {
                        /* checks if the assest's os matches with the array of os that have been clicked*/
                        if (filterData.osName.indexOf(asset.os) !== -1) {
                            /*checks if the browsers has been clicked or not*/
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
             pushed in a final list*/
            for (i = 0; i < count; i++) {
                if (_isInSelection(assetsToBeFiltered[i])) {
                    finalList.push(assetsToBeFiltered[i]);
                }
            }
            $("#availableDevices").remove();
            _renderDeviceHistoryData(finalList);
        };

        /**
         *  _renderDeviceSearchData [Sets finalList so that search text input by the user can be looked up inside the data returned by commonData JSON]
         * @param  {[object]} data [Refers to the data returned by AJAX call made for commonData JSON]
         */
        _renderDeviceSearchData = function(data){
            finalList = data;
        };

        /**
         * _fetchSearchResults [Displays the search results]
         * @param  {[string]} keySearchTerm [Refers to the search text input by the user]
         */
        _fetchSearchResults = function(keySearchTerm){
            searchResultList = [];
            for(entry in finalList) {
                //Checking if the search term entered by the user is present in the JSON data returned
                if ((finalList[entry].id.toString().toLowerCase().indexOf(keySearchTerm.toLowerCase()) > -1
                    || finalList[entry].deviceName.toLowerCase().indexOf(keySearchTerm.toLowerCase()) > -1)) {
                    searchResultList.push(finalList[entry]);
                }
            }
            $('#availableDevices').remove();
            _renderDeviceHistoryData(searchResultList);
        };


        /**
         * [Render the page according to the data fetched from filter in the arg parameter and a custom event filterChange
         * is being attached to the DOM element with id as filter and this event is triggered from filter module]
         * @param  {Object} arg is an object in which the data which is to be filtered is passed from the filter
         * @return {void}
         * @private
         */
        $("#filter").on("filterChange", function(event, arg) {
            filterData = JSON.parse(arg);
            var dataToBeFiltered = {
                key: "deviceName",
                value: filterData.devices
            };
            //send the ajax call along with the device names so that the server itself send the entries corresponding to the device Names
            util.ajaxCall(config.json.commonDataGet, "GET", dataToBeFiltered, _recieveJson);
        });

        $('#search').on("searchChange", function(event, arg) {
            _fetchSearchResults(arg);
        });


        /**
         * _init [ a global function to initialise module ]
         * @return {void}
         *
         */

        _init = function() {
            util.ajaxCall(config.json.commonData, "GET", null, _renderDeviceHistoryData);
            if(finalList === undefined){
                util.ajaxCall(config.json.commonData, "GET", null, _renderDeviceSearchData);
            }
        };

        /**
         *  returning functions here that are global to make them accessible
         */
        return {
            init: _init
        };
    };


    AT.manageDevice = manageDevice();


})(jQuery, window.AT || {}, window, window.document);


$(document).ready(function(){

    AT.manageDevice.init();
});