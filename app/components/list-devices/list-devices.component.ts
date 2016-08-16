import { Component, OnInit } from "@angular/core";

import { BLEService } from '../../services/ble/ble.service';
import { BLEDevice } from '../../objects/ble-device/ble-device.object';

@Component({
  selector : "list-device",
  templateUrl : "app/templates/list-devices/list-devices.template.html",
  styleUrls : [`app/templates/list-devices/list-devices.template.css`],
})

export class ListDevicesComponent
{
  constructor( private bleService : BLEService ) {}
  devices : BLEDevice[];

  ngOnInit(){
    this.startScan();
  }

  startScan(){
      this.bleService.scanBLE().then( devs => this.devices = devs );
  }

}