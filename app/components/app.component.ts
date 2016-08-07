import { Component } from '@angular/core';
import { ListDevicesComponent } from './list-devices.component';
import { BLEService } from '../services/ble.service';

@Component({
  selector : "butterfly-app",
  template : "<list-device></list-device>",
  directives : [ListDevicesComponent],
  providers : [BLEService]
})

export class AppComponent{
  title = "Butterfly in my Phone";
}
