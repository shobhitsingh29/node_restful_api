//Lost Device Testing
QUnit.module( "Lost Device Testing" );
var result;


QUnit.test( "Test Lost Device with wrong argument", function( assert ) {
    result = at.lostDevice.getDeviceData($('#an'));
    assert.equal(result, false , "Returns false as asset no is not present")
});


QUnit.test( "Test Lost Device with correct argument", function( assert ) {
    result = at.lostDevice.getDeviceData($('#assetNumber'));
    assert.equal(result, true , "Returns true as ID name is present")
});
