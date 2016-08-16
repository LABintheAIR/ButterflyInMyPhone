import { Routes, RouterModule } from '@angular/router';

import { ListDevicesComponent } from '../../components/list-devices/list-devices.component';
import { DeviceConnectionComponent } from '../../components/device-connection/device-connection.component';

const appRoutes: Routes = [
  {
    path: 'list-devices',
    component: ListDevicesComponent
  },
  {
    path: 'connection/:id',
    component: DeviceConnectionComponent
  },
  {
    path: '',
    redirectTo: '/list-devices',
    pathMatch: 'full'
  },
];

export const AppRouter = RouterModule.forRoot(appRoutes);
