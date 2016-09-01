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

      /*
      that.scanBLE().then( function( devices ){
        let dev = devices.find(d => d.id === id);

        if( dev === undefined ){
          that.connectedDevice = null;
          reject( "No device found with the ID '" + id + "'" );
        }
        else{
          that.connectedDevice = dev;
          resolve(dev);
        }
      });
      */
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
}
