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
var station_object_1 = require("../../objects/station/station.object");
var StationManagerService = (function () {
    function StationManagerService() {
        //private PATH_STATION = cordova.file.applicationStorageDirectory  + "/files/phonegapdevapp/www/app/ressources/station.json";
        this.PATH_STATION = cordova.file.applicationDirectory + "/www/app/ressources/stations.json";
    }
    StationManagerService.prototype.loadStations = function () {
        var _this = this;
        this.stations = [];
        return new Promise(function (resolve, reject) {
            _this.readFile(_this.PATH_STATION)
                .then(function (object) {
                try {
                    for (var _i = 0, _a = object.stations; _i < _a.length; _i++) {
                        var s = _a[_i];
                        var station = new station_object_1.Station();
                        station.loadToJSON(s);
                        _this.stations.push(station);
                    }
                }
                catch (e) {
                    reject("Error on Loading station file: " + e);
                }
                resolve();
            })
                .catch(function (e) { return reject(e); });
        });
    };
    StationManagerService.prototype.getStations = function () {
        return this.stations.slice(0, this.stations.length);
    };
    StationManagerService.prototype.readFile = function (pathFile) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            window.resolveLocalFileSystemURL(pathFile, function (fileEntry) {
                fileEntry.file(function (file) {
                    var reader = new FileReader();
                    reader.onloadend = function (e) {
                        try {
                            resolve(JSON.parse(reader.result));
                        }
                        catch (e) {
                            reject("Parse Error [" + file.name + "]: " + e);
                        }
                    };
                    reader.onerror = function (e) { reject("[Read fail] (" + file.name + ")" + _this.errorFile(e)); };
                    reader.readAsText(file);
                });
            }, function (e) { return reject(e); });
        });
    };
    StationManagerService.prototype.getStation = function (id) {
        if (id < 0 || id >= this.stations.length) {
            return null;
        }
        return this.stations[id];
    };
    StationManagerService.prototype.errorFile = function (e) {
        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                return 'Storage quota exceeded';
            case FileError.NOT_FOUND_ERR:
                return 'File not found';
            case FileError.SECURITY_ERR:
                return 'Security error';
            case FileError.INVALID_MODIFICATION_ERR:
                return 'Invalid modification';
            case FileError.INVALID_STATE_ERR:
                return 'Invalid state';
            default:
                return 'FileError : Unknown error (' + e.message + ')';
        }
        ;
    };
    StationManagerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], StationManagerService);
    return StationManagerService;
}());
exports.StationManagerService = StationManagerService;
//# sourceMappingURL=station-manager.service.js.map