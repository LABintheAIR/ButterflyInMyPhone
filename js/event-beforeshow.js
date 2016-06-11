$(document).on( 'pagebeforeshow', '#' + PAGE_INDEX, function() {
  if( BLE_peripheral_data !== undefined ){
    ble.disconnect( BLE_peripheral_data.id );
  }
});

$(document).on( 'pagebeforeshow', '#' + PAGE_DEVICE_CONNECTION, function() {
  console.log( JSON.stringify( BLE_peripheral_data, undefined, 4 ) );
  jQuery('.device-name').text( BLE_peripheral_data.name );
  jQuery('#select_aq_url').text('');

  var select = window.localStorage.getItem( LOCAL_AQ_URL );

  jQuery.each( AQ_URL, function( key, value ) {
    var selected = "";
    if( value == select ) { selected = "selected='selected'"; }
    jQuery('#select_aq_url').append( "<option value='" + value + "' " + selected + ">" + key + "</option>" );
  });
  jQuery('#select_aq_url').selectmenu("refresh");
});
