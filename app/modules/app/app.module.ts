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
import { OverlayMessageComponent } from '../../components/overlay-message/overlay-message.component';
import { DeviceDisconnectionComponent } from "../../components/device-disconnection/device-disconnection.component";
import { CustomizeComponent } from "../../components/customize/customize.component";

import { ColorPickerComponent } from "../../components/color-picker/color-picker.component";
import { CounterComponent } from "../../components/counter/counter.component";
import { OnOffSwitchComponent } from "../../components/onoff-switch/onoff-switch.component";

import { BLEService } from '../../services/ble/ble.service';
import { WearableManager } from "../../services/wearable-manager/wearable-manager.service";


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
    OverlayMessageComponent,
    DeviceDisconnectionComponent,
    CustomizeComponent,

    ColorPickerComponent,
    CounterComponent,
    OnOffSwitchComponent
  ],
  providers : [ BLEService, WearableManager ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
