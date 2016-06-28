$(document).on( 'pagebeforeshow', '#' + LAB_Constant().PAGE_INDEX, function() {
  if( BLE_peripheral_data !== undefined ){
    ble.disconnect( BLE_peripheral_data.id );
  }
});
/*
$(document).on( 'pagebeforeshow', '#' + LAB_Constant().PAGE_DEVICE_CONNECTION, function() {
  console.log( JSON.stringify( BLE_peripheral_data, undefined, 4 ) );
  jQuery('.device-name').text( BLE_peripheral_data.name );
  jQuery('#select_aq_url').text('');

  var item = window.localStorage.getItem( LAB_Constant().LS_DEVICE_PARAM_PREFIX + BLE_peripheral_data.id );
  if( item === null ){
    DC_set_number_led( 1 );
  }
  else{
    DC_set_number_led( JSON.parse( item ).length );
  }
});
*/
