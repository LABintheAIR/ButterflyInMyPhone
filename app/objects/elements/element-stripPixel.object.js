"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var element_pixel_object_1 = require("./element-pixel.object");
var ElementStripPixel = (function () {
    function ElementStripPixel() {
        this.colorStart = [255, 255, 255];
        this.colorEnd = [255, 255, 255];
        this.colorDelta = [0, 0, 0];
        this.nbPixelOn = 0;
    }
    ElementStripPixel.prototype.sendData = function (bleService) {
        console.log(this.pixels);
        return this.sendPixelsData(0, bleService);
    };
    ElementStripPixel.prototype.loadToJson = function (json) {
        this.name = json.name;
        this.description = json.description;
        this.pixels = [];
        var i;
        for (i = 0; i < json.number_pin; i++) {
            this.pixels.push(new element_pixel_object_1.ElementPixel());
        }
    };
    ElementStripPixel.prototype.setStartColor = function (str) {
        str = str.replace('#', '');
        this.colorStart[0] = parseInt("0x" + str[0] + str[1]);
        this.colorStart[1] = parseInt("0x" + str[2] + str[3]);
        this.colorStart[2] = parseInt("0x" + str[4] + str[5]);
        this.generateColorDelta();
        this.updatePixelElementColor();
    };
    ElementStripPixel.prototype.setEndColor = function (str) {
        str = str.replace('#', '');
        this.colorEnd[0] = parseInt("0x" + str[0] + str[1]);
        this.colorEnd[1] = parseInt("0x" + str[2] + str[3]);
        this.colorEnd[2] = parseInt("0x" + str[4] + str[5]);
        this.generateColorDelta();
        this.updatePixelElementColor();
    };
    ElementStripPixel.prototype.setNumberLightOnFormPercent = function (percent) {
        this.nbPixelOn = Math.trunc((this.pixels.length * percent) / 100);
        this.generateColorDelta();
        this.updatePixelElementColor();
    };
    ElementStripPixel.prototype.generateColorDelta = function () {
        this.colorDelta[0] = (this.colorEnd[0] - this.colorStart[0]) / (this.pixels.length - 1);
        this.colorDelta[1] = (this.colorEnd[1] - this.colorStart[1]) / (this.pixels.length - 1);
        this.colorDelta[2] = (this.colorEnd[2] - this.colorStart[2]) / (this.pixels.length - 1);
        console.log(this.colorDelta);
    };
    ElementStripPixel.prototype.updatePixelElementColor = function () {
        var i = 0;
        for (var _i = 0, _a = this.pixels; _i < _a.length; _i++) {
            var pixel = _a[_i];
            if (i < this.nbPixelOn) {
                pixel.fromRGB(this.colorStart[0] + this.colorDelta[0] * i, this.colorStart[1] + this.colorDelta[1] * i, this.colorStart[2] + this.colorDelta[2] * i);
            }
            else {
                pixel.fromRGB(0, 0, 0);
            }
            i++;
        }
    };
    ElementStripPixel.prototype.sendPixelsData = function (numPixel, bleService) {
        var _this = this;
        var pixel = this.pixels[numPixel];
        return new Promise(function (resolve, reject) {
            pixel.sendData(bleService).then(function () {
                console.log(pixel.color);
                if (numPixel + 1 < _this.pixels.length) {
                    _this.sendPixelsData(numPixel + 1, bleService).then(function () { return resolve(); }).catch(function (err) { reject(err); });
                }
                else {
                    resolve();
                }
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