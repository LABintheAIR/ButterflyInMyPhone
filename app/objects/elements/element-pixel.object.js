"use strict";
var ElementPixel = (function () {
    function ElementPixel() {
    }
    ElementPixel.prototype.sendData = function (bleService) {
        return bleService.sendColor(this.color[0], this.color[1], this.color[2]);
    };
    return ElementPixel;
}());
exports.ElementPixel = ElementPixel;
//# sourceMappingURL=element-pixel.object.js.map