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
var http_1 = require('@angular/http');
var QueryRegion = (function () {
    function QueryRegion() {
    }
    return QueryRegion;
}());
var QueryGPS = (function () {
    function QueryGPS() {
    }
    return QueryGPS;
}());
var ApiAirDeamonService = (function () {
    function ApiAirDeamonService(http) {
        this.http = http;
    }
    ApiAirDeamonService.prototype.init = function () {
        cordova.plugin.backgroundMode.setDefaults({
            "title": "Butterfly In My Phone running...",
            "isPublic": true
        });
        cordova.plugin.backgroundMode.enable();
        cordova.plugin.backgroundMode.onfailure = function (error) { console.error("APIAIR DEAMON : " + error); };
        this.timeoutTask(3600000);
    };
    ApiAirDeamonService.prototype.addQueryGPS = function (cb) {
        this.batchGPS.push({ "callback": cb });
    };
    ApiAirDeamonService.prototype.addQueryStation = function (region, zone, cb) {
        this.batchRegion.push({ "region": region, "zone": zone, "callback": cb });
    };
    ApiAirDeamonService.prototype.timeoutTask = function (msec) {
        var _this = this;
        this.runBatchs();
        setTimeout(function () { return _this.timeoutTask(msec); }, msec);
    };
    ApiAirDeamonService.prototype.runBatchs = function () {
        console.log("Run batchs");
        var _loop_1 = function(b) {
            this_1.sendGPSRequest()
                .then(function (obs) {
                obs.subscribe(function (res) { return b.callback(res); }, function (err) { return console.error(err); });
            })
                .catch(function (err) {
                console.error(err);
            });
        };
        var this_1 = this;
        for (var _i = 0, _a = this.batchGPS; _i < _a.length; _i++) {
            var b = _a[_i];
            _loop_1(b);
        }
        var _loop_2 = function(b) {
            this_2.sendRegionRequest(b.region, b.zone).subscribe(function (res) { return b.callback(res); }, function (err) { return console.error(err); });
        };
        var this_2 = this;
        for (var _b = 0, _c = this.batchRegion; _b < _c.length; _b++) {
            var b = _c[_b];
            _loop_2(b);
        }
    };
    ApiAirDeamonService.prototype.sendRegionRequest = function (region, zone) {
        return this.http.get("http://papillon-jnth.rhcloud/get/iqa/" + region + "/" + zone).map(function (res) { return res.json(); });
    };
    ApiAirDeamonService.prototype.sendGPSRequest = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getCurrentGPSPosition()
                .then(function (position) {
                resolve(_this.http.get("http://papillon-jnth.rhcloud.com/get/iqa/paca/" + position.coords.longitude + "," + position.coords.latitude).map(function (res) { return res.json(); }));
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ApiAirDeamonService.prototype.getCurrentGPSPosition = function () {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(function (position) { resolve(position); }, function (error) { reject("[GPS Position] " + error.code + " : " + error.message); }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: false });
        });
    };
    ApiAirDeamonService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ApiAirDeamonService);
    return ApiAirDeamonService;
}());
exports.ApiAirDeamonService = ApiAirDeamonService;
//# sourceMappingURL=ApiAirDeamon.service.js.map