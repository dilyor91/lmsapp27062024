import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import TimeTableResolve from './route/time-table-routing-resolve.service';

const timeTableRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/time-table.component').then(m => m.TimeTableComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/time-table-detail.component').then(m => m.TimeTableDetailComponent),
    resolve: {
      timeTable: TimeTableResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/time-table-update.component').then(m => m.TimeTableUpdateComponent),
    resolve: {
      timeTable: TimeTableResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/time-table-update.component').then(m => m.TimeTableUpdateComponent),
    resolve: {
      timeTable: TimeTableResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default timeTableRoute;
