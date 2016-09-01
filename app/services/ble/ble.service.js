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
        // TODO Disconnect the device if exist !
        this.connectedDevice = null;
        return new Promise(function (resolve, reject) {
            ble.connect(id, function (peripheralObject) {
                that.connectedDevice = peripheralObject;
                resolve(peripheralObject);
            }, function () {
                console.warn("Peripheral disconnected");
                reject("Connection closed");
            });
            /*
            that.scanBLE().then( function( devices ){
              let dev = devices.find(d => d.id === id);
      
              if( dev === undefined ){
                that.connectedDevice = null;
                reject( "No device found with the ID '" + id + "'" );
              }
              else{
                that.connectedDevice = dev;
                resolve(dev);
              }
            });
            */
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