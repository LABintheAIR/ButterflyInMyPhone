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
var wearable_object_1 = require("../../objects/wearable/wearable.object");
var WearableManager = (function () {
    function WearableManager() {
        this.DIR_BASE = cordova.file.applicationStorageDirectory + "/files/phonegapdevapp/www/app/ressources/wearables/";
    }
    WearableManager.prototype.loadWearables = function () {
        var _this = this;
        this.currentWearable = null;
        this.wearables = [];
        return new Promise(function (resolve, reject) {
            window.resolveLocalFileSystemURL(_this.DIR_BASE, function (dirEntry) {
                dirEntry.createReader().readEntries(function (entries) {
                    _this.convertDirectoryEntriesToWearables(entries);
                    resolve();
                }, function (e) { reject(_this.errorFile(e)); });
            }, function (e) { reject(_this.errorFile(e)); });
        });
    };
    WearableManager.prototype.convertDirectoryEntriesToWearables = function (entries) {
        var _this = this;
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var entry = entries_1[_i];
            if (entry.isDirectory) {
                continue;
            }
            console.log("Load Wearable : " + entry.name);
            this.readFile(this.DIR_BASE + entry.name)
                .then(function (obj) {
                var w = new wearable_object_1.Wearable();
                w.loadToJson(obj);
                _this.wearables.push(w);
                _this.wearables = _this.wearables.sort(_this.alphabetical);
            })
                .catch(function (e) { return console.error(e); });
        }
    };
    WearableManager.prototype.readFile = function (pathFile) {
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
    WearableManager.prototype.alphabetical = function (a, b) {
        var A = a.name.toLowerCase();
        var B = b.name.toLowerCase();
        if (A < B) {
            return -1;
        }
        else if (A > B) {
            return 1;
        }
        else {
            return 0;
        }
    };
    WearableManager.prototype.getAvailableWearables = function () {
        return this.wearables.slice(0, this.wearables.length);
    };
    WearableManager.prototype.selectWearable = function (id) {
        if (id < 0 || id >= this.wearables.length) {
            return false;
        }
        this.currentWearable = this.wearables[id];
        console.log("Selected Wearable : " + this.currentWearable.name);
        return true;
    };
    WearableManager.prototype.getSelectWearable = function () {
        if (this.currentWearable === undefined) {
            return null;
        }
        return this.currentWearable;
    };
    WearableManager.prototype.errorFile = function (e) {
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
    WearableManager = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], WearableManager);
    return WearableManager;
}());
exports.WearableManager = WearableManager;
//# sourceMappingURL=wearable-manager.service.js.map