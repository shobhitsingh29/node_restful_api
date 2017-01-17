QUnit.module("module qwe");
var dummyLocalObject,dummyJson,result;
 dummyLocalObject={fullName:"raechel",
    oracleId:117378,
    email:"raechel@sapient.com",
    phone:"9483576354",
    jobTitle:"Sr. Manager",
    jobLocation:"Infospace unit-1 Gurgaon",
    password:"1234",
    url:"../public/images/content/stephini.jpg"
};


//testing if data is correctly retrievd from local storage
dummyJson=JSON.stringify(dummyLocalObject);
localStorage.setItem("dummyData",dummyJson);

QUnit.test( "Test User Data with right argument", function( assert ) {
    result = util.getLoginData("dummyData");

    assert.equal(result.fullName, dummyLocalObject.fullName , "Returns correct user name");

});

QUnit.test( "Test User Data with right argument", function( assert ) {
    result = util.getLoginData("dummyData");
    assert.equal(result.oracleId, dummyLocalObject.oracleId , "Returns correct oracle id");
});

//testing verifyPassword function
QUnit.test( "Test User Data with right argument", function( assert ) {
    result = util.verifyPassword("1234");
    assert.equal(result, true , "Returns true as password is same as stored in local storage");
});

QUnit.test( "Test User Data with wrong argument", function( assert ) {
    result = util.verifyPassword("qwerty");
    assert.equal(result, false , "Returns false as password is not same as stored in local storage");
});


