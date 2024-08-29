import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import StudentOptionResolve from './route/student-option-routing-resolve.service';

const studentOptionRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/student-option.component').then(m => m.StudentOptionComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/student-option-detail.component').then(m => m.StudentOptionDetailComponent),
    resolve: {
      studentOption: StudentOptionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/student-option-update.component').then(m => m.StudentOptionUpdateComponent),
    resolve: {
      studentOption: StudentOptionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/student-option-update.component').then(m => m.StudentOptionUpdateComponent),
    resolve: {
      studentOption: StudentOptionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default studentOptionRoute;
