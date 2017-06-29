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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var wearable_manager_service_1 = require("../../services/wearable-manager/wearable-manager.service");
var ApiAirDeamon_service_1 = require("../../services/ApiAirDeamon/ApiAirDeamon.service");
var station_manager_service_1 = require("../../services/station-manager/station-manager.service");
var AppComponent = (function () {
    function AppComponent(wearableManager, apiAirDeamon, stationManager) {
        this.wearableManager = wearableManager;
        this.apiAirDeamon = apiAirDeamon;
        this.stationManager = stationManager;
        this.title = "Butterfly in my Phone";
    }
    AppComponent.prototype.ngOnInit = function () {
        this.apiAirDeamon.init();
        this.wearableManager.loadWearables()
            .then(function () { return console.log("Wearable loaded"); })
            .catch(function (e) { return console.error("[Wearable] : " + e); });
        this.stationManager.loadStations()
            .then(function () { return console.log("Stations loaded"); })
            .catch(function (e) { return console.error("[Stations] : " + e); });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: "butterfly-app",
        template: "<router-outlet></router-outlet>"
    }),
    __metadata("design:paramtypes", [wearable_manager_service_1.WearableManager,
        ApiAirDeamon_service_1.ApiAirDeamonService,
        station_manager_service_1.StationManagerService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map