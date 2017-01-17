/**
 * Created by shobhit singh on 2/2/2016.
 */
QUnit.module( "Manage Device Testing" );

setTimeout(function(){
        $manageDevice=$("#manageDevice");

        $manageDevice.find(".edit").on("click",test_deviceRedirect);
        $manageDevice.find(".delete").on("click",test_deviceRedirect);

        function test_deviceRedirect()
        {


            var li,
                assetNo,
                deviceName,
                deviceConfigurationTmp,
                browser,
                deleteData,
                defaultApps,
                os,
                $this=$(this);


            li = $this.closest("li");

            assetNo = li.eq(0).find("div").eq(0).text().split(':')[1];
            deviceName = li.eq(0).find("div").eq(1).text().split(':')[1];
            deviceConfigurationTmp = li.eq(0).find("div").eq(2).text().split(':');
            browser = deviceConfigurationTmp[2].split(" ")[0];
            defaultApps = deviceConfigurationTmp[4];
            os = deviceConfigurationTmp[3].split(" ")[0];


//if edit is clicked

            QUnit.test( "Test email address with incorrect argument", function( assert ) {
                result = $this.hasClass("edit");
                assert.equal(result, true ,"Returns true if clicked on edit")
            });
            QUnit.test( "Test email address with incorrect argument", function( assert ) {
                result = $this.hasClass("edit");
                assert.equal(result, false ,"Returns false if clicked on edit")
            });
            QUnit.test( "Test email address with incorrect argument", function( assert ) {
                result = $this.hasClass("delete");
                assert.equal(result, true ,"Returns true if clicked on delete")
            });
            QUnit.test( "Test email address with incorrect argument", function( assert ) {
                result = $this.hasClass("delete");
                assert.equal(result, false ,"Returns false if clicked on delete")
            });

            /*if($this.hasClass("edit"))
            {

                var editData = {
                    'assetNo':assetNo,
                    'deviceName': deviceName,
                    'browser':browser,
                    'os':os,
                    'defaultApps':defaultApps
                };

                util.setDeviceData(config.storeData.editDataKey,editData);//calling function to set data to local storage

                //REDIRECTION TO ADD DEVICE PAGE
                location.replace("");

            }*/
//if delete is clicked
           /* if($this.hasClass("delete"))
            {
                deleteData = {
                    'assetNo':assetNo,
                    'deviceName': deviceName
                };

                util.setDeviceData(config.storeData.deleteDataKey,deleteData);//calling function to set data to local storage

                //REDIRECTION TO LOST DEVICE PAGE
                location.replace("");

            }*/
        }

    }, 100);
