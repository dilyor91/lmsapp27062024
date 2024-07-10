import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { GradeComponent } from './list/grade.component';
import { GradeDetailComponent } from './detail/grade-detail.component';
import { GradeUpdateComponent } from './update/grade-update.component';
import GradeResolve from './route/grade-routing-resolve.service';

const gradeRoute: Routes = [
  {
    path: '',
    component: GradeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GradeDetailComponent,
    resolve: {
      grade: GradeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GradeUpdateComponent,
    resolve: {
      grade: GradeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GradeUpdateComponent,
    resolve: {
      grade: GradeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default gradeRoute;
