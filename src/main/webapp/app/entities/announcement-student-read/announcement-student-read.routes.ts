import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import AnnouncementStudentReadResolve from './route/announcement-student-read-routing-resolve.service';

const announcementStudentReadRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/announcement-student-read.component').then(m => m.AnnouncementStudentReadComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/announcement-student-read-detail.component').then(m => m.AnnouncementStudentReadDetailComponent),
    resolve: {
      announcementStudentRead: AnnouncementStudentReadResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/announcement-student-read-update.component').then(m => m.AnnouncementStudentReadUpdateComponent),
    resolve: {
      announcementStudentRead: AnnouncementStudentReadResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/announcement-student-read-update.component').then(m => m.AnnouncementStudentReadUpdateComponent),
    resolve: {
      announcementStudentRead: AnnouncementStudentReadResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default announcementStudentReadRoute;
