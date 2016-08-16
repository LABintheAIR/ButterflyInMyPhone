"use strict";
var DeviceConnectionComponent = (function () {
    function DeviceConnectionComponent(bleService, route) {
        this.bleService = bleService;
        this.route = route;
    }
    DeviceConnectionComponent.prototype.ngOnInit = function () {
        this.route.params.forEach(function (params) {
            var idDevice = "" + params['id'];
        });
    };
    return DeviceConnectionComponent;
}());
exports.DeviceConnectionComponent = DeviceConnectionComponent;
//# sourceMappingURL=device-connection.component.js.map