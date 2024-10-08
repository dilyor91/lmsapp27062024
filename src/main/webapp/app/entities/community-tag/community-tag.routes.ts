import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import CommunityTagResolve from './route/community-tag-routing-resolve.service';

const communityTagRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/community-tag.component').then(m => m.CommunityTagComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/community-tag-detail.component').then(m => m.CommunityTagDetailComponent),
    resolve: {
      communityTag: CommunityTagResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/community-tag-update.component').then(m => m.CommunityTagUpdateComponent),
    resolve: {
      communityTag: CommunityTagResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/community-tag-update.component').then(m => m.CommunityTagUpdateComponent),
    resolve: {
      communityTag: CommunityTagResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default communityTagRoute;
