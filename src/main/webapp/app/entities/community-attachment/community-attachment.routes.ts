import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import CommunityAttachmentResolve from './route/community-attachment-routing-resolve.service';

const communityAttachmentRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/community-attachment.component').then(m => m.CommunityAttachmentComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/community-attachment-detail.component').then(m => m.CommunityAttachmentDetailComponent),
    resolve: {
      communityAttachment: CommunityAttachmentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/community-attachment-update.component').then(m => m.CommunityAttachmentUpdateComponent),
    resolve: {
      communityAttachment: CommunityAttachmentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/community-attachment-update.component').then(m => m.CommunityAttachmentUpdateComponent),
    resolve: {
      communityAttachment: CommunityAttachmentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default communityAttachmentRoute;
