$(document).on( 'pagebeforeshow', '#' + LAB_Constant().PAGE_INDEX, function() {
  if( BLE_peripheral_data !== undefined ){
    ble.disconnect( BLE_peripheral_data.id );
  }
});

$(document).on( 'pagebeforeshow', '#' + LAB_Constant().PAGE_DEVICE_CONNECTION, function() {
  console.log( JSON.stringify( BLE_peripheral_data, undefined, 4 ) );
  jQuery('.device-name').text( BLE_peripheral_data.name );
  jQuery('#select_aq_url').text('');

  var select = window.localStorage.getItem( LAB_Constant().LS_AQ_URL );

  jQuery.each( LAB_Url_Station(), function( key, value ) {
    var selected = "";
    if( value == select ) { selected = "selected='selected'"; }
    jQuery('#select_aq_url').append( "<option value='" + value + "' " + selected + ">" + key + "</option>" );
  });
  jQuery('#select_aq_url').selectmenu("refresh");
});
