/*
 * DashboardCarousel.js
 * This file is meant for rendering carousel component present on the left panel
 * @project   Asset Tracker Dashboard Carousel
 * @author    Apoorv Gupta , SapientNitro
 */

/**
 * [implements the logic of carousel functionality]
 */
(function($, AT, window, document) {
"use strict";
/**
 * atCarousel [namespace for module Carosuel in dashboard ]
 * @returns {{init: (_init|*)}}[ function init to initialize the module]
 */
var atCarousel = function(){
    var init,
        index,
        liWrapper,
        _nextSlide,
        _previousSlide,
        _continuousSlide,
        _initialize,
        interval,
        containerWidth,
        liWidth,
        changePercentOnTransition,
        timeBetweenSlides,
        changePercentInitial = 100,
        nextSlideCounter = 0,
        changePositionValue = 0,
        previousSlideCounter = 0,
        $orderedList = $('#carousel').find('ol'),
        noOfImages;
    /**
    * [Implements slideshow functionality i.e continuous movement of the slides]
    */
    _continuousSlide = function(){
        if(nextSlideCounter === noOfImages-1){
            //If last image in slide is reached, first image will be shown as the next image
            nextSlideCounter = 0;
            changePositionValue += changePercentOnTransition;
            $orderedList.animate({left: changePositionValue + '%'});
        }
        else{
            //Changing left position of ol to slide for the next image
            changePositionValue -= changePercentInitial;
            $orderedList.animate({left: changePositionValue + '%'});
            nextSlideCounter++;
        }
        previousSlideCounter = nextSlideCounter;
    };

    /**
    * [Implements next slide functionality]
    */
    _nextSlide = function(){
        //Stopping the continuous flow of slides on the click of next button
        clearInterval(interval);
        //Next image will be called
        _continuousSlide();
        //Continuous flow of slides will be resumed from the current image 
        interval = setInterval(_continuousSlide,timeBetweenSlides);
    };

    /**
    * [Implements previous slide functionality]
    */
    _previousSlide = function(){
        //Stopping the continuous flow of slides on the click of previous button
        clearInterval(interval);
        //If current image is first image, left position would be adjusted to show the last image
        if(previousSlideCounter === 0){
            changePositionValue -= changePercentOnTransition;
            $orderedList.animate({left: changePositionValue + '%'});
            previousSlideCounter = noOfImages-1;
        }
        //Changing left position of ol to slide for the previous image
        else{
            changePositionValue += changePercentInitial;
            $orderedList.animate({left: changePositionValue + '%'});
            previousSlideCounter--;
        }
        nextSlideCounter = previousSlideCounter;
        //Continuous flow of slides will be resumed from the current image
        interval = setInterval(_continuousSlide, timeBetweenSlides);
    };

    /**
    * [Callback function for the ajax call made to fetch the data from JSON]
    * @param  {[object]} response [stores the JSON data returned when AJAX call is made]
    */
    _initialize = function(response){
        noOfImages = response.length;
        //Extracting container width to set the width of li elements dynamically
        containerWidth = $('#carousel').width();
        //Setting the width of the ordered list to accomodate all the images in a line
        $orderedList.width(noOfImages*100+'%');
        liWidth = 100/noOfImages;
        liWrapper = "";
        for(index in response){
            //Creating li elements on the fly and setting their width. And, putting images inside these li to slide for the carousel
            liWrapper += "<li class='imageHolder' style='width: " + liWidth + "% '><img src=" + response[index].src + " alt=" + response[index].name + "/></li>";
        }
        $orderedList.append(liWrapper);
        //change in left position when extreme ends are reached. Inorder to implement circular carousel   
        changePercentOnTransition = (noOfImages-1)*100;
        //Invoking continuous slide to facilitate the basic working of carousel
        interval = setInterval(_continuousSlide, timeBetweenSlides);
        $('#arrowButtonRight').on('click',_nextSlide);
        $('#arrowButtonLeft').on('click',_previousSlide);
    };

    /**
    * [Implies invoking method where in the AJAX call is made to fetch the data from JSON]
    */
    init = function(time, url){
        timeBetweenSlides = time;
        util.ajaxCall(url, "GET", null, _initialize);
    };

    return {
        init: init
    };
};
AT.Carousel = atCarousel();
})(jQuery, window.AT || {}, window, window.document);

$(document).ready(function(){
    AT.Carousel.init(config.storeData.searchingData,config.json.dashboardCarouselData);
});

