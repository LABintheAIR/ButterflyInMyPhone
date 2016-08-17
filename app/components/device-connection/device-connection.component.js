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
var router_1 = require('@angular/router');
var ble_service_1 = require('../../services/ble/ble.service');
var DeviceConnectionComponent = (function () {
    function DeviceConnectionComponent(router, bleService, route) {
        this.router = router;
        this.bleService = bleService;
        this.route = route;
    }
    DeviceConnectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var idDevice = params['id'];
            _this.bleService.connectToDevice(idDevice)
                .then(function (dev) { return _this.device = dev; })
                .catch(function (str) { return _this.router.navigate(['/list-devices', str]); });
        });
    };
    DeviceConnectionComponent = __decorate([
        core_1.Component({
            selector: "device-connection",
            templateUrl: "app/templates/device-connection/device-connection.template.html",
            styleUrls: ["app/templates/device-connection/device-connection.template.css"],
        }), 
        __metadata('design:paramtypes', [router_1.Router, ble_service_1.BLEService, router_1.ActivatedRoute])
    ], DeviceConnectionComponent);
    return DeviceConnectionComponent;
}());
exports.DeviceConnectionComponent = DeviceConnectionComponent;
//# sourceMappingURL=device-connection.component.js.map