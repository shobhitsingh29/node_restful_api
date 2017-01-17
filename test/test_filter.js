/**
 * Created by hbande on 2/2/2016.
 */
$(window).load(function(){
    var x;
    function callOnClick() {
        x = $("input:checked");
    }

    callOnClick();
    function test_filterLogic(){
        test('Filter Logic Testing',function(){

            equal(x.length,2,"Filter logic working correctly");
        });
    }
    test_filterLogic();
});
