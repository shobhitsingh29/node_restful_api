//Left panel Testing
QUnit.module( "Left Panel Testing" );
var result;

//Wrong ID is passed
QUnit.test( "Test User Data with wrong argument", function( assert ) {
    result = at.leftPanel.setUserData($('#aB'));
    assert.equal(result, false , "Returns false as ID name is not present")
});

//Correct ID is passed and local storage exists
QUnit.test( "Test User Data with correct argument passed", function( assert ) {
    result = at.leftPanel.setUserData($('#testUserData'));
    assert.equal(result, true , "Returns true as ID name is present")
});

//Local storage needs to be cleared for test to pass
QUnit.test( "Test User Data when local storage is cleared", function( assert ) {
    result = at.leftPanel.setUserData($('#testUserData'));
    assert.equal(result, false , "Returns as according to presence of local storage")
});

//Dashboard Testing
QUnit.module( "Dashboard Testing" );
util.ajaxCall(config.json.dashboardDummyData, "GET", null, getDummyData);
function getDummyData (data){
    QUnit.test( "Dashboard Test", function( assert ) {
        assert.equal(data[0].deviceCount, "4 Damage" , "Value from json is same as expected")
    });
}

//Common function
QUnit.module( "Common function Testing" );
//To set login data in local storage
QUnit.test( "Without passing correct argument to set login data", function( assert ) {
    result = util.setLoginData(null,null);
    assert.equal(result, false , "No arguments passed")
});

QUnit.test( "Passing correct argument to set login data", function( assert ) {
    result = util.setLoginData('key','value');
    assert.equal(result, true , "2 arguments passed for key and value ")
});

//To get login data from local storage
