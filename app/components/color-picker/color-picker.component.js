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
var ColorPickerComponent = (function () {
    function ColorPickerComponent() {
        this.colorPicker = "#FFFFFF";
        this.colorPickerChange = new core_1.EventEmitter();
        this.isInitDone = false;
    }
    ColorPickerComponent.prototype.onInputColorChange = function () {
        this.colorPicker = this.element.nativeElement.value;
        this.colorPickerChange.emit(this.colorPicker);
    };
    ColorPickerComponent.prototype.ngAfterContentInit = function () {
        if (!this.isInitDone) {
            var picker = new jscolor(this.element.nativeElement);
            picker.mode = "HVS";
            picker.borderColor = "#FFFFFF";
            picker.insertColor = "#FFFFFF";
            picker.backgroundColor = "#666666";
            picker.fromString(this.colorPicker);
            this.isInitDone = true;
        }
    };
    return ColorPickerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ColorPickerComponent.prototype, "colorPicker", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ColorPickerComponent.prototype, "colorPickerChange", void 0);
__decorate([
    core_1.ViewChild('myInputColor'),
    __metadata("design:type", core_1.ElementRef)
], ColorPickerComponent.prototype, "element", void 0);
ColorPickerComponent = __decorate([
    core_1.Component({
        selector: "colorPicker",
        templateUrl: "app/templates/color-picker/color-picker.template.html"
    })
], ColorPickerComponent);
exports.ColorPickerComponent = ColorPickerComponent;
//# sourceMappingURL=color-picker.component.js.map