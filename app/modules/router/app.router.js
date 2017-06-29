"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var list_devices_component_1 = require("../../components/list-devices/list-devices.component");
var device_connection_component_1 = require("../../components/device-connection/device-connection.component");
var air_quality_component_1 = require("../../components/air-quality/air-quality.component");
var share_component_1 = require("../../components/share/share.component");
var device_disconnection_component_1 = require("../../components/device-disconnection/device-disconnection.component");
var customize_component_1 = require("../../components/customize/customize.component");
var appRoutes = [
    {
        path: 'list-devices',
        component: list_devices_component_1.ListDevicesComponent
    },
    {
        path: 'list-devices/:str_error',
        component: list_devices_component_1.ListDevicesComponent
    },
    {
        path: 'device-connection/:id',
        component: device_connection_component_1.DeviceConnectionComponent
    },
    {
        path: 'air-quality',
        component: air_quality_component_1.AirQualityComponent
    },
    {
        path: 'customize',
        component: customize_component_1.CustomizeComponent
    },
    {
        path: 'share',
        component: share_component_1.ShareComponent
    },
    {
        path: 'disconnection',
        component: device_disconnection_component_1.DeviceDisconnectionComponent
    },
    {
        path: 'main.html',
        redirectTo: '/list-devices',
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: '/list-devices',
        pathMatch: 'full'
    }
];
exports.AppRouter = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.router.js.map