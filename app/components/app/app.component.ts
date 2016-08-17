import { Component } from '@angular/core';
import { ListDevicesComponent } from '../list-devices/list-devices.component';
import { BLEService } from '../../services/ble/ble.service';

@Component({
  selector : "butterfly-app",
  template : "<router-outlet></router-outlet>",
  directives : [ListDevicesComponent],
})

export class AppComponent{
  title = "Butterfly in my Phone";
}
