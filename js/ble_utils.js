var BLE_device = "";
var BLE_scan_devices = [];
var BLE_peripheral_data = {};
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

  ble.connect( BLE_device->id, succesConnection, failConnection );
  
  
}

function succesConnection( data ) {
  $.mobile.loading( "hide" );
  $.mobile.pageContainer.pagecontainer( "change", "#" + PAGE_DEVICE_CONNECTION );
}

function failConnection( data ) {
  window.plugins.taost.showShortBottom( "Connection failed..." );
  $.mobile.pageContainer.pagecontainer( "change", "#" + PAGE_INDEX );
}
