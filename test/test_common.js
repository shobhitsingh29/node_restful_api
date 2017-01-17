/**
 * Created by aja114 on 2/10/2016.
 */
//Test Case For GET AJAX
var key,value,pwd;
pwd={"password":"1234"};                //password to be matched to
value=JSON.stringify(pwd);
key=config.storeData.loginDataKey;
localStorage.setItem(key, value);

QUnit.test( "Test User Data with right argument", function( assert ) {
    result = util.verifyPassword("1234");
    assert.equal(result, true , "Returns true as password is same as stored in local storage");
});


QUnit.test( "Test User Data with wrong argument", function( assert ) {
    result = util.verifyPassword("qwerty");
    assert.equal(result, false , "Returns false as password is not same as stored in local storage");
});