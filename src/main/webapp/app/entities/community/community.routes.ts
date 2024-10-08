import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import CommunityResolve from './route/community-routing-resolve.service';

const communityRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/community.component').then(m => m.CommunityComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/community-detail.component').then(m => m.CommunityDetailComponent),
    resolve: {
      community: CommunityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/community-update.component').then(m => m.CommunityUpdateComponent),
    resolve: {
      community: CommunityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/community-update.component').then(m => m.CommunityUpdateComponent),
    resolve: {
      community: CommunityResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default communityRoute;
