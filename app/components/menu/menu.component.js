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
var router_1 = require('@angular/router');
var MenuComponent = (function () {
    function MenuComponent(router) {
        this.router = router;
        this.state = 'inactive';
    }
    MenuComponent.prototype.toggleState = function () {
        this.state = (this.state === 'active' ? 'inactive' : 'active');
    };
    MenuComponent.prototype.forceInactive = function () {
        this.state = 'inactive';
    };
    MenuComponent.prototype.gotoAirQuality = function () {
        this.forceInactive();
        this.router.navigate(['/air-quality']);
    };
    MenuComponent.prototype.gotoCustomize = function () {
        this.forceInactive();
        //this.router.navigate(['/air-quality']);
    };
    MenuComponent.prototype.gotoTutorial = function () {
        this.forceInactive();
        //this.router.navigate(['/air-quality']);
    };
    MenuComponent.prototype.gotoShare = function () {
        this.forceInactive();
        this.router.navigate(['/share']);
    };
    MenuComponent.prototype.gotoDisconnect = function () {
        this.forceInactive();
        //this.router.navigate(['/air-quality']);
    };
    MenuComponent = __decorate([
        core_1.Component({
            selector: "menu",
            templateUrl: "app/templates/menu/menu.template.html",
            styleUrls: ["app/templates/menu/menu.template.css"],
            animations: [
                core_1.trigger('menuState', [
                    core_1.state('inactive', core_1.style({
                        transform: 'translateX(0)'
                    })),
                    core_1.state('active', core_1.style({
                        transform: 'translateX(304px)'
                    })),
                    core_1.transition('inactive => active', core_1.animate('100ms ease-in')),
                    core_1.transition('active => inactive', core_1.animate('100ms ease-out'))
                ])
            ],
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map