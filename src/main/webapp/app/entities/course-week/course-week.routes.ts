import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import CourseWeekResolve from './route/course-week-routing-resolve.service';

const courseWeekRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/course-week.component').then(m => m.CourseWeekComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/course-week-detail.component').then(m => m.CourseWeekDetailComponent),
    resolve: {
      courseWeek: CourseWeekResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/course-week-update.component').then(m => m.CourseWeekUpdateComponent),
    resolve: {
      courseWeek: CourseWeekResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/course-week-update.component').then(m => m.CourseWeekUpdateComponent),
    resolve: {
      courseWeek: CourseWeekResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default courseWeekRoute;
