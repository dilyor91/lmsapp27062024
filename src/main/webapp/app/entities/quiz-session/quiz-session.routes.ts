import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { QuizSessionComponent } from './list/quiz-session.component';
import { QuizSessionDetailComponent } from './detail/quiz-session-detail.component';
import { QuizSessionUpdateComponent } from './update/quiz-session-update.component';
import QuizSessionResolve from './route/quiz-session-routing-resolve.service';

const quizSessionRoute: Routes = [
  {
    path: '',
    component: QuizSessionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: QuizSessionDetailComponent,
    resolve: {
      quizSession: QuizSessionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: QuizSessionUpdateComponent,
    resolve: {
      quizSession: QuizSessionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: QuizSessionUpdateComponent,
    resolve: {
      quizSession: QuizSessionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default quizSessionRoute;
