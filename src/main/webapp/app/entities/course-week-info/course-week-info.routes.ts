import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import CourseWeekInfoResolve from './route/course-week-info-routing-resolve.service';

const courseWeekInfoRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/course-week-info.component').then(m => m.CourseWeekInfoComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/course-week-info-detail.component').then(m => m.CourseWeekInfoDetailComponent),
    resolve: {
      courseWeekInfo: CourseWeekInfoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/course-week-info-update.component').then(m => m.CourseWeekInfoUpdateComponent),
    resolve: {
      courseWeekInfo: CourseWeekInfoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/course-week-info-update.component').then(m => m.CourseWeekInfoUpdateComponent),
    resolve: {
      courseWeekInfo: CourseWeekInfoResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default courseWeekInfoRoute;
