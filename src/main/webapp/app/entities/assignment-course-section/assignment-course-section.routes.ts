import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import AssignmentCourseSectionResolve from './route/assignment-course-section-routing-resolve.service';

const assignmentCourseSectionRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/assignment-course-section.component').then(m => m.AssignmentCourseSectionComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/assignment-course-section-detail.component').then(m => m.AssignmentCourseSectionDetailComponent),
    resolve: {
      assignmentCourseSection: AssignmentCourseSectionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/assignment-course-section-update.component').then(m => m.AssignmentCourseSectionUpdateComponent),
    resolve: {
      assignmentCourseSection: AssignmentCourseSectionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/assignment-course-section-update.component').then(m => m.AssignmentCourseSectionUpdateComponent),
    resolve: {
      assignmentCourseSection: AssignmentCourseSectionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default assignmentCourseSectionRoute;
