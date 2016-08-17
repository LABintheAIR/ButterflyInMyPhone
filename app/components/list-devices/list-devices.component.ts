import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { BLEService } from '../../services/ble/ble.service';
import { BLEDevice } from '../../objects/ble-device/ble-device.object';

@Component({
  selector : "list-device",
  templateUrl : "app/templates/list-devices/list-devices.template.html",
  styleUrls : [`app/templates/list-devices/list-devices.template.css`],
})

export class ListDevicesComponent
{
  constructor( private router: Router,
               private route: ActivatedRoute,
               private bleService : BLEService ) {}

  private errorString : string;
  devices : BLEDevice[];

  ngOnInit(){
    this.startScan();
    this.route.params.forEach( (params: Params) => this.errorString = params['str_error'] );
  }

  startScan(){
      this.bleService.scanBLE().then( devs => this.devices = devs );
  }

  onSelectDevice( dev: BLEDevice ){
    this.router.navigate(['/device-connection', dev.id]);
  }

  closeError(){
    this.router.navigate( [ '/list-devices' ] );
  }

}
