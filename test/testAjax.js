//Test Case For GET AJAX
util.ajaxCall("../services/dummy.json", "GET", null, response);

function response(data){
	test('Get Name Through AJAX Data',function(){
		equal(data[0].Name,"Aniket","GET AJAX Working Correctly");
	});
}