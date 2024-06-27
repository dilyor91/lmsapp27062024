import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { StudentQuestionComponent } from './list/student-question.component';
import { StudentQuestionDetailComponent } from './detail/student-question-detail.component';
import { StudentQuestionUpdateComponent } from './update/student-question-update.component';
import StudentQuestionResolve from './route/student-question-routing-resolve.service';

const studentQuestionRoute: Routes = [
  {
    path: '',
    component: StudentQuestionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StudentQuestionDetailComponent,
    resolve: {
      studentQuestion: StudentQuestionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StudentQuestionUpdateComponent,
    resolve: {
      studentQuestion: StudentQuestionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StudentQuestionUpdateComponent,
    resolve: {
      studentQuestion: StudentQuestionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default studentQuestionRoute;
