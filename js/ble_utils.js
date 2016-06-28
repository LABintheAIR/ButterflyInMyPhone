var BLE_device = "";
var BLE_scan_devices = [];
var BLE_peripheral_data;

function startScan(){
  $('#devices').text( "" );

  BLE_storage = "";
  BLE_scan_devices = [];

  ble.scan( [], 5, succesScan, failureScan );
  timeoutScan( 5 );
}

function timeoutScan( seconds ){
  if( seconds === 0 )
  {
    $('#button_scan').val( "Start scan");
    $('#button_scan').button('refresh');
  }
  else
  {
    $('#button_scan').val( "Scanning... (" + seconds + " second(s) left.)");
    $('#button_scan').button('refresh');
    setTimeout( timeoutScan, 1000, seconds-1 );
  }
}

function succesScan( device ){
  $('#devices').append( "<tr style='border: 1px solid black;'><td>" + device.name + "</td><td>" + device.rssi + " dBm</td><td><input type='button' value='Connect' onclick='javascript:connectToDevice(" + BLE_scan_devices.length + ");'></td></tr>" );
  //$('#devices').append( "<tr style='border: 1px solid black;'><td>" + device.name + "</td><td>" + device.rssi + " dBm</td><td><input type='button' value='Connect' onclick='$( \":mobile-pagecontainer\" ).pagecontainer( \"change\", \"data/device-connect.html\" );'></td></tr>" );
  BLE_scan_devices.push( device );

}

function failureScan(){
  showPopup("Scan failed...", 'warning');
}

function connectToDevice( id ) {
  BLE_device = BLE_scan_devices[id];
  showSimpleLoading( "Connection to the device" );
  ble.connect( BLE_device.id, successConnection, failConnection );
}

function successConnection( data ) {
  BLE_peripheral_data = data;
  hideLoading();
  $.mobile.pageContainer.pagecontainer( "change", "#" + LAB_Constant().PAGE_DEVICE_CONNECTION );
}

function failConnection( data ) {
  hideLoading();
  showPopup( "Connection failed...", 'warning' );
  window.history.go(-1);
}

function findFirstWriteCharac() {
  var tab = BLE_peripheral_data.characteristics;
  var patt = new RegExp(/^[a-z0-9]+0001-/i); //See https://learn.adafruit.com/adafruit-feather-32u4-bluefruit-le/uart-service

  for( i = 0; tab.length; ++i )
  {
    if( patt.test( tab[i].service ) && tab[i].properties.indexOf( "Write" ) > -1 ) {
      return tab[i];
    }
  }

  return false;
}

function sendBufferData( bufferData ){
	var charac = findFirstWriteCharac();

  if( !charac ) {
    showPopup( "No Writable UUID", 'error' );
    return;
  }

  ble.write( BLE_peripheral_data.id, charac.service, charac.characteristic, bufferData, function() {}, function() { showPopup("Failed to send data", 'error' ); });
}

function generateDataBuffer( red, green, blue ){
  var data = new Uint8Array(5);

  data[0] = 0x21; // '!'
  data[1] = 0x43; // 'C'
  data[2] = red;
  data[3] = green;
  data[4] = blue;

  return data.buffer;
}

function sendAirQuality()
{
  showSimpleLoading( "Getting AirQuality" );
  $.ajax( window.localStorage.getItem( LAB_Constant().LS_AQ_URL ), { "timeout" : LAB_Constant().AJAX_TIMEOUT } )
   .done( function( data ){
    sendBufferData( generateDataBuffer( data.color[0][0], data.color[0][1], data.color[0][2] ) );
   })
   .fail( function( jqXHR, textStatus, errorThrown ){
    showPopup( "Fail to get AirQuality data.<br>Error text status : " + textStatus + "<br>Error thrown : " + errorThrown, 'error' );
   })
   .always( function(){
    hideLoading();
  });
}
