import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import QuizCourseSectionResolve from './route/quiz-course-section-routing-resolve.service';

const quizCourseSectionRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/quiz-course-section.component').then(m => m.QuizCourseSectionComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/quiz-course-section-detail.component').then(m => m.QuizCourseSectionDetailComponent),
    resolve: {
      quizCourseSection: QuizCourseSectionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/quiz-course-section-update.component').then(m => m.QuizCourseSectionUpdateComponent),
    resolve: {
      quizCourseSection: QuizCourseSectionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/quiz-course-section-update.component').then(m => m.QuizCourseSectionUpdateComponent),
    resolve: {
      quizCourseSection: QuizCourseSectionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default quizCourseSectionRoute;
