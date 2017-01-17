/**
 * Created by hbande on 2/2/2016.
 */
QUnit.module( "Device History Testing" );
var jsonData,
    testObj={
    devices:[],
    browsers:[],
    osName:[]
    },
    dummyJsonData=["Ipad","Iphone"],
    $deviceHistory= $("#deviceHistory");
setTimeout(function(){
    $deviceHistory.find("#availableDevices").find(".plusButton").on("click",function(){
        var $clickedImage = $(this);
        test("Inner Div Append test",function(){
           equal($clickedImage.closest("li").children().last().attr("id"),"innerDiv","inner Div appended successfully");
        });
    })},1000);
    $("#filter").on("filterChange",function(event,arg){
    jsonData= JSON.parse(arg);
    test_validJsonFormat(jsonData);
    test_validJsonData(jsonData);
});
/**
 * [Tests wheather the JSON that is passed from the filter to the page is ]
 * @param  {object} jsonData is an object which is points to the data that is clicked by the user
 * filter data properties in this function
 * @return {boolean} returns true if the asset matches with all the properties
 */
function test_validJsonFormat(jsonData){
    for(i in jsonData)
    {
        for(j in testObj) {
            if (i === j) {
                test('Filter data format testing', function () {
                    equal(i, j, "Filter data passed in correct format");
                });
            }
        }
    }
}
function test_validJsonData(jsonData)
{
    for(i=0;i<dummyJsonData.length;i++)
    {
        test("filter data testing",function(){
           equal(jsonData.devices[i],dummyJsonData[i],"filter data is correct!");
        });

    }

};