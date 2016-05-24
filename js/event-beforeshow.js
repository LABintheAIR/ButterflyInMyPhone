
$(document).on( 'pagebeforeshow', '#' + PAGE_DEVICE_CONNECTION, function() {
   $("#info-device").text( "" );
   $("#info-device").html( "<p>Connected to " + BLE_device.name + "<br><pre>" + JSON.stringify( BLE_peripheral_data, undefined, 4 ) + "</pre></p>" );
   console.log( JSON.stringify( BLE_peripheral_data, undefined, 4 ) );
});
