import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import QuizQuestionGroupResolve from './route/quiz-question-group-routing-resolve.service';

const quizQuestionGroupRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/quiz-question-group.component').then(m => m.QuizQuestionGroupComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/quiz-question-group-detail.component').then(m => m.QuizQuestionGroupDetailComponent),
    resolve: {
      quizQuestionGroup: QuizQuestionGroupResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/quiz-question-group-update.component').then(m => m.QuizQuestionGroupUpdateComponent),
    resolve: {
      quizQuestionGroup: QuizQuestionGroupResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/quiz-question-group-update.component').then(m => m.QuizQuestionGroupUpdateComponent),
    resolve: {
      quizQuestionGroup: QuizQuestionGroupResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default quizQuestionGroupRoute;
