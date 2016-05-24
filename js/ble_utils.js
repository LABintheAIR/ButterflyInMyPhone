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
  for( i = 0; tab.length; ++i )
  {
    if( tab[i].properties.indexOf( "Write" ) > -1 ) {
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

  data[0] = 0x21; // '!'
  data[1] = 0x43; // 'C'
  data[0] = 0xFF;
  data[0] = 0x00;
  data[0] = 0x00;

  ble.write( BLE_peripheral_data.id, charac.service, charac.characteristic, data.buffer, function() { alert( "Data sent" ); }, function() { alert("Failed to send data" ); });
}

