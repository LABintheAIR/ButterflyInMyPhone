"use strict";
var element_sequin_object_1 = require("../elements/element-sequin.object");
var element_pixel_object_1 = require("../elements/element-pixel.object");
var element_stripPixel_object_1 = require("../elements/element-stripPixel.object");
var Mutex = (function () {
    function Mutex() {
        this.lock = false;
    }
    Mutex.prototype.askLock = function (wait) {
        if (wait === void 0) { wait = true; }
        if (wait && this.lock) {
            while (this.lock) { }
        }
        if (!this.lock) {
            this.lock = true;
        }
    };
    Mutex.prototype.unlock = function () {
        this.lock = false;
    };
    return Mutex;
}());
var Wearable = (function () {
    function Wearable() {
        this.mutexData = new Mutex();
        this.nbSentData = 0;
    }
    Wearable.prototype.loadToJson = function (json) {
        this.name = json.name;
        this.description = json.description;
        this.inputs = [];
        this.outputs = [];
        /* TODO Parse Inputs element */
        for (var _i = 0, _a = json.outputs; _i < _a.length; _i++) {
            var output = _a[_i];
            switch (output.type) {
                case "sequin":
                    var sequin = new element_sequin_object_1.ElementSequin();
                    sequin.loadToJson(output);
                    this.outputs.push(sequin);
                    break;
                case "pixel":
                    var pixel = new element_pixel_object_1.ElementPixel();
                    pixel.loadToJson(output);
                    this.outputs.push(pixel);
                    break;
                case "strip":
                    var strip = new element_stripPixel_object_1.ElementStripPixel();
                    strip.loadToJson(output);
                    this.outputs.push(strip);
                    break;
                default:
                    console.error("[WEARABLE OBJECT] Unknown type element : " + output.type);
                    break;
            }
        }
    };
    Wearable.prototype.sendData = function (bleService) {
        return this.sendDataElement(0, bleService);
    };
    Wearable.prototype.sendDataElement = function (index, bleService) {
        var _this = this;
        var element = this.outputs[index];
        return new Promise(function (resolve, reject) {
            if (index == 0) {
                _this.mutexData.askLock();
            }
            element.sendData(bleService).then(function () {
                if (index + 1 < _this.outputs.length) {
                    _this.sendDataElement(index + 1, bleService).catch(function (err) { reject(err); });
                }
                _this.addDataSent();
                resolve();
            })
                .catch(function (err) {
                _this.addDataSent();
                reject("[" + index + "] : " + err);
            });
        });
    };
    Wearable.prototype.addDataSent = function () {
        this.nbSentData++;
        if (this.nbSentData >= this.outputs.length) {
            this.mutexData.unlock();
            this.nbSentData = 0;
        }
    };
    return Wearable;
}());
exports.Wearable = Wearable;
//# sourceMappingURL=wearable.object.js.map