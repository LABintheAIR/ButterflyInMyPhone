"use strict";
var ElementSequin = (function () {
    function ElementSequin() {
    }
    ElementSequin.prototype.sendData = function (bleService) {
        return bleService.sendPinState(this.pin, this.state);
    };
    return ElementSequin;
}());
exports.ElementSequin = ElementSequin;
//# sourceMappingURL=element-sequin.object.js.map