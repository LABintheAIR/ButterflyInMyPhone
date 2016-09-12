"use strict";
var element_pixel_object_1 = require("./element-pixel.object");
var ElementStripPixel = (function () {
    function ElementStripPixel() {
    }
    ElementStripPixel.prototype.sendData = function (bleService) {
        return this.sendPixelsData(0, bleService);
    };
    ElementStripPixel.prototype.loadToJson = function (json) {
        this.name = json.name;
        this.description = json.description;
        var i;
        for (i = 0; i < json.number_pin; i++) {
            this.pixels.push(new element_pixel_object_1.ElementPixel());
        }
    };
    ElementStripPixel.prototype.sendPixelsData = function (numPixel, bleService) {
        var _this = this;
        var pixel = this.pixels[numPixel];
        return new Promise(function (resolve, reject) {
            pixel.sendData(bleService).then(function () {
                if (numPixel + 1 < _this.pixels.length) {
                    _this.sendPixelsData(numPixel + 1, bleService).catch(function (err) { reject(err); });
                }
                resolve();
            })
                .catch(function (err) {
                reject("[" + numPixel + "] : " + err);
            });
        });
    };
    return ElementStripPixel;
}());
exports.ElementStripPixel = ElementStripPixel;
//# sourceMappingURL=element-stripPixel.object.js.map