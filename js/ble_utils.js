var BLE_device = "";
var BLE_scan_devices = [];
var BLE_peripheral_data;

function startScan(){
  $('#devices').text( "" );

  BLE_storage = "";
  BLE_scan_devices = [];
  
  ble.scan( [], 5, succesScan, failureScan );
}

function succesScan( device ){
  $('#devices').append( "<tr><td>" + device.name + "</td><td>" + device.rssi + " dBm</td><td><a href='javascript:connectToDevice(" + BLE_scan_devices.length + ");'>Connect</a></td></tr>" );
  BLE_scan_devices.push( device );
}

function failureScan(){
  alert("Scan failed...");
}

function connectToDevice( id ) {
  BLE_device = BLE_scan_devices[id];
  $.mobile.loading( "show", {
    text: "Connecting to the device...",
    textVisible: true,
    theme: "b"
  });

  ble.connect( BLE_device.id, successConnection, failConnection );
}

function successConnection( data ) {
  BLE_peripheral_data = data;
  $.mobile.loading( "hide" );
  $.mobile.pageContainer.pagecontainer( "change", "#" + PAGE_DEVICE_CONNECTION );
}

function failConnection( data ) {
  showPopup( "Connection failed..." );
  $.mobile.pageContainer.pagecontainer( "change", "#" + PAGE_INDEX );
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

function sendColor()
{
  var charac = findFirstWriteCharac();

  if( !charac ) {
    showPopup( "No Writable UUID" );
    return;
  }
  var data = new Uint8Array(5);
  var values = stringColorToArray( $('#jscolor-send').val() );
 
  data[0] = 0x21; // '!'
  data[1] = 0x43; // 'C'
  data[2] = values[0];
  data[3] = values[1];
  data[4] = values[2];

  ble.write( BLE_peripheral_data.id, charac.service, charac.characteristic, data.buffer, function() {}, function() { showPopup("Failed to send data" ); });
}

