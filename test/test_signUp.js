//Registration Page Testing
QUnit.module("Registration Page Testing");
var result;

//Email testing for sapient.com domain
QUnit.test("Test email address with correct argument", function(assert) {
    result = at.formValidation.emailMethod("anu@sapient.com");
    assert.equal(result, true, "Returns true as email address domain is correct");
});
QUnit.test("Test email address with incorrect argument", function(assert) {
    result = at.formValidation.emailMethod("harnoor@gmail.com");
    assert.equal(result, false, "Returns false as email address domain is incorrect")
});

//Mobile number testing for Indian mobile numbers
QUnit.test("Test Mobile number with correct number", function(assert) {
    result = at.formValidation.phoneNumberMethod("9790722748");
    assert.equal(result, true, "Returns true as given mobile no is correct");
});

QUnit.test("Test Mobile number with incorrect number having length less than 10 ", function(assert) {
    result = at.formValidation.phoneNumberMethod("979072274");
    assert.equal(result, false, "Returns false as given mobile no's length is incorrect")
});

QUnit.test("Test Mobile number with incorrect number starting not with 7-9 ", function(assert) {
    result = at.formValidation.phoneNumberMethod("679072274");
    assert.equal(result, false, "Returns false as given mobile no's is incorrect")
});

//Testing for Fullname should be letters only
QUnit.test("Test full name with correct format", function(assert) {
    result = at.formValidation.checkNameMethod("Shobhit Singh");
    assert.equal(result, true, "Returns true as given format for full name is correct");
});

QUnit.test("Test full name with incorrect format", function(assert) {
    result = at.formValidation.checkNameMethod("Plavika123");
    assert.equal(result, false, "Returns false as given format for full name is incorrect")
});