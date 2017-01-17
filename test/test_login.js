
//login Testing
        QUnit.module( "login Testing" );
        var url= config.json.loginUserData+"raechel@sapient.com";
        util.ajaxCall(url, "GET", null, getSetVerifyDataDummyLogin);


function getSetVerifyDataDummyLogin(data){
    var flag;
    if(data.data[0].email==="raechel@sapient.com"){

        flag= true;
    }
    else
    {
        flag= false;
    }

    test('Get Name Through AJAX Data',function(assert){
        assert.equal(flag,true,"GET AJAX Working Correctly for email id");
    });
}

var url1= config.json.loginUserData+"ross@sapient.com";
util.ajaxCall(url1, "GET", null, getSetVerifyDataDummyLogin1);


function getSetVerifyDataDummyLogin1(data){
var flag;
    if(data.data[0].email==="abcc@sapient.com"){

        flag= true;
    }
    else
    {
        flag= false;
    }


    test('Get Name Through AJAX Data',function(assert){
        assert.equal(flag,true,"GET AJAX Working Correctly for email id");
    });
}
