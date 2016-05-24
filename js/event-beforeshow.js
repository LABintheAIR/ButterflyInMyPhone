
$(document).on( 'pagebeforeshow', '#' + PAGE_DEVICE_CONNECTION, function() {
   $("#info-device").text( "" );
   $("#info-device").html( "<p>Connected to " + BLE_device.name + "<br>" + JSON.stringify( BLE_peripheral_data ) + "</p>" );
});
