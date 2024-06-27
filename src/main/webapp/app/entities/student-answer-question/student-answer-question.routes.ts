import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { StudentAnswerQuestionComponent } from './list/student-answer-question.component';
import { StudentAnswerQuestionDetailComponent } from './detail/student-answer-question-detail.component';
import { StudentAnswerQuestionUpdateComponent } from './update/student-answer-question-update.component';
import StudentAnswerQuestionResolve from './route/student-answer-question-routing-resolve.service';

const studentAnswerQuestionRoute: Routes = [
  {
    path: '',
    component: StudentAnswerQuestionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StudentAnswerQuestionDetailComponent,
    resolve: {
      studentAnswerQuestion: StudentAnswerQuestionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StudentAnswerQuestionUpdateComponent,
    resolve: {
      studentAnswerQuestion: StudentAnswerQuestionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StudentAnswerQuestionUpdateComponent,
    resolve: {
      studentAnswerQuestion: StudentAnswerQuestionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default studentAnswerQuestionRoute;
