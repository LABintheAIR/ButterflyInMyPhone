"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var app_router_1 = require("../router/app.router");
var app_component_1 = require('../../components/app/app.component');
var list_devices_component_1 = require('../../components/list-devices/list-devices.component');
var device_connection_component_1 = require('../../components/device-connection/device-connection.component');
var air_quality_component_1 = require('../../components/air-quality/air-quality.component');
var menu_component_1 = require('../../components/menu/menu.component');
var share_component_1 = require('../../components/share/share.component');
var overlay_message_component_1 = require('../../components/overlay-message/overlay-message.component');
var device_disconnection_component_1 = require("../../components/device-disconnection/device-disconnection.component");
var customize_component_1 = require("../../components/customize/customize.component");
var color_picker_component_1 = require("../../components/color-picker/color-picker.component");
var counter_component_1 = require("../../components/counter/counter.component");
var onoff_switch_component_1 = require("../../components/onoff-switch/onoff-switch.component");
var ble_service_1 = require('../../services/ble/ble.service');
var wearable_manager_service_1 = require("../../services/wearable-manager/wearable-manager.service");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_router_1.AppRouter
            ],
            declarations: [
                app_component_1.AppComponent,
                list_devices_component_1.ListDevicesComponent,
                device_connection_component_1.DeviceConnectionComponent,
                air_quality_component_1.AirQualityComponent,
                menu_component_1.MenuComponent,
                share_component_1.ShareComponent,
                overlay_message_component_1.OverlayMessageComponent,
                device_disconnection_component_1.DeviceDisconnectionComponent,
                customize_component_1.CustomizeComponent,
                color_picker_component_1.ColorPickerComponent,
                counter_component_1.CounterComponent,
                onoff_switch_component_1.OnOffSwitchComponent
            ],
            providers: [ble_service_1.BLEService, wearable_manager_service_1.WearableManager],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map