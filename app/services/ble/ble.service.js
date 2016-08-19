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
        this.connectedDevice = null;
    }
    BLEService.prototype.scanBLE = function () {
        return Promise.resolve(ble_devices_mock_1.BLE_DEVICES);
    };
    BLEService.prototype.connectToDevice = function (id) {
        var that = this;
        // TODO : Disconnect the device if exist !
        this.connectedDevice = null;
        return new Promise(function (resolve, reject) {
            that.scanBLE().then(function (devices) {
                var dev = devices.find(function (d) { return d.id === id; });
                if (dev === undefined) {
                    this.connectedDevice = null;
                    reject("No device found with the ID '" + id + "'");
                }
                else {
                    this.connectedDevice = dev;
                    resolve(dev);
                }
            });
        });
    };
    BLEService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BLEService);
    return BLEService;
}());
exports.BLEService = BLEService;
//# sourceMappingURL=ble.service.js.map