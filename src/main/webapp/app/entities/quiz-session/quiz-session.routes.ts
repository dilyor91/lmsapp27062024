import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import QuizSessionResolve from './route/quiz-session-routing-resolve.service';

const quizSessionRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/quiz-session.component').then(m => m.QuizSessionComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/quiz-session-detail.component').then(m => m.QuizSessionDetailComponent),
    resolve: {
      quizSession: QuizSessionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/quiz-session-update.component').then(m => m.QuizSessionUpdateComponent),
    resolve: {
      quizSession: QuizSessionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/quiz-session-update.component').then(m => m.QuizSessionUpdateComponent),
    resolve: {
      quizSession: QuizSessionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default quizSessionRoute;
