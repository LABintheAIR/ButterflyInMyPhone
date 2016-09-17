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
var OnOffSwitchComponent = (function () {
    function OnOffSwitchComponent() {
        this.value = false;
        this.valueChange = new core_1.EventEmitter();
    }
    OnOffSwitchComponent.prototype.onValueChange = function (event) {
        this.value = event;
        this.valueChange.emit(this.value);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], OnOffSwitchComponent.prototype, "value", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], OnOffSwitchComponent.prototype, "valueChange", void 0);
    OnOffSwitchComponent = __decorate([
        core_1.Component({
            selector: "onoff-switch",
            templateUrl: "app/templates/onoff-switch/onoff-switch.template.html",
            styleUrls: ["app/templates/onoff-switch/onoff-switch.template.css"]
        }), 
        __metadata('design:paramtypes', [])
    ], OnOffSwitchComponent);
    return OnOffSwitchComponent;
}());
exports.OnOffSwitchComponent = OnOffSwitchComponent;
//# sourceMappingURL=onoff-switch.component.js.map