$(document).on( 'pagebeforeshow', '#' + PAGE_INDEX, function() {
  if( BLE_peripheral_data !== undefined ){
    ble.disconnect( BLE_peripheral_data.id );
  }
});

$(document).on( 'pagebeforeshow', '#' + PAGE_DEVICE_CONNECTION, function() {
   $("#info-device").text( "" );
   $("#info-device").html( "<p>Connected to " + BLE_device.name + "<br><pre>" + JSON.stringify( BLE_peripheral_data, undefined, 4 ) + "</pre></p>" );
   console.log( JSON.stringify( BLE_peripheral_data, undefined, 4 ) );
});
