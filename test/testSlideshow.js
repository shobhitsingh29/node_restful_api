//Test Case For Slideshow Logic
var noOfImages;
util.ajaxCall(config.json.carouselData, "GET", null, slideshowTest);
function slideshowTest(data){
	noOfImages = data.length;
	test('Slideshow Testing',function(){
		equal(noOfImages, "3", "Correct No of Images Have Been Received");
	});
}