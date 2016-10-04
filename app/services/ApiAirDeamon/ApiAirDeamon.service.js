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
        this.currentIdRegion = 0;
        this.currentIdGps = 0;
        this.batchGPS = new Map();
        this.batchRegion = new Map();
    }
    ApiAirDeamonService.prototype.init = function () {
        cordova.plugins.backgroundMode.setDefaults({
            "title": "Butterfly In My Phone running...",
            "isPublic": true,
            "text": "Keep your butterflies alive !",
            "silent": true
        });
        cordova.plugins.backgroundMode.enable();
        cordova.plugins.backgroundMode.onfailure = function (error) { console.error("APIAIR DEAMON : " + error); };
        this.timeoutTask(10000);
    };
    ApiAirDeamonService.prototype.resetQueryBatchs = function () {
        this.batchGPS.clear();
        this.batchRegion.clear();
    };
    ApiAirDeamonService.prototype.addQueryGPS = function (cb) {
        this.batchGPS.set(this.currentIdGps, { "callback": cb });
        return this.currentIdGps++;
    };
    ApiAirDeamonService.prototype.addQueryRegion = function (region, zone, cb) {
        this.batchRegion.set(this.currentIdRegion, { "region": region, "zone": zone, "callback": cb });
        return this.currentIdRegion++;
    };
    ApiAirDeamonService.prototype.removeQueryRegion = function (id) {
        return this.batchRegion.delete(id);
    };
    ApiAirDeamonService.prototype.removeQueryQPS = function (id) {
        return this.batchGPS.delete(id);
    };
    ApiAirDeamonService.prototype.timeoutTask = function (msec) {
        var _this = this;
        this.runBatchs();
        setTimeout(function () { return _this.timeoutTask(msec); }, msec);
    };
    ApiAirDeamonService.prototype.runBatchs = function () {
        console.log("Run batchs");
        var itGps = this.batchGPS.values();
        var itRegion = this.batchRegion.values();
        var _loop_1 = function(tmp) {
            this_1.sendGPSRequest()
                .then(function (obs) {
                obs.subscribe(function (res) { return tmp.value.callback(res); }, function (err) { return console.error(err); });
            })
                .catch(function (err) {
                console.error(err);
            });
        };
        var this_1 = this;
        for (var tmp = itGps.next(); !tmp.done; tmp = itGps.next()) {
            _loop_1(tmp);
        }
        var _loop_2 = function(tmp) {
            this_2.sendRegionRequest(tmp.value.region, tmp.value.zone).subscribe(function (res) { return tmp.value.callback(res); }, function (err) { return console.error(err); });
        };
        var this_2 = this;
        for (var tmp = itRegion.next(); !tmp.done; tmp = itRegion.next()) {
            _loop_2(tmp);
        }
    };
    ApiAirDeamonService.prototype.sendRegionRequest = function (region, zone) {
        //return this.http.get( "http://papillon-jnth.rhcloud/get/iqa/" + region + "/" + zone ).map( (res:Response) => res.json() );
        return this.http.get("http://papillon-jnth.rhcloud.com/get/iqa/random").map(function (res) { return res.json(); });
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