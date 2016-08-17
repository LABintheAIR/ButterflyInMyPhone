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
var core_1 = require("@angular/core");
var router_1 = require('@angular/router');
var ble_service_1 = require('../../services/ble/ble.service');
var ListDevicesComponent = (function () {
    function ListDevicesComponent(router, bleService) {
        this.router = router;
        this.bleService = bleService;
    }
    ListDevicesComponent.prototype.ngOnInit = function () {
        this.startScan();
    };
    ListDevicesComponent.prototype.startScan = function () {
        var _this = this;
        this.bleService.scanBLE().then(function (devs) { return _this.devices = devs; });
    };
    ListDevicesComponent.prototype.onSelectDevice = function (dev) {
        this.router.navigate(['/device-connection', dev.id]);
    };
    ListDevicesComponent = __decorate([
        core_1.Component({
            selector: "list-device",
            templateUrl: "app/templates/list-devices/list-devices.template.html",
            styleUrls: ["app/templates/list-devices/list-devices.template.css"],
        }), 
        __metadata('design:paramtypes', [router_1.Router, ble_service_1.BLEService])
    ], ListDevicesComponent);
    return ListDevicesComponent;
}());
exports.ListDevicesComponent = ListDevicesComponent;
//# sourceMappingURL=list-devices.component.js.map