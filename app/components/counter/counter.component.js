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
var CounterComponent = (function () {
    function CounterComponent() {
        this.value = 0;
        this.min = -1000000;
        this.max = 1000000;
        this.step = 1;
        this.valueChange = new core_1.EventEmitter();
    }
    CounterComponent.prototype.increment = function () {
        this.value += this.step;
        if (this.value > this.max) {
            this.value = this.max;
        }
        this.valueChange.emit(this.value);
    };
    CounterComponent.prototype.decrement = function () {
        this.value -= this.step;
        if (this.value < this.min) {
            this.value = this.min;
        }
        this.valueChange.emit(this.value);
    };
    CounterComponent.prototype.onValueChange = function (event) {
        if (event == null) {
            event = 0;
        }
        this.value = event;
        this.valueChange.emit(this.value);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CounterComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CounterComponent.prototype, "min", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CounterComponent.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CounterComponent.prototype, "step", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CounterComponent.prototype, "valueChange", void 0);
    CounterComponent = __decorate([
        core_1.Component({
            selector: "counter",
            templateUrl: "app/templates/counter/counter.template.html",
            styleUrls: ["app/templates/counter/counter.template.css"]
        }), 
        __metadata('design:paramtypes', [])
    ], CounterComponent);
    return CounterComponent;
}());
exports.CounterComponent = CounterComponent;
//# sourceMappingURL=counter.component.js.map