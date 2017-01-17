/*
 * search.js
 * This file is meant for rendering search component present on deviceHistory, manageDevice and assetRequestAdmin page
 * @project   Asset Tracker Search
 * @author    Apoorv Gupta , SapientNitro
 */
/**
 * [implements the logic of search functionality]
 */
(function($, AT, window, document) {
"use strict";
    /**
     * atSearch [namespace for module Search ]
     * @returns {{init: (_init|*)}}[ function init to initialize the module]
     */
    var atSearch = function(){
      var init,
          _callOnSearch,
          $search;
    /**
    * [To trigger searchChange event which handles the logic for searching]
    */
    _callOnSearch = function(){
        if($search.length)
        {
            $search.trigger("searchChange", [$(this).val()]);
        }
    };

    /**
    * [To invoke triggering method when value in search box changes]
    */
    init= function(){
        $search = $('#search');
        $search.on('keyup', $.debounce(config.storeData.searchingData,_callOnSearch));
    };
    return {
        init: init
    };
};
AT.Search = atSearch();
})(jQuery, window.AT || {}, window, window.document);

$(document).ready(function(){
    AT.Search.init();
});