import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import EnrollmentResolve from './route/enrollment-routing-resolve.service';

const enrollmentRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/enrollment.component').then(m => m.EnrollmentComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/enrollment-detail.component').then(m => m.EnrollmentDetailComponent),
    resolve: {
      enrollment: EnrollmentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/enrollment-update.component').then(m => m.EnrollmentUpdateComponent),
    resolve: {
      enrollment: EnrollmentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/enrollment-update.component').then(m => m.EnrollmentUpdateComponent),
    resolve: {
      enrollment: EnrollmentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default enrollmentRoute;
