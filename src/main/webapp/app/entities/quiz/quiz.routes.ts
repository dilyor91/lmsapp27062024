import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import QuizResolve from './route/quiz-routing-resolve.service';

const quizRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/quiz.component').then(m => m.QuizComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/quiz-detail.component').then(m => m.QuizDetailComponent),
    resolve: {
      quiz: QuizResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/quiz-update.component').then(m => m.QuizUpdateComponent),
    resolve: {
      quiz: QuizResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/quiz-update.component').then(m => m.QuizUpdateComponent),
    resolve: {
      quiz: QuizResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default quizRoute;
