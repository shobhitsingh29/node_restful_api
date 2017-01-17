//Global name space
var AT= window.AT || {};

var util = (function() {
    var ajaxCall,
        setLoginData,
        getLoginData,
        setDeviceData,
        getDeviceData,
        verifyPassword,
        localData;
    /**
     * ajaxCall [To implement GET and POST AJAX requests]
     * @param  {[string]} url_passed      [Refers to the URL of the JSON file from where data needs to be fetched]
     * @param  {[string]} type_passed  [Specifies whether it is GET or POST request]
     * @param  {[object]} data_passed  [Refers to the data that needs to be posted in case of POST request]
     * @param  {[function]} successCallBack [Callback function to be called when request gets processed successfully]
     * @return {[object]}  [Returns data fetched through the AJAX request]
     */
    ajaxCall = function(url_passed, type_passed, data_passed, successCallBack) {
        //GET Method
        if (type_passed == "GET") {
            $.ajax({
                url: url_passed,
                type: "GET",
                data:data_passed,
                datatype: 'json',

                success: function (data) {
                    if(data){
                        successCallBack(data);
                    }
                    else{

                        var $popUpContent = $(".popup-data"),
                            $popupOpaque = $(".popup-opaque"),
                            $lightBox = $("#lightBox"),
                            $guidelinespopup =  $(".popup-heading");

                        $popupOpaque.css("opacity", "0.6");
                        $lightBox.show();

                        $guidelinespopup.find("h2").text(config.errorMsg.sorry);
                        $popUpContent.find("p").html("");
                        $popUpContent.find("span").text(config.errorMsg.successFail);

                    }

                },
                error: function(xhr, ajaxOptions) {
                    //On error
                    if (xhr.status == 200) {
                        alert(ajaxOptions);
                    }
                    else {
                        location.href=config.templateUrl.ajaxCallFail;
                    }
                }
            });
        }
        //POST Method
        else if (type_passed === "PUT") {
            $.ajax({
                url: url_passed,
                type: "PUT",
                datatype: "json",
                data: data_passed,
                success: function (response) {
                    if (response) {
                        if(response.success) {
                            successCallBack(response.success);
                            /*$(".popup-heading").find("h2").text(config.infoMsg.congrats);
                            $(".popup-data").find("p").html("");
                            $(".popup-opaque").css("opacity", "0.6");
                            $("#lightBox").show();*/
                        }
                        else{
                            successCallBack(response.success);
                           /* $(".popup-heading").find("h2").text(config.errorMsg.sorry);
                            $(".popup-data").find("p").html("");
                            $(".popup-opaque").css("opacity", "0.6");
                            $("#lightBox").show();*/
                        }
                    }
                },
                error: function(xhr, ajaxOptions) {
                    //On error
                    if (xhr.status == 200) {
                        alert(ajaxOptions);
                    }
                    else {
                        location.href=config.templateUrl.ajaxCallFail;
                    }
                }
            });
        }
    };

    /**
     * setLoginData [To set logged in user data into local storage]
     * @param key {String} Key name
     * @param value {String} value passed to be stored
     * @return {boolean}
     */
    setLoginData = function(key, value) {
        if (!key || !value) {
            return false;
        }
        if (typeof value === "object") {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
        return true;
    };

    /**
     * getLoginData [To get logged in user data from local storage
     * @param key {String} Key name corresponding to which value needs to be retrieved
     * @return {Object}
     */
    getLoginData = function(key) {

        if (typeof(Storage) === "undefined"  ) {
            console.log(config.errorMsg.storageNotSupported);
        }
        else {
            var value = localStorage.getItem(key);
            if (!key || !value){
                return;
            }
            else if (value[0] === "{") {
                value = JSON.parse(value);
            }
        }
        return value;
    };
    /**
     * setDeviceData Stored Device details in session storage
     * @param key Key name with which data is to be stored
     * @param value Device details to be stored
     */

    setDeviceData = function(key, value) {
        if (!key || !value) {
            return;
        }
        if (typeof value === "object") {
            value = JSON.stringify(value);
        }
        sessionStorage.setItem(key, value);
    };

    /**
     * getDeviceData To get device details stored in session storage
     * @param key Key name corresponding to which value needs to be retrieved
     * @return {Object}
     */
    getDeviceData = function(key) {
        var value = sessionStorage.getItem(key);
        if (!value) {
            return;
        }
        //If object that has been stringified
        if (value[0] === "{") {
            value = JSON.parse(value);
        }
        return value;
    };


    /**
    * [verifyPassword verifies if given password is same as the password stored in localstorage]
    * @param  {[String]} pwd The pwd is the string that is passed to be compared with password in local storage
    * @return {[boolean]} On success returns the boolean value corresponding to the comparison done
    */

    verifyPassword = function(pwd){
        var isTrue = false;

        localData = getLoginData(config.storeData.loginDataKey);
        if(localData.password === pwd){
            isTrue = true;
        }
        return isTrue;

    };

    return {
        ajaxCall : ajaxCall,
        setLoginData : setLoginData,
        setDeviceData : setDeviceData,
        getLoginData : getLoginData,
        getDeviceData : getDeviceData,
        verifyPassword : verifyPassword
    }
})(window.util || {});

