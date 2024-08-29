import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import SubmissionAssignmentResolve from './route/submission-assignment-routing-resolve.service';

const submissionAssignmentRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/submission-assignment.component').then(m => m.SubmissionAssignmentComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/submission-assignment-detail.component').then(m => m.SubmissionAssignmentDetailComponent),
    resolve: {
      submissionAssignment: SubmissionAssignmentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/submission-assignment-update.component').then(m => m.SubmissionAssignmentUpdateComponent),
    resolve: {
      submissionAssignment: SubmissionAssignmentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/submission-assignment-update.component').then(m => m.SubmissionAssignmentUpdateComponent),
    resolve: {
      submissionAssignment: SubmissionAssignmentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default submissionAssignmentRoute;
