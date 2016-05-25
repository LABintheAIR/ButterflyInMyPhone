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
  $.mobile.pageContainer.pagecontainer( "change", "#" + PAGE_DEVICE_CONNECTION );
}

function failConnection( data ) {
  hideLoading();
  showPopup( "Connection failed...", 'warning' );
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

function sendColor()
{
  var values = stringColorToArray( $('#jscolor-send').val() );
 
  sendBufferData( generateDataBuffer( values[0], values[1], values[2] ) );
}

function sendAirQuality()
{

  showSimpleLoading( "Getting AirQuality" );
  $.ajax( "http://papillon-jnth.rhcloud.com/paca/iqa/marseille-urb" )
   .done( function( data ){ 
    sendBufferData( generateDataBuffer( data.list[0][0], data.list[0][1], data.list[0][2] ) ); 
   })
   .fail( function(){
    showPopup( "Fail to get AirQuality data", 'error' );
   })
   .always( function(){
    hideLoading();
  });
}






