import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import AnnouncementCourseSectionResolve from './route/announcement-course-section-routing-resolve.service';

const announcementCourseSectionRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/announcement-course-section.component').then(m => m.AnnouncementCourseSectionComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () =>
      import('./detail/announcement-course-section-detail.component').then(m => m.AnnouncementCourseSectionDetailComponent),
    resolve: {
      announcementCourseSection: AnnouncementCourseSectionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./update/announcement-course-section-update.component').then(m => m.AnnouncementCourseSectionUpdateComponent),
    resolve: {
      announcementCourseSection: AnnouncementCourseSectionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./update/announcement-course-section-update.component').then(m => m.AnnouncementCourseSectionUpdateComponent),
    resolve: {
      announcementCourseSection: AnnouncementCourseSectionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default announcementCourseSectionRoute;
