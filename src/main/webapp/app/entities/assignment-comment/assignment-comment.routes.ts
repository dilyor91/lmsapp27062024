import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import AssignmentCommentResolve from './route/assignment-comment-routing-resolve.service';

const assignmentCommentRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/assignment-comment.component').then(m => m.AssignmentCommentComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/assignment-comment-detail.component').then(m => m.AssignmentCommentDetailComponent),
    resolve: {
      assignmentComment: AssignmentCommentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/assignment-comment-update.component').then(m => m.AssignmentCommentUpdateComponent),
    resolve: {
      assignmentComment: AssignmentCommentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/assignment-comment-update.component').then(m => m.AssignmentCommentUpdateComponent),
    resolve: {
      assignmentComment: AssignmentCommentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default assignmentCommentRoute;
