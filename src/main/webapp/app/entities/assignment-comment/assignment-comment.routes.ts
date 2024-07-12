import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { AssignmentCommentComponent } from './list/assignment-comment.component';
import { AssignmentCommentDetailComponent } from './detail/assignment-comment-detail.component';
import { AssignmentCommentUpdateComponent } from './update/assignment-comment-update.component';
import AssignmentCommentResolve from './route/assignment-comment-routing-resolve.service';

const assignmentCommentRoute: Routes = [
  {
    path: '',
    component: AssignmentCommentComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AssignmentCommentDetailComponent,
    resolve: {
      assignmentComment: AssignmentCommentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AssignmentCommentUpdateComponent,
    resolve: {
      assignmentComment: AssignmentCommentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AssignmentCommentUpdateComponent,
    resolve: {
      assignmentComment: AssignmentCommentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default assignmentCommentRoute;
