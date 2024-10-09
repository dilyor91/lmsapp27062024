import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import CommunityMessageResolve from './route/community-message-routing-resolve.service';

const communityMessageRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/community-message.component').then(m => m.CommunityMessageComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/community-message-detail.component').then(m => m.CommunityMessageDetailComponent),
    resolve: {
      communityMessage: CommunityMessageResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/community-message-update.component').then(m => m.CommunityMessageUpdateComponent),
    resolve: {
      communityMessage: CommunityMessageResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/community-message-update.component').then(m => m.CommunityMessageUpdateComponent),
    resolve: {
      communityMessage: CommunityMessageResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default communityMessageRoute;
