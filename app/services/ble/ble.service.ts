import { Injectable } from '@angular/core';
import { BLEDevice } from '../../objects/ble-device/ble-device.object';

import { BLE_DEVICES } from '../../mocks/ble-devices/ble-devices.mock';

@Injectable()
export class BLEService{
  scanBLE(){
    return Promise.resolve( BLE_DEVICES );
  }

  connectToDevice( id : string ){
    return new Promise<BLEDevice>(resolve =>
      setTimeout(() => resolve(this.scanBLE()
                 .then(devices => devices.find(dev => dev.id === id))), 2000) // 2 seconds
    );
  }
}
