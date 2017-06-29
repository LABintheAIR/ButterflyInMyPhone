import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { BLEService } from '../../services/ble/ble.service';
import { BLEDevice } from '../../objects/ble-device/ble-device.object';

@Component({
  selector : "device-connection",
  templateUrl : "app/templates/device-connection/device-connection.template.html",
  styleUrls : [`app/templates/device-connection/device-connection.template.css`],
})

export class DeviceConnectionComponent{
  private device : BLEDevice;
  constructor( private router : Router,
               private bleService : BLEService,
               private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.params.forEach( (params: Params) => {
      let idDevice = params['id'];
      this.bleService.connectToDevice( idDevice )
            .then( () => this.router.navigate(['/customize']))
            .catch( str => this.router.navigate(['/list-devices', str]) );
    });
  }
}
