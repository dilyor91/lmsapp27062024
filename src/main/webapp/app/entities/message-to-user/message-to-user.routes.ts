import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import MessageToUserResolve from './route/message-to-user-routing-resolve.service';

const messageToUserRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/message-to-user.component').then(m => m.MessageToUserComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/message-to-user-detail.component').then(m => m.MessageToUserDetailComponent),
    resolve: {
      messageToUser: MessageToUserResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/message-to-user-update.component').then(m => m.MessageToUserUpdateComponent),
    resolve: {
      messageToUser: MessageToUserResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/message-to-user-update.component').then(m => m.MessageToUserUpdateComponent),
    resolve: {
      messageToUser: MessageToUserResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default messageToUserRoute;
