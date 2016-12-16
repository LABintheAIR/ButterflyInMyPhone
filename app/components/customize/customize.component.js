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
var wearable_manager_service_1 = require("../../services/wearable-manager/wearable-manager.service");
var element_sequin_object_1 = require("../../objects/elements/element-sequin.object");
var element_pixel_object_1 = require("../../objects/elements/element-pixel.object");
var element_stripPixel_object_1 = require("../../objects/elements/element-stripPixel.object");
var ble_service_1 = require("../../services/ble/ble.service");
var ApiAirDeamon_service_1 = require("../../services/ApiAirDeamon/ApiAirDeamon.service");
var station_manager_service_1 = require("../../services/station-manager/station-manager.service");
var CustomizeComponent = (function () {
    function CustomizeComponent(wearableManager, bleService, apiAirDeamon, stationManager) {
        this.wearableManager = wearableManager;
        this.bleService = bleService;
        this.apiAirDeamon = apiAirDeamon;
        this.stationManager = stationManager;
        this.ELEMENT_SEQUIN = "onoff";
        this.ELEMENT_PIXEL = "color";
        this.ELEMENT_STRIP = "strip";
        this.MODE_MANUAL = -2;
        this.MODE_GPS = -1;
        this.showLoading = false;
        this.currentSelectIndex = -1;
    }
    CustomizeComponent.prototype.ngOnInit = function () {
        this.availableWearables = this.wearableManager.getAvailableWearables();
        console.log(this.availableWearables);
    };
    CustomizeComponent.prototype.onSelectWearableChange = function (event) {
        if (event == -1) {
            return;
        }
        this.currentSelectIndex = event;
        if (!this.wearableManager.selectWearable(this.currentSelectIndex)) {
            console.error("Failed to set wearable");
        }
        this.generateForm();
    };
    CustomizeComponent.prototype.generateForm = function () {
        if (this.wearableManager.getSelectWearable() == null) {
            return;
        }
        this.elementsOutputBlock = [];
        this.idGpsQuery = new Array(this.wearableManager.getSelectWearable().outputs.length);
        this.idRegionQuery = new Array(this.wearableManager.getSelectWearable().outputs.length);
        /* TODO Make for inputs */
        var outputs = this.wearableManager.getSelectWearable().outputs;
        for (var index in this.wearableManager.getSelectWearable().outputs) {
            if (outputs[index] instanceof element_sequin_object_1.ElementSequin) {
                this.elementsOutputBlock.push(this.ELEMENT_SEQUIN);
            }
            else if (outputs[index] instanceof element_pixel_object_1.ElementPixel) {
                this.elementsOutputBlock.push(this.ELEMENT_PIXEL);
            }
            else if (outputs[index] instanceof element_stripPixel_object_1.ElementStripPixel) {
                this.elementsOutputBlock.push(this.ELEMENT_STRIP);
            }
            else {
                console.error("Unknown instance type of element");
            }
        }
    };
    CustomizeComponent.prototype.updateMode = function (index, mode) {
        var _this = this;
        mode = parseInt(mode);
        this.safeRemoveQuery(index);
        switch (mode) {
            case this.MODE_MANUAL:
                this.idGpsQuery[index] = undefined;
                this.idRegionQuery[index] = undefined;
                break;
            case this.MODE_GPS:
                this.idGpsQuery[index] = this.apiAirDeamon.addQueryGPS(function (data) { });
                this.idRegionQuery[index] = undefined;
                break;
            default:
                this.idGpsQuery[index] = undefined;
                this.idRegionQuery[index] = this.apiAirDeamon.addQueryRegion(this.stationManager.getStation(index).getRegion(), this.stationManager.getStation(index).getZone(), function (data) {
                    _this.applyDataToOuput(index, data);
                    _this.wearableManager.getSelectWearable().sendData(_this.bleService);
                });
                break;
        }
        if (this.isFillOfUndefined(this.idGpsQuery)) {
            this.apiAirDeamon.setTimeoutTaskValue(900000); /* 900 000 = 15 minutes */
        }
        else {
            this.apiAirDeamon.setTimeoutTaskValue(60000); /* 60 000 = 1 minute */
        }
    };
    CustomizeComponent.prototype.isFillOfUndefined = function (tab) {
        for (var _i = 0, tab_1 = tab; _i < tab_1.length; _i++) {
            var e = tab_1[_i];
            if (e !== undefined) {
                return false;
            }
        }
        return true;
    };
    CustomizeComponent.prototype.applyDataToOuput = function (index, data) {
        console.log(this.elementsOutputBlock[index]);
        if (this.elementsOutputBlock[index] == this.ELEMENT_SEQUIN) {
            if (data.iqa[0] >= 50) {
                this.wearableManager.getSelectWearable().outputs[index].setState(true);
            }
            else {
                this.wearableManager.getSelectWearable().outputs[index].setState(false);
            }
        }
        else if (this.elementsOutputBlock[index] == this.ELEMENT_PIXEL) {
            console.log(data);
            this.wearableManager.getSelectWearable().outputs[index].fromRGB(data.color[0], data.color[1], data.color[2]);
        }
        else if (this.elementsOutputBlock[index] == this.ELEMENT_STRIP) {
            this.wearableManager.getSelectWearable().outputs[index].setNumberLightOnFormPercent(data.iqa[0]);
        }
        else {
            console.error("[ApplyData] : Unknown index : " + index);
        }
    };
    CustomizeComponent.prototype.safeRemoveQuery = function (index) {
        if (this.idGpsQuery[index] !== undefined) {
            this.apiAirDeamon.removeQueryQPS(index);
        }
        else if (this.idRegionQuery[index] !== undefined) {
            this.apiAirDeamon.removeQueryRegion(index);
        }
    };
    CustomizeComponent.prototype.updateSequinState = function (index, event) {
        var _this = this;
        var sequin = this.wearableManager.getSelectWearable().outputs[index];
        sequin.setState(event);
        this.showLoading = true;
        sequin.sendData(this.bleService)
            .then(function () { _this.showLoading = false; })
            .catch(function (e) { console.error(e); _this.showLoading = false; });
    };
    CustomizeComponent.prototype.updatePixelElement = function (index, event) {
        var _this = this;
        var pixel = this.wearableManager.getSelectWearable().outputs[index];
        pixel.fromString(event);
        this.showLoading = true;
        this.wearableManager.getSelectWearable().sendData(this.bleService)
            .then(function () { _this.showLoading = false; })
            .catch(function (e) { console.error(e); _this.showLoading = false; });
    };
    CustomizeComponent.prototype.updateStartColorStrip = function (index, event) {
        var strip = this.wearableManager.getSelectWearable().outputs[index];
        strip.setStartColor(event);
        this.sendStripData(index);
    };
    CustomizeComponent.prototype.updateEndColorStrip = function (index, event) {
        var strip = this.wearableManager.getSelectWearable().outputs[index];
        strip.setEndColor(event);
        this.sendStripData(index);
    };
    CustomizeComponent.prototype.updatePercenteColorStrip = function (index, event) {
        var strip = this.wearableManager.getSelectWearable().outputs[index];
        strip.setNumberLightOnFormPercent(parseInt(event));
        this.sendStripData(index);
    };
    CustomizeComponent.prototype.sendStripData = function (index) {
        var _this = this;
        var strip = this.wearableManager.getSelectWearable().outputs[index];
        this.showLoading = true;
        strip.sendData(this.bleService)
            .then(function () { _this.showLoading = false; })
            .catch(function (e) { console.error(e); _this.showLoading = false; });
    };
    return CustomizeComponent;
}());
CustomizeComponent = __decorate([
    core_1.Component({
        selector: "customize",
        templateUrl: "app/templates/customize/customize.template.html",
        styleUrls: ["app/templates/customize/customize.template.css"]
    }),
    __metadata("design:paramtypes", [wearable_manager_service_1.WearableManager,
        ble_service_1.BLEService,
        ApiAirDeamon_service_1.ApiAirDeamonService,
        station_manager_service_1.StationManagerService])
], CustomizeComponent);
exports.CustomizeComponent = CustomizeComponent;
//# sourceMappingURL=customize.component.js.map