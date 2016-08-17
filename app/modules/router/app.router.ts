import { Routes, RouterModule } from '@angular/router';

import { ListDevicesComponent } from '../../components/list-devices/list-devices.component';
import { DeviceConnectionComponent } from '../../components/device-connection/device-connection.component';

const appRoutes: Routes = [
  {
    path: 'list-devices',
    component: ListDevicesComponent
  },
  {
    path: 'list-devices/:str_error',
    component: ListDevicesComponent
  },
  {
    path: 'device-connection/:id',
    component: DeviceConnectionComponent
  },
  {
    path: '',
    redirectTo: '/list-devices',
    pathMatch: 'full'
  },
];

export const AppRouter = RouterModule.forRoot(appRoutes);
