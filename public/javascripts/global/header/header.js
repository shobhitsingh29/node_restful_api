var at_header = (function() {
"use strict";
var $img,
    $header = $("#header"),
    $logo = $("#header div img:nth-child(1)"),
    $headerUl = $header.find("ul"),
    $headerDiv = $("#header div div"),
    setUserData,
    removeUserData,
    initialize,
    val,
    dropdown;
    
dropdown = function(){
    // This displays the fly out menu when i click on avatar present in the header
    if($headerUl.hasClass("display-table")){
        $headerUl.removeClass("display-table").addClass("display-none");
    }
    else {
        $headerUl.removeClass("display-none").addClass("display-table");
        $headerDiv.append($headerUl);
    }
    $headerUl.find("li:last-child").click(removeUserData);
};

setUserData = function(){
    val = util.getLoginData(config.storeData.loginDataKey);
    if (val == undefined) {
        return false;
    }
    //User data exists in local storage so data populated in left panel
    else {
        $headerDiv.find('p').html(val.fullName);
        $headerDiv.find('img').attr("src", val.templateUrl);
    }
};

removeUserData = function(){
    localStorage.removeItem(config.storeData.loginDataKey);
};

initialize = function(){
    $logo.addClass("cursorPointer");
    $logo.click(function(){
        window.location.href = config.templateUrl.adminDashboard;
    });
    setUserData();
    if (!localStorage[config.storeData.loginDataKey]) {
        window.location.replace("login.html");
    }
    $img = $headerDiv.find('img');
    $img.addClass("cursorPointer");
    $img.click(dropdown);
};

return {
    init : initialize
}
})();

at_header.init();