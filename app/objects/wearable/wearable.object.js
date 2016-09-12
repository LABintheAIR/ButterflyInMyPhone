"use strict";
var element_sequin_object_1 = require("../elements/element-sequin.object");
var element_pixel_object_1 = require("../elements/element-pixel.object");
var element_stripPixel_object_1 = require("../elements/element-stripPixel.object");
var Wearable = (function () {
    function Wearable() {
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
                case "pixel_strip":
                    var strip = new element_stripPixel_object_1.ElementStripPixel();
                    strip.loadToJson(output);
                    this.outputs.push(strip);
                    break;
                default:
                    console.error("Unknown type element : " + output.type);
                    break;
            }
        }
    };
    return Wearable;
}());
exports.Wearable = Wearable;
//# sourceMappingURL=wearable.object.js.map