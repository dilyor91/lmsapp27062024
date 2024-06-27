import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { QuizQuestionGroupComponent } from './list/quiz-question-group.component';
import { QuizQuestionGroupDetailComponent } from './detail/quiz-question-group-detail.component';
import { QuizQuestionGroupUpdateComponent } from './update/quiz-question-group-update.component';
import QuizQuestionGroupResolve from './route/quiz-question-group-routing-resolve.service';

const quizQuestionGroupRoute: Routes = [
  {
    path: '',
    component: QuizQuestionGroupComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: QuizQuestionGroupDetailComponent,
    resolve: {
      quizQuestionGroup: QuizQuestionGroupResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: QuizQuestionGroupUpdateComponent,
    resolve: {
      quizQuestionGroup: QuizQuestionGroupResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: QuizQuestionGroupUpdateComponent,
    resolve: {
      quizQuestionGroup: QuizQuestionGroupResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default quizQuestionGroupRoute;
