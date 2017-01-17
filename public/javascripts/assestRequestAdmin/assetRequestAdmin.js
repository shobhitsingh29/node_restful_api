/*
 * assetRequestAdmin.js
 * This file contains functionality for Asset Request page
 * @project   Asset Tracker
 * @author    Plavika Singh
 */

(function($, AT, window, document) {
"use strict";
var atAssetRequest = function() {
    var deviceHistory = $("#assetRequest"),
        _createDeviceHistory,
        _renderDeviceSearchData,
        _deviceHistoryData,
        _attachEvents,
        _deviceHistory,
        _deleteHistory,
        _receiveJson,
        _fetchSearchResults,
        filterData,
        searchResultList,
        finalCollection,
        init,
        entry,
        assetNum,
        assetNo,
        $clickedBtn;


    /**
     * _createDeviceHistory[Render the device history data according to the Device History Information JSON]
     * @param  {Object} data of objects of the information of the persons related to the device
     */
    _createDeviceHistory = function (data) {
        var divArray = [],
            count = data.data.length;
        for (var i = 0; i < count; i++) {
            divArray = [];
            $("<li>").attr({
                id: "li" + i,
                class: "to-left"
            }).appendTo("#deviceHistoryData");
            divArray.push('<div class="col-2">' + data.data[i].personID + '</div>');
            divArray.push('<div class="col-2">' + data.data[i].personName + '</div>');
            divArray.push('<div class="col-2">' + data.data[i].dateOfIssue + '</div>');
            divArray.push('<div class="col-2">' + data.data[i].returnDate + '</div>');
            divArray.push('<div class="col-2">' + data.data[i].pid + '</div>');
            divArray.push('<div class="col-2">' + data.data[i].Manager + '</div>');
            divArray.push('<div class="col-1"><img src="/public/images/system/accept1.png" width="20px"><img src="/public/images/system/crossN.png" width="20px"</div>');
            $("#li" + i).append(divArray);
        }
        plavika();
    };
    /**
     * _deviceHistoryData[Render the data according to the JSON]
     * @param  {Array} data of objects of the devices avaialable in our database
     */
    _deviceHistoryData = function (data) {
        $("<ul>").attr({
            id: "availableDevices",
            class: "clear-fix"
        }).insertAfter("#content .head-row");
        for (var i = 0; i < data.length; i++) {
            var liList = "",
                imageList = "",
                divList = "",
                pList = "";
            liList += "<li class='mob-col-9' id='li" + i + "'>" + "</li>";
            divList += "<div class='mob-col-9 to-left col-2'>" +
                "<p class='mob-col-4 desktopHide'>Asset No. :</p>" + data[i].id + "</div>";
            divList += "<div class='mob-col-9 to-left col-2'>" + "" +
                "<p class='mob-col-4 desktopHide'>Device Name :</p>" + data[i].deviceName + "</div>";
            divList += "<div class='mob-col-9 col-5' id='Browser" + i + "'>" + "" +
                "<p class='mob-col-4 desktopHide'>Configuration :</p>Browser :" + data[i].browser + "</div>";
            pList += "<p class='mob-col-6 mob-to-right'> Operating System:" + data[i].os + "</p>";
            pList += "<p class='mob-col-6 mob-to-right'>Default Apps:Undefined" + "</p>";
            divList += "<div class='col-3 image-div' id='imageWrapper" + i + "'>" + "</div>";
            imageList += "<div class='span-text'><span>AVAILABLE</span></div>";
            imageList += "<input type='submit' class='request-button-pending' value='4 PENDING REQ'/>";
            $(liList).appendTo("#availableDevices");
            $(divList).appendTo("#li" + i);
            $(pList).appendTo("#Browser" + i);
            $(imageList).appendTo(deviceHistory.find("#imageWrapper" + i));
        }
        _attachEvents();
    };

    /*                  RENDERING OF THE PAGE ENDS               */

    /**
     * _deviceHistory [Appends the Device History information to the respective Li ELEMENT on click of plus button]
     */
    _deviceHistory = function () {
        $clickedBtn = $(this);
        assetNum = $clickedBtn.closest("li").children("div").first().text().split(':');
        assetNo = assetNum[1];
        if ($clickedBtn.closest("li").find("#innerDiv").length === 0) {
            util.ajaxCall("http://localhost:8333/api/get/pendingRequest.json?key=assetNo&value=" + assetNo, "GET", null, _createDeviceHistory);
        }
        else {
            plavika()
        }
        /* var $innerDiv = deviceHistory.find("#innerDiv"),
         y = $innerDiv.clone(),
         $clickedImage = $(this);
         y.css("display", "table");
         if ($clickedImage.closest("li").find("#innerDiv").length !== 0) {

         _deleteHistory($clickedImage);
         }
         else {
         $clickedImage.closest("li").append(y);
         }
         */
    };
    function plavika() {

        var $innerDiv = deviceHistory.find("#innerDiv"),
            y = $innerDiv.clone();
        y.css("display", "table");
        if ($clickedBtn.closest("li").find("#innerDiv").length !== 0) {
            _deleteHistory($clickedBtn);
        }
        else {
            $clickedBtn.closest("li").append(y);
        }
    }

    /**
     * _deleteHistory[Removes the Device History information from the respective Li ELEMENT on click of Minus button]
     */
    _deleteHistory = function ($clickedBtn) {
        $clickedBtn.closest("li").find("#innerDiv").remove();

    };
    /**
     * [Attaches the events on the buttons]
     */
    _attachEvents = function () {
        deviceHistory.find(".request-button-pending").on("click", _deviceHistory);

    };
    /**
     *_receiveJson [Render the page according to the data fetched from filter in the arg parameter]
     * @param  {Array} Array of objects of the devices available in our database
     */

    /*                 RENDERING OF THE PAGE ACCORDING TO THE FILTER DATA STARTS          */


    _receiveJson = function (data) {
        var collectedDevices = [],
            collectedBrowser = [],
            count,
            counter;
        finalCollection = [];
        /*FIRSTLY THE SELECTED DEVICE NAMES IN FILTER DATA WILL BE MATCHED WITH AVAILABLE DEVICES DATA AND
         WILL BE PUSHED IN  COLLECTED DEVICES ARRAY*/
        for (var j = 0; j < filterData.devices.length; j++) {
            for (var i = 0; i < data.length; i++) {
                if (filterData.devices[j] === data[i].deviceName) {
                    collectedDevices.push(data[i]);

                }
            }
            /* IF NO DEVICE MATCHES WITH AVAILABLE DEVICES */
            if (collectedDevices.length === 0) {
                counter = collectedDevices;
            }
        }
        /*SECONDLY THE SELECTED BROWSERS IN FILTER DATA WILL BE MATCHED WITH COLLECTED DEVICES ARRAY AND
         WILL BE PUSHED IN COLLECTED BROWSERS ARRAY*/
        for (var j = 0; j < filterData.browsers.length; j++) {
            count = collectedDevices.length ? collectedDevices : data;
            for (var z = 0; z < count.length; z++) {
                for (var i = 0; i < count[z].browser.length; i++) {
                    /**
                     * [Checks weather the selected element to be matched with collected devices array already exists or not]
                     * @return {Boolean Value} Returns TRUE if the elements is not present already else false
                     */
                    var detectingDuplicateEle = function () {
                        for (var k = 0; k < collectedBrowser.length; k++) {
                            if (count[z].id === collectedBrowser[k].id) {
                                return false;
                            }
                        }
                        return true;
                    };
                    if (detectingDuplicateEle()) {

                        if (filterData.browsers[j] === count[z].browser[i]) {
                            collectedBrowser.push(count[z]);
                        }
                    }
                }
                /* IF NO BROWSER MATCHES WITH AVAILABLE DEVICE BROWSERS */
                if (collectedBrowser.length === 0) {
                    counter = collectedBrowser;
                }
            }

        }
        if (!counter)
        /* CHECKING OUT ALL THE POSSIBLE COMBINATIONS TO INTIALIZE THE COUNTER FOR OS MATCHING IF THE COUNT IS NOT INTIALIZED EARLIER */
        {
            if (collectedDevices.length === 0 && collectedBrowser.length === 0) {
                counter = data;
            }
            else if (collectedDevices.length === 0 && collectedBrowser.length !== 0) {
                counter = collectedBrowser;
            }
            else if (collectedDevices.length !== 0 && collectedBrowser.length === 0) {
                counter = collectedDevices;
            }
            else if (collectedDevices.length !== 0 && collectedBrowser.length !== 0) {
                counter = collectedBrowser;
            }
        }
        /* CHECK OUT THE OS IN FILTER DATA WITH THE COUNTER */
        for (var j = 0; j < counter.length; j++) {
            if (filterData.osName.length !== 0) {
                for (var i = 0; i < counter.length; i++) {
                    /* AFTER ALL THE COMBINATIONS THE DESIRED ELEMENTS TO BE SHOWN ARE PUSHED IN FINAL COLLECTION ARRAY */
                    if (filterData.osName[j] === counter[i].os) {
                        finalCollection.push(counter[i]);
                    }
                }
            }
            else {
                finalCollection = counter;
            }
        }
        $("#availableDevices").remove();
        _deviceHistoryData(finalCollection);
    };

    /**
     *  _renderDeviceSearchData [Sets finalCollection so that search text input by the user can be looked up inside the data returned by commonData JSON]
     * @param  {[object]} data [Refers to the data returned by AJAX call made for commonData JSON]
     */
    _renderDeviceSearchData = function (data) {
        finalCollection = data;
    };

    /**
     * _fetchSearchResults [Displays the search results]
     * @param  {[string]} keySearchTerm [Refers to the search text input by the user]
     */
    _fetchSearchResults = function (keySearchTerm) {
        searchResultList = [];
        for (entry in finalCollection) {
            //Checking if the search term entered by the user is present in the JSON data returned
            if ((finalCollection[entry].id.toString().toLowerCase().indexOf(keySearchTerm.toLowerCase()) > -1
                || finalCollection[entry].deviceName.toLowerCase().indexOf(keySearchTerm.toLowerCase()) > -1)) {
                searchResultList.push(finalCollection[entry]);
            }
        }
        $('#availableDevices').remove();
        _deviceHistoryData(searchResultList);
    };

    /**
     * [Render the page according to the data fetched from filter in the arg parameter]
     * @param  {Object} an object as a parameter is passed which gets collected in the arg
     */
    deviceHistory.find("#content").on("filterChange", function (event, arg) {
        filterData = JSON.parse(arg);
        util.ajaxCall(config.json.commonData, "GET", null, _receiveJson);

    });

    $('#search').on("searchChange", function (event, arg) {
        _fetchSearchResults(arg);
    });

    init = function () {

        /* util.ajaxCall("http://localhost:8333/api/get/pendingRequest.json?key=assetNo&value="+assetNo,"GET",null,_createDeviceHistory);*/
        util.ajaxCall(config.json.commonData, "GET", null, _deviceHistoryData);
        if (typeof(finalCollection) === "undefined") {
            util.ajaxCall(config.json.commonData, "GET", null, _renderDeviceSearchData);
        }

    };
    return {
        init: init
    };
};
    AT.AssetRequest = atAssetRequest();
})(jQuery, window.AT || {}, window, window.document);

$(document).ready(function(){
    $(AT.AssetRequest.init());
});






