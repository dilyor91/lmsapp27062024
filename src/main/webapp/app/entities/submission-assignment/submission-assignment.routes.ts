import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { SubmissionAssignmentComponent } from './list/submission-assignment.component';
import { SubmissionAssignmentDetailComponent } from './detail/submission-assignment-detail.component';
import { SubmissionAssignmentUpdateComponent } from './update/submission-assignment-update.component';
import SubmissionAssignmentResolve from './route/submission-assignment-routing-resolve.service';

const submissionAssignmentRoute: Routes = [
  {
    path: '',
    component: SubmissionAssignmentComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SubmissionAssignmentDetailComponent,
    resolve: {
      submissionAssignment: SubmissionAssignmentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SubmissionAssignmentUpdateComponent,
    resolve: {
      submissionAssignment: SubmissionAssignmentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SubmissionAssignmentUpdateComponent,
    resolve: {
      submissionAssignment: SubmissionAssignmentResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default submissionAssignmentRoute;
