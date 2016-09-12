"use strict";
var ElementPixel = (function () {
    function ElementPixel() {
        this.name = "";
        this.description = "";
        this.color = [0, 0, 0];
    }
    ElementPixel.prototype.sendData = function (bleService) {
        return bleService.sendColor(this.color[0], this.color[1], this.color[2]);
    };
    ElementPixel.prototype.loadToJson = function (json) {
        this.name = json.name;
        this.description = json.description;
        this.color = [0, 0, 0];
    };
    return ElementPixel;
}());
exports.ElementPixel = ElementPixel;
//# sourceMappingURL=element-pixel.object.js.map