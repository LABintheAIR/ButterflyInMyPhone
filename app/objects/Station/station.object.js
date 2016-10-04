"use strict";
var Station = (function () {
    function Station() {
    }
    Station.prototype.loadToJSON = function (json) {
        this.name = json.name;
        this.region = json.region;
        this.zone = json.zone;
    };
    Station.prototype.getName = function () { return this.name; };
    Station.prototype.getRegion = function () { return this.region; };
    Station.prototype.getZone = function () { return this.zone; };
    return Station;
}());
exports.Station = Station;
//# sourceMappingURL=station.object.js.map