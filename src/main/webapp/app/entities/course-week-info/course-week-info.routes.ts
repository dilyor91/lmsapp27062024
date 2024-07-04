import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CourseWeekInfoComponent } from './list/course-week-info.component';
import { CourseWeekInfoDetailComponent } from './detail/course-week-info-detail.component';
import { CourseWeekInfoUpdateComponent } from './update/course-week-info-update.component';
import CourseWeekInfoResolve from './route/course-week-info-routing-resolve.service';

const courseWeekInfoRoute: Routes = [
  {
    path: '',
    component: CourseWeekInfoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CourseWeekInfoDetailComponent,
    resolve: {
      courseWeekInfo: CourseWeekInfoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CourseWeekInfoUpdateComponent,
    resolve: {
      courseWeekInfo: CourseWeekInfoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CourseWeekInfoUpdateComponent,
    resolve: {
      courseWeekInfo: CourseWeekInfoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default courseWeekInfoRoute;
