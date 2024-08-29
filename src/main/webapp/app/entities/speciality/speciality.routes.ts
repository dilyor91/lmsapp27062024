import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import SpecialityResolve from './route/speciality-routing-resolve.service';

const specialityRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/speciality.component').then(m => m.SpecialityComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/speciality-detail.component').then(m => m.SpecialityDetailComponent),
    resolve: {
      speciality: SpecialityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/speciality-update.component').then(m => m.SpecialityUpdateComponent),
    resolve: {
      speciality: SpecialityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/speciality-update.component').then(m => m.SpecialityUpdateComponent),
    resolve: {
      speciality: SpecialityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default specialityRoute;
