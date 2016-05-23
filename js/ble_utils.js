var BLE_storage = "";

function startScan(){
  $('#devices').text( "" );
  ble.scan( [], 5, succesScan, failureScan );
}

function succesScan( device ){
  $('#devices').append( "<tr><td>" + device.name + "</td><td>" + device.rssi + " dBm</td><td><a href='javascript:connectToDevice(\"" + device.id + "\");'>Connect</a></td></tr>" );
}

function failureScan(){
  alert("Scan failed...");
}

function connectToDevice( id ) {
  BLE_storage = id;
  window.location.href="#device-connect";
}
