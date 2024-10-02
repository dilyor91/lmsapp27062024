import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import MessageAttachmentResolve from './route/message-attachment-routing-resolve.service';

const messageAttachmentRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/message-attachment.component').then(m => m.MessageAttachmentComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/message-attachment-detail.component').then(m => m.MessageAttachmentDetailComponent),
    resolve: {
      messageAttachment: MessageAttachmentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/message-attachment-update.component').then(m => m.MessageAttachmentUpdateComponent),
    resolve: {
      messageAttachment: MessageAttachmentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/message-attachment-update.component').then(m => m.MessageAttachmentUpdateComponent),
    resolve: {
      messageAttachment: MessageAttachmentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default messageAttachmentRoute;
