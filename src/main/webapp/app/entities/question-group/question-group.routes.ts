import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { QuestionGroupComponent } from './list/question-group.component';
import { QuestionGroupDetailComponent } from './detail/question-group-detail.component';
import { QuestionGroupUpdateComponent } from './update/question-group-update.component';
import QuestionGroupResolve from './route/question-group-routing-resolve.service';

const questionGroupRoute: Routes = [
  {
    path: '',
    component: QuestionGroupComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: QuestionGroupDetailComponent,
    resolve: {
      questionGroup: QuestionGroupResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: QuestionGroupUpdateComponent,
    resolve: {
      questionGroup: QuestionGroupResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: QuestionGroupUpdateComponent,
    resolve: {
      questionGroup: QuestionGroupResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default questionGroupRoute;
