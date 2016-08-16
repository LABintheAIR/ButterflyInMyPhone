import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppRouter } from "../router/app.router";

import { AppComponent }  from '../../components/app/app.component';

import { BLEService } from '../../services/ble/ble.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRouter
  ],
  declarations: [ AppComponent ],
  providers : [ BLEService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
