import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import CourseSectionResolve from './route/course-section-routing-resolve.service';

const courseSectionRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/course-section.component').then(m => m.CourseSectionComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/course-section-detail.component').then(m => m.CourseSectionDetailComponent),
    resolve: {
      courseSection: CourseSectionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/course-section-update.component').then(m => m.CourseSectionUpdateComponent),
    resolve: {
      courseSection: CourseSectionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/course-section-update.component').then(m => m.CourseSectionUpdateComponent),
    resolve: {
      courseSection: CourseSectionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default courseSectionRoute;
