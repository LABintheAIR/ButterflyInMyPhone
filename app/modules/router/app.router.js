"use strict";
var router_1 = require('@angular/router');
var list_devices_component_1 = require('../../components/list-devices/list-devices.component');
var device_connection_component_1 = require('../../components/device-connection/device-connection.component');
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
        path: '',
        redirectTo: '/list-devices',
        pathMatch: 'full'
    },
];
exports.AppRouter = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.router.js.map