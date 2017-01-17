//User Input Choices can be either of the following: 101, Pad, pad, 109
var userInputChoices, 
	liElementsCreated,
	liElementsExpected,
	idExpected,
	idCreated,
	deviceNameExpected,
	deviceNameCreated,
	_callOnSearch,
	$search = $('[type=search]');	

_callOnSearch = function(){
	userInputChoices = $(this).val();
	//First Scenario
	if(userInputChoices === "101"){
		$search.trigger('searchChange',[userInputChoices]);
		liElementsCreated = $('#availableDevices li').length;
		console.log(liElementsCreated);
		liElementsExpected = "1";
		idCreated = $('#availableDevices li:nth-child(1) div:nth-child(1)').text();
		idExpected = "Assest Numb. :"+userInputChoices;
		test('Number Of Rows Created', function(){
			equal(liElementsCreated, liElementsExpected, "Correct no of rows have been created");
		});
		console.log(idCreated);
		test('ID Created', function(){
			equal(idCreated, idExpected, "Correct ID has been created");
		});
	}

	//Second Scenario 
	if(userInputChoices.toLowerCase() === "Pad".toLowerCase()){
		$search.trigger('searchChange',[userInputChoices]);
		liElementsCreated = $('#availableDevices li').length;
		console.log(liElementsCreated);
		liElementsExpected = "2";
		deviceNameCreated = $('#availableDevices li:nth-child(1) div:nth-child(2)').text();
		deviceNameExpected = "Device Name :Ipad";
		test('Number Of Rows Created', function(){
		equal(liElementsCreated, liElementsExpected, "Correct no of rows have been created");
		});
		console.log(deviceNameCreated);
		test('Device Name Created', function(){
			equal(deviceNameCreated, deviceNameExpected, "Correct device name has been created");
		});
	}

	//Third Scenario
	if(userInputChoices === "109"){
		$search.trigger('searchChange',[userInputChoices]);
		liElementsCreated = $('#availableDevices li').length;
		liElementsExpected = "1";
		idCreated = $('#availableDevices li div:nth-child(1)').text();
		idExpected = "Assest Numb. :"+userInputChoices;
		test('Number Of Rows Created', function(){
			equal(liElementsCreated, liElementsExpected, "Correct no of rows have been created");
		});
		test('ID Created', function(){
			equal(idCreated, idExpected, "Correct ID has been created");
		});
	}

};

$search.keyup($.debounce(3000,_callOnSearch));