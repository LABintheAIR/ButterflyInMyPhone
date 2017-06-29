"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    ElementPixel.prototype.fromString = function (str) {
        str = str.replace('#', '');
        this.color[0] = parseInt("0x" + str[0] + str[1]);
        this.color[1] = parseInt("0x" + str[2] + str[3]);
        this.color[2] = parseInt("0x" + str[4] + str[5]);
    };
    ElementPixel.prototype.fromRGB = function (r, g, b) {
        this.color[0] = r;
        this.color[1] = g;
        this.color[2] = b;
    };
    return ElementPixel;
}());
exports.ElementPixel = ElementPixel;
//# sourceMappingURL=element-pixel.object.js.map