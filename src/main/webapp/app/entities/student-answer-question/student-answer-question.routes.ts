import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import StudentAnswerQuestionResolve from './route/student-answer-question-routing-resolve.service';

const studentAnswerQuestionRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/student-answer-question.component').then(m => m.StudentAnswerQuestionComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/student-answer-question-detail.component').then(m => m.StudentAnswerQuestionDetailComponent),
    resolve: {
      studentAnswerQuestion: StudentAnswerQuestionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/student-answer-question-update.component').then(m => m.StudentAnswerQuestionUpdateComponent),
    resolve: {
      studentAnswerQuestion: StudentAnswerQuestionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/student-answer-question-update.component').then(m => m.StudentAnswerQuestionUpdateComponent),
    resolve: {
      studentAnswerQuestion: StudentAnswerQuestionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default studentAnswerQuestionRoute;
