function startScan(){
  $('#devices').text( "" );
  ble.scan( [], 5, succesScan, failureScan );
}

function succesScan( device ){
  $('#devices').html( $('#devices').html() + "<ul style='list-style: none'><li>" + device.name + "</li><li>" + device.rssi + " dBm</li><li><a href='connectAndSend(\"" + device.id + "\")'>Connect & Send</a></li></ul><br>" );
}

function failureScan(){
  alert("Scan failed...");
}
