//Check if the first argument is truthy
QUnit.test( "hello test", function( assert ) {
    assert.ok( 1 == "1", "Passed!" );
});


//non-strict comparison (==)
QUnit.test( "a basic test example", function( assert ) {
    var value = "hello";
    assert.equal( value, "hello", "We expect value to be hello" );
});

// A recursive, strict comparison
QUnit.test( "deepEqual test", function( assert ) {
    var obj = { foo: "bar" };
    assert.deepEqual( obj, { foo: "bar" }, "Two objects can be the same in value" );
});

//
QUnit.test( "ok test", function( assert ) {
    assert.ok( true, "true succeeds" );
    assert.ok( "non-empty", "non-empty string succeeds" );

    assert.ok( false, "false fails" );
    assert.ok( 0, "0 fails" );
    assert.ok( NaN, "NaN fails" );
    assert.ok( "", "empty string fails" );
    assert.ok( null, "null fails" );
    assert.ok( undefined, "undefined fails" );
});

QUnit.test( "equal test", function( assert ) {
    assert.equal( 0, 0, "Zero, Zero; equal succeeds" );
    assert.equal( "", 0, "Empty, Zero; equal succeeds" );
    assert.equal( "", "", "Empty, Empty; equal succeeds" );
    assert.equal( 0, false, "Zero, false; equal succeeds" );
    assert.equal( "three", 3, "Three, 3; equal fails" );
    assert.equal( null, false, "null, false; equal fails" );
});

QUnit.test( "strictEqual test", function( assert ) {
    var obj = { foo: "bar" };
    assert.strictEqual( obj, { foo: "bar" }, "1 and 1 have the same value and type" );
});