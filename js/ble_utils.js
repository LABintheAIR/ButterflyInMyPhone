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
  alert( "BEGIN" );
  BLE_storage = id;
  alert( "RUN" );
  $.mobile.pageContainer.pagecontainer( "change", "#" + PAGE-DEVICE-CONNECTION );
  alert( "END" );
}
