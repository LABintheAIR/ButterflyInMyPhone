import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppRouter } from "../router/app.router";

import { AppComponent }  from '../../components/app/app.component';
import { ListDevicesComponent } from '../../components/list-devices/list-devices.component';
import { DeviceConnectionComponent } from '../../components/device-connection/device-connection.component';
import { AirQualityComponent } from '../../components/air-quality/air-quality.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { ShareComponent } from '../../components/share/share.component';

import { BLEService } from '../../services/ble/ble.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRouter
  ],
  declarations: [
    AppComponent,
    ListDevicesComponent,
    DeviceConnectionComponent,
    AirQualityComponent,
    MenuComponent,
    ShareComponent,
  ],
  providers : [ BLEService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
