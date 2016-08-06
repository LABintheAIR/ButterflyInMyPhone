import { Injectable } from '@angular/core';
import { BLEDevice } from '../objects/ble-device.object';

import { BLE_DEVICES } from '../mocks/ble-devices.mock';

@Injectable()
export class BLEService{
  scanBLE(){
    return Promise.resolve( BLE_DEVICES );
  }
}
