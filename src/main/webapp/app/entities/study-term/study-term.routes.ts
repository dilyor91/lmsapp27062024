import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import StudyTermResolve from './route/study-term-routing-resolve.service';

const studyTermRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/study-term.component').then(m => m.StudyTermComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/study-term-detail.component').then(m => m.StudyTermDetailComponent),
    resolve: {
      studyTerm: StudyTermResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/study-term-update.component').then(m => m.StudyTermUpdateComponent),
    resolve: {
      studyTerm: StudyTermResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/study-term-update.component').then(m => m.StudyTermUpdateComponent),
    resolve: {
      studyTerm: StudyTermResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default studyTermRoute;
