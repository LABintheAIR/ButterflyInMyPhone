import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { BLEService } from "../../services/ble/ble.service";

@Component({
  selector: "device-disconnection",
  templateUrl : "app/templates/device-disconnection/device-disconnection.template.html"
})

export class DeviceDisconnectionComponent {
  constructor( private router : Router,
               private bleService : BLEService ){}

  ngOnInit(){
    this.bleService.disconnect()
      .then( () => this.router.navigate( ["/list-devices"] ) )
      .catch( (reason) => {
        console.error( reason );
        this.router.navigate( ["/list-devices"] );
      });
  }
}
