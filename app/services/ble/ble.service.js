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
var BLEService = (function () {
    function BLEService() {
        this.connectedDevice = null;
    }
    BLEService.prototype.enableBluetooth = function () {
        ble.enable(function () {
            console.log("Bluetooth is enabled");
        }, function () {
            console.warn("The user did *not* enable Bluetooth");
        });
    };
    BLEService.prototype.scanBLE = function () {
        this.enableBluetooth();
        return new Promise(function (resolve, reject) {
            var tmpScan = [];
            ble.scan([], 5, function (device) {
                console.log("Device found");
                console.log(device);
                tmpScan.push(device);
            }, function () {
                console.warn("Device disconnected");
                reject();
            });
            setTimeout(function () {
                console.log("Promise Timeout");
                resolve(tmpScan);
            }, 5000);
        });
    };
    BLEService.prototype.connectToDevice = function (id) {
        var that = this;
        return new Promise(function (resolve, reject) {
            ble.connect(id, function (peripheralObject) {
                that.connectedDevice = peripheralObject;
                resolve(peripheralObject);
            }, function () {
                console.warn("Peripheral disconnected");
                reject("Connection closed");
            });
        });
    };
    BLEService.prototype.disconnect = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            ble.disconnect(_this.connectedDevice.id, function () {
                _this.connectedDevice = null;
                resolve();
            }, function (reason) {
                reject(reason);
            });
        });
    };
    BLEService.prototype.getWriteCharacteristic = function () {
        if (this.connectedDevice == null) {
            return false;
        }
        var tab = this.connectedDevice.characteristics;
        var patt = new RegExp('^[a-z0-9]+0001-', 'i'); //See https://learn.adafruit.com/adafruit-feather-32u4-bluefruit-le/uart-service
        var i;
        for (i = 0; tab.length; ++i) {
            if (patt.test(tab[i].service) && tab[i].properties.indexOf("Write") > -1) {
                return tab[i];
            }
        }
        return false;
    };
    BLEService.prototype.sendColor = function (red, green, blue) {
        var _this = this;
        var characteristic = this.getWriteCharacteristic();
        var bufferData = new Uint8Array(6);
        bufferData[0] = 0x21; // '!'
        bufferData[1] = 0x43; // 'C'
        bufferData[2] = red;
        bufferData[3] = green;
        bufferData[4] = blue;
        bufferData[5] = 0x04; //EOT
        return new Promise(function (resolve, reject) {
            if (characteristic === false) {
                reject("There is no device connected !");
            }
            ble.write(_this.connectedDevice.id, characteristic.service, characteristic.characteristic, bufferData.buffer, function () {
                resolve();
            }, function (reason) {
                reject(reason);
            });
        });
    };
    BLEService.prototype.sendPinState = function (pin, isHigh) {
        var _this = this;
        var characteristic = this.getWriteCharacteristic();
        var bufferData = new Uint8Array(5);
        bufferData[0] = 0x21; // '!'
        bufferData[1] = 0x50; // 'P'
        bufferData[2] = pin;
        bufferData[3] = isHigh ? 1 : 0;
        bufferData[4] = 0x04; //EOT
        console.log(this.connectedDevice);
        console.log(characteristic);
        return new Promise(function (resolve, reject) {
            if (characteristic === false) {
                reject("There is no device connected !");
            }
            ble.write(_this.connectedDevice.id, characteristic.service, characteristic.characteristic, bufferData.buffer, function () {
                resolve();
            }, function (reason) {
                reject(reason);
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