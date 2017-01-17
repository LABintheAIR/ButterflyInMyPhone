import { Routes, RouterModule } from '@angular/router';

import { ListDevicesComponent } from '../../components/list-devices/list-devices.component';
import { DeviceConnectionComponent } from '../../components/device-connection/device-connection.component';
import { AirQualityComponent } from '../../components/air-quality/air-quality.component';
import { ShareComponent } from '../../components/share/share.component';
import { DeviceDisconnectionComponent } from "../../components/device-disconnection/device-disconnection.component";
import { CustomizeComponent } from "../../components/customize/customize.component";

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
    path: 'air-quality',
    component: AirQualityComponent
  },
  {
    path: 'customize',
    component: CustomizeComponent
  },
  {
    path: 'share',
    component: ShareComponent
  },
  {
    path: 'disconnection',
    component: DeviceDisconnectionComponent
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

export const AppRouter = RouterModule.forRoot(appRoutes);
