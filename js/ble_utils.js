var BLE_device = "";
var BLE_scan_devices = [];

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
  $.mobile.pageContainer.pagecontainer( "change", "#" + PAGE_DEVICE_CONNECTION );
}
