/*!
 * lightBox.js
 * This file contains the code for the lightBox.
 *
 * @project   ASSET TRACKER
 * @author    SHOBHIT SINGH, SapientNitro <ssingh239@sapient.com>
 *
 */

AT.lightBox = (function () {

    'use strict';

    var _startBox,
        _createLightBox,
        init;
    /**
     * [_createLightBox function to create light box and append to page]
     *
     */
    _createLightBox = function () {

        var div = "<div id='lightBox'><div class='guidelines-opaque popup-opaque'>" +
            "</div><div id='popup' class='popup-heading popup-bold'><h2>Guidelines</h2>" +
            "<div class='popup-data'>" +
            "<p>Lorem ipsum dolor sit amet," +
            " consedtetuer adipiscing elit.Anenean com-modo ligula eget dolor" +
            ".Aenean massa.Cum sociis natoque penatibus et magnis dis partutrient mantes," +
            " nascetur ridiculus mus Donec quam </p><span class='popup-bold'>Lorem" +
            " ipsum dolor sit amet, conectetuer adipiscing elit.</span>" +
            "<input type='button' class='popup-button-hide' value='OK'></div></div></div>"
        $("body").append(div);
    };

    /**
     * [_startBox function to add the functionality of show and hide on clicks]
     *
     */
    _startBox = function () {
    $(".popup-opaque").css("opacity","0.0");
    $("#lightBox").hide();

    $(".popup-button-show").on("click",function(){

        $(".popup-opaque").css("opacity","0.6");
        $("#lightBox").show();
    });

    $(".popup-button-hide").on("click",function(){
        $(".popup-opaque").css("opacity","0.0");
        $("#lightBox").hide();
    });

    };

        init = function(){

            _createLightBox();
            _startBox();
        };

        return {
            init:init
        };


})(window.AT.lightBox || {});

AT.lightBox.init();
