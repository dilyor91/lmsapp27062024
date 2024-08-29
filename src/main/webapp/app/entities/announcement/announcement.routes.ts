import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import AnnouncementResolve from './route/announcement-routing-resolve.service';

const announcementRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/announcement.component').then(m => m.AnnouncementComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/announcement-detail.component').then(m => m.AnnouncementDetailComponent),
    resolve: {
      announcement: AnnouncementResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/announcement-update.component').then(m => m.AnnouncementUpdateComponent),
    resolve: {
      announcement: AnnouncementResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/announcement-update.component').then(m => m.AnnouncementUpdateComponent),
    resolve: {
      announcement: AnnouncementResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default announcementRoute;
