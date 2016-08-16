import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';

import { BLEService } from '../../services/ble/ble.service';
import { BLEDevice } from '../../objects/ble-device/ble-device.object';



export class DeviceConnectionComponent{
  private device : BLEDevice;
  constructor( private bleService : BLEService,
               private route: ActivatedRout ) {}

  ngOnInit(){
    this.route.params.forEach( (params: Params) => {
      let idDevice = ""+params['id'];

    });
  }
}
