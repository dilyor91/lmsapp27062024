import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import ExamResultResolve from './route/exam-result-routing-resolve.service';

const examResultRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/exam-result.component').then(m => m.ExamResultComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/exam-result-detail.component').then(m => m.ExamResultDetailComponent),
    resolve: {
      examResult: ExamResultResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/exam-result-update.component').then(m => m.ExamResultUpdateComponent),
    resolve: {
      examResult: ExamResultResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/exam-result-update.component').then(m => m.ExamResultUpdateComponent),
    resolve: {
      examResult: ExamResultResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default examResultRoute;
