import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { StudyTermComponent } from './list/study-term.component';
import { StudyTermDetailComponent } from './detail/study-term-detail.component';
import { StudyTermUpdateComponent } from './update/study-term-update.component';
import StudyTermResolve from './route/study-term-routing-resolve.service';

const studyTermRoute: Routes = [
  {
    path: '',
    component: StudyTermComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StudyTermDetailComponent,
    resolve: {
      studyTerm: StudyTermResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StudyTermUpdateComponent,
    resolve: {
      studyTerm: StudyTermResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StudyTermUpdateComponent,
    resolve: {
      studyTerm: StudyTermResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default studyTermRoute;
