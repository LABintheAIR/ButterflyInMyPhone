"use strict";
var ElementSequin = (function () {
    function ElementSequin() {
    }
    ElementSequin.prototype.sendData = function (bleService) {
        return bleService.sendPinState(this.pin, this.state);
    };
    ElementSequin.prototype.setState = function (state) {
        this.state = state;
    };
    ElementSequin.prototype.loadToJson = function (json) {
        this.name = json.name;
        this.description = json.description;
        this.pin = json.pin;
        this.state = false;
    };
    return ElementSequin;
}());
exports.ElementSequin = ElementSequin;
//# sourceMappingURL=element-sequin.object.js.map