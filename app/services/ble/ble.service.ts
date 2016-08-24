import { Injectable } from '@angular/core';
import { BLEDevice } from '../../objects/ble-device/ble-device.object';

import { BLE_DEVICES } from '../../mocks/ble-devices/ble-devices.mock';

@Injectable()
export class BLEService{
  private connectedDevice : BLEDevice = null;

  scanBLE(){
    return Promise.resolve( BLE_DEVICES );
  }

  connectToDevice( id : string ){
    let that = this;
    // TODO Disconnect the device if exist !
    this.connectedDevice = null;
    return new Promise<BLEDevice>(function( resolve, reject ){

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
    });
  }
}
