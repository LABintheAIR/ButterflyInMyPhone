
$(document).on( 'pagebeforeshow', '#' + PAGE_DEVICE_CONNECTION, function() {
   $("#info-device").text( "" );
   $("#info-device").html( "<p>Ready to connect to " + BLE_device.name + "<br>" + JSON.stringify( BLE_peripheral_data ) + "</p>" );
});
