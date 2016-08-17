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
var ble_devices_mock_1 = require('../../mocks/ble-devices/ble-devices.mock');
var BLEService = (function () {
    function BLEService() {
    }
    BLEService.prototype.scanBLE = function () {
        return Promise.resolve(ble_devices_mock_1.BLE_DEVICES);
    };
    BLEService.prototype.connectToDevice = function (id) {
        var _this = this;
        return new Promise(function (resolve) {
            return setTimeout(function () { return resolve(_this.scanBLE()
                .then(function (devices) { return devices.find(function (dev) { return dev.id === id; }); })); }, 2000);
        } // 2 seconds
         // 2 seconds
        );
    };
    BLEService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BLEService);
    return BLEService;
}());
exports.BLEService = BLEService;
//# sourceMappingURL=ble.service.js.map