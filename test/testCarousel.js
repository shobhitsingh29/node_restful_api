var	expectedLeftPosition,
	createdResult = false,
	containerLeftPosition = $('#carousel').offset().left,
	createdLeftPosition;

//First Scenario: Page Loads
createdLeftPosition = $('#carousel ol').offset().left;
createdLeftPosition -= containerLeftPosition;
expectedLeftPosition = 0;

test('On Page Load', function(){
	equal(createdLeftPosition, expectedLeftPosition, "Position of ol is correct");
});

//Second scenario: User Clicks Next
$('#arrowButtonRight').click(function(){
	createdLeftPosition = $('#carousel ol').offset().left;
	createdLeftPosition -= containerLeftPosition;
	if(createdLeftPosition < 0 || createdLeftPosition === 0){
		createdResult = true;
	}
	QUnit.test("Next Image", function(assert){
		assert.ok(createdResult, "Correctly moved to the next image");
	});	
});

//Third Scenario: User Clicks Previous
$('#arrowButtonLeft').click(function(){
	createdLeftPosition = $('#carousel ol').offset().left;
	createdLeftPosition -= containerLeftPosition;
	if(createdLeftPosition < 0 || createdLeftPosition === 0){
		createdResult = true;
	}		
	QUnit.test("Next Image", function(assert){
		assert.ok(createdResult, "Correctly moved to the previous image");
	});
});