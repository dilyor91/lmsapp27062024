import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { CourseWeekComponent } from './list/course-week.component';
import { CourseWeekDetailComponent } from './detail/course-week-detail.component';
import { CourseWeekUpdateComponent } from './update/course-week-update.component';
import CourseWeekResolve from './route/course-week-routing-resolve.service';

const courseWeekRoute: Routes = [
  {
    path: '',
    component: CourseWeekComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CourseWeekDetailComponent,
    resolve: {
      courseWeek: CourseWeekResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CourseWeekUpdateComponent,
    resolve: {
      courseWeek: CourseWeekResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CourseWeekUpdateComponent,
    resolve: {
      courseWeek: CourseWeekResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default courseWeekRoute;
