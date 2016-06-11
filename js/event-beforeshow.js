$(document).on( 'pagebeforeshow', '#' + PAGE_INDEX, function() {
  if( BLE_peripheral_data !== undefined ){
    ble.disconnect( BLE_peripheral_data.id );
  }
});

$(document).on( 'pagebeforeshow', '#' + PAGE_DEVICE_CONNECTION, function() {
   console.log( JSON.stringify( BLE_peripheral_data, undefined, 4 ) );
});
