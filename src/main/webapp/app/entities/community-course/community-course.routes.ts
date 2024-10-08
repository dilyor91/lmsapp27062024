import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import CommunityCourseResolve from './route/community-course-routing-resolve.service';

const communityCourseRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/community-course.component').then(m => m.CommunityCourseComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/community-course-detail.component').then(m => m.CommunityCourseDetailComponent),
    resolve: {
      communityCourse: CommunityCourseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/community-course-update.component').then(m => m.CommunityCourseUpdateComponent),
    resolve: {
      communityCourse: CommunityCourseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/community-course-update.component').then(m => m.CommunityCourseUpdateComponent),
    resolve: {
      communityCourse: CommunityCourseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default communityCourseRoute;
