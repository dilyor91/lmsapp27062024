import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { AssignmentCourseSectionComponent } from './list/assignment-course-section.component';
import { AssignmentCourseSectionDetailComponent } from './detail/assignment-course-section-detail.component';
import { AssignmentCourseSectionUpdateComponent } from './update/assignment-course-section-update.component';
import AssignmentCourseSectionResolve from './route/assignment-course-section-routing-resolve.service';

const assignmentCourseSectionRoute: Routes = [
  {
    path: '',
    component: AssignmentCourseSectionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AssignmentCourseSectionDetailComponent,
    resolve: {
      assignmentCourseSection: AssignmentCourseSectionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AssignmentCourseSectionUpdateComponent,
    resolve: {
      assignmentCourseSection: AssignmentCourseSectionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AssignmentCourseSectionUpdateComponent,
    resolve: {
      assignmentCourseSection: AssignmentCourseSectionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default assignmentCourseSectionRoute;
