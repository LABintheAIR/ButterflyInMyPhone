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
var wearable_manager_service_1 = require("../../services/wearable-manager/wearable-manager.service");
var element_sequin_object_1 = require("../../objects/elements/element-sequin.object");
var element_pixel_object_1 = require("../../objects/elements/element-pixel.object");
var element_stripPixel_object_1 = require("../../objects/elements/element-stripPixel.object");
var ble_service_1 = require("../../services/ble/ble.service");
var CustomizeComponent = (function () {
    function CustomizeComponent(wearableManager, bleService) {
        this.wearableManager = wearableManager;
        this.bleService = bleService;
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
        // TODO Make for inputs
        var outputs = this.wearableManager.getSelectWearable().outputs;
        for (var index in this.wearableManager.getSelectWearable().outputs) {
            if (outputs[index] instanceof element_sequin_object_1.ElementSequin) {
                this.elementsOutputBlock.push("onoff");
            }
            else if (outputs[index] instanceof element_pixel_object_1.ElementPixel) {
                this.elementsOutputBlock.push("color");
            }
            else if (outputs[index] instanceof element_stripPixel_object_1.ElementStripPixel) {
                this.elementsOutputBlock.push("strip");
            }
            else {
                console.error("Unknown instance type of element");
            }
        }
    };
    CustomizeComponent.prototype.updateSequinState = function (index, event) {
        var sequin = this.wearableManager.getSelectWearable().outputs[index];
        sequin.setState(event);
        sequin.sendData(this.bleService)
            .then(function () { })
            .catch(function (e) { console.error(e); });
    };
    CustomizeComponent.prototype.updatePixelElement = function (index, event) {
        var pixel = this.wearableManager.getSelectWearable().outputs[index];
        pixel.fromString(event);
        this.wearableManager.getSelectWearable().sendData(this.bleService)
            .then(function () { })
            .catch(function (e) { return console.error(e); });
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
    CustomizeComponent = __decorate([
        core_1.Component({
            selector: "customize",
            templateUrl: "app/templates/customize/customize.template.html",
        }), 
        __metadata('design:paramtypes', [wearable_manager_service_1.WearableManager, ble_service_1.BLEService])
    ], CustomizeComponent);
    return CustomizeComponent;
}());
exports.CustomizeComponent = CustomizeComponent;
//# sourceMappingURL=customize.component.js.map