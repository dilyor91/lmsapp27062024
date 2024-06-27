import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { TeacherComponent } from './list/teacher.component';
import { TeacherDetailComponent } from './detail/teacher-detail.component';
import { TeacherUpdateComponent } from './update/teacher-update.component';
import TeacherResolve from './route/teacher-routing-resolve.service';

const teacherRoute: Routes = [
  {
    path: '',
    component: TeacherComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TeacherDetailComponent,
    resolve: {
      teacher: TeacherResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TeacherUpdateComponent,
    resolve: {
      teacher: TeacherResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TeacherUpdateComponent,
    resolve: {
      teacher: TeacherResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default teacherRoute;
