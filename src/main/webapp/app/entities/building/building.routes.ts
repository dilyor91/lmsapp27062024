import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import BuildingResolve from './route/building-routing-resolve.service';

const buildingRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/building.component').then(m => m.BuildingComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/building-detail.component').then(m => m.BuildingDetailComponent),
    resolve: {
      building: BuildingResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/building-update.component').then(m => m.BuildingUpdateComponent),
    resolve: {
      building: BuildingResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/building-update.component').then(m => m.BuildingUpdateComponent),
    resolve: {
      building: BuildingResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default buildingRoute;
