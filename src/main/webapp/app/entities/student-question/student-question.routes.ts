import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import StudentQuestionResolve from './route/student-question-routing-resolve.service';

const studentQuestionRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/student-question.component').then(m => m.StudentQuestionComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/student-question-detail.component').then(m => m.StudentQuestionDetailComponent),
    resolve: {
      studentQuestion: StudentQuestionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/student-question-update.component').then(m => m.StudentQuestionUpdateComponent),
    resolve: {
      studentQuestion: StudentQuestionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/student-question-update.component').then(m => m.StudentQuestionUpdateComponent),
    resolve: {
      studentQuestion: StudentQuestionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default studentQuestionRoute;
