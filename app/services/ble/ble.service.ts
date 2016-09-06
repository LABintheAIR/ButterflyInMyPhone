import { Injectable } from '@angular/core';
import { BLEDevice } from '../../objects/ble-device/ble-device.object';

import { BLE_DEVICES } from '../../mocks/ble-devices/ble-devices.mock';

@Injectable()
export class BLEService{
  private connectedDevice : any = null;

  enableBluetooth(){
    ble.enable(
        function() {
            console.log("Bluetooth is enabled");
        },
        function() {
            console.warn("The user did *not* enable Bluetooth");
        }
    );
  }

  scanBLE(){
    this.enableBluetooth();
    return new Promise<any[]>( function(resolve, reject){
      let tmpScan = [];
      ble.scan( [], 5, function(device){
        console.log( "Device found" );
        console.log( device );
        tmpScan.push( device );
      },
      function() {
        console.warn("Device disconnected");
        reject();
      });

      setTimeout( function(){
        console.log("Promise Timeout");
        resolve( tmpScan );
      }, 5000);
    });
  }

  connectToDevice( id : string ){
    let that = this;

    return new Promise<BLEDevice>(function( resolve, reject ){
      ble.connect( id, function( peripheralObject ){
          that.connectedDevice = peripheralObject;
          resolve( peripheralObject );
        },
        function(){
          console.warn("Peripheral disconnected" );
          reject( "Connection closed" );
        }
      );
    });
  }

  disconnect(){
    return new Promise( (resolve, reject) => {
      ble.disconnect( this.connectedDevice.id, () => {
        this.connectedDevice = null;
        resolve();
      },
      (reason) => {
        reject( reason );
      });
    });
  }

  getWriteCharacteristic() {
    if( this.connectedDevice == null ){
      return false;
    }

    var tab = this.connectedDevice.characteristics;
    var patt = new RegExp(/^[a-z0-9]+0001-/i); //See https://learn.adafruit.com/adafruit-feather-32u4-bluefruit-le/uart-service
    var i;
    for( i = 0; tab.length; ++i )
    {
      if( patt.test( tab[i].service ) && tab[i].properties.indexOf( "Write" ) > -1 ) {
        return tab[i];
      }
    }

    return false;
  }

  sendColor( red : number, green : number, blue : number ){
    var characteristic = this.getWriteCharacteristic();
    var bufferData = new Uint8Array(6);
    bufferData[0] = 0x21; // '!'
    bufferData[1] = 0x43; // 'C'
    bufferData[2] = red;
    bufferData[3] = green;
    bufferData[4] = blue;
    bufferData[5] = 0x04; //EOT

    return new Promise( (resolve, reject) => {
      if( characteristic === false ){
        reject( "There is no device connected !" );
      }

      ble.write( this.connectedDevice.id, characteristic.service, characteristic.characteristic, bufferData.buffer, () => {
          resolve();
        },
        (reason) => {
          reject( reason );
        });
    });
  }

  sendPinState( pin : number, isHigh : boolean ){
      var characteristic = this.getWriteCharacteristic();
      var bufferData = new Uint8Array(5);
      bufferData[0] = 0x21; // '!'
      bufferData[1] = 0x50; // 'P'
      bufferData[2] = pin;
      bufferData[3] = isHigh ? 1 : 0;
      bufferData[4] = 0x04; //EOT

      console.log( this.connectedDevice );
      console.log( characteristic );

      return new Promise( (resolve, reject) => {
        if( characteristic === false ){
          reject( "There is no device connected !" );
        }

        ble.write( this.connectedDevice.id, characteristic.service, characteristic.characteristic, bufferData.buffer, () => {
            resolve();
          },
          (reason) => {
            reject( reason );
          });
      });
  }
}
