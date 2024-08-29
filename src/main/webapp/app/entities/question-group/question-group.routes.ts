import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import QuestionGroupResolve from './route/question-group-routing-resolve.service';

const questionGroupRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/question-group.component').then(m => m.QuestionGroupComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/question-group-detail.component').then(m => m.QuestionGroupDetailComponent),
    resolve: {
      questionGroup: QuestionGroupResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/question-group-update.component').then(m => m.QuestionGroupUpdateComponent),
    resolve: {
      questionGroup: QuestionGroupResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/question-group-update.component').then(m => m.QuestionGroupUpdateComponent),
    resolve: {
      questionGroup: QuestionGroupResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default questionGroupRoute;
