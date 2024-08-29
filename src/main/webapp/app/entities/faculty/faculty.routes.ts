import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import FacultyResolve from './route/faculty-routing-resolve.service';

const facultyRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/faculty.component').then(m => m.FacultyComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/faculty-detail.component').then(m => m.FacultyDetailComponent),
    resolve: {
      faculty: FacultyResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/faculty-update.component').then(m => m.FacultyUpdateComponent),
    resolve: {
      faculty: FacultyResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/faculty-update.component').then(m => m.FacultyUpdateComponent),
    resolve: {
      faculty: FacultyResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default facultyRoute;
