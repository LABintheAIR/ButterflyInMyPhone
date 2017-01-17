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
var OverlayMessageComponent = (function () {
    function OverlayMessageComponent() {
        /*@Input() message : string;*/
        this.loading = false;
    }
    OverlayMessageComponent.prototype.ngOnInit = function () {
        console.log("Inner Width : " + window.screen.width + "px");
        console.log("Width : " + this.el.nativeElement.style.width + "px");
        this.el.nativeElement.style.width = window.screen.width;
        console.log("Width : " + this.el.nativeElement.style.width + "px");
    };
    return OverlayMessageComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], OverlayMessageComponent.prototype, "loading", void 0);
__decorate([
    core_1.ViewChild("overlay"),
    __metadata("design:type", core_1.ElementRef)
], OverlayMessageComponent.prototype, "el", void 0);
OverlayMessageComponent = __decorate([
    core_1.Component({
        selector: "overlay-message",
        templateUrl: "app/templates/overlay-message/overlay-message.template.html",
        styleUrls: ["app/templates/overlay-message/overlay-message.template.css"]
    })
], OverlayMessageComponent);
exports.OverlayMessageComponent = OverlayMessageComponent;
//# sourceMappingURL=overlay-message.component.js.map