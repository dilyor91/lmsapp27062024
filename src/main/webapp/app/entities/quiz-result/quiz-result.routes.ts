import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import QuizResultResolve from './route/quiz-result-routing-resolve.service';

const quizResultRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/quiz-result.component').then(m => m.QuizResultComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/quiz-result-detail.component').then(m => m.QuizResultDetailComponent),
    resolve: {
      quizResult: QuizResultResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/quiz-result-update.component').then(m => m.QuizResultUpdateComponent),
    resolve: {
      quizResult: QuizResultResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/quiz-result-update.component').then(m => m.QuizResultUpdateComponent),
    resolve: {
      quizResult: QuizResultResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default quizResultRoute;
