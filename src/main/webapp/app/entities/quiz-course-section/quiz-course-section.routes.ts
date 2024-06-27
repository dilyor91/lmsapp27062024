import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { QuizCourseSectionComponent } from './list/quiz-course-section.component';
import { QuizCourseSectionDetailComponent } from './detail/quiz-course-section-detail.component';
import { QuizCourseSectionUpdateComponent } from './update/quiz-course-section-update.component';
import QuizCourseSectionResolve from './route/quiz-course-section-routing-resolve.service';

const quizCourseSectionRoute: Routes = [
  {
    path: '',
    component: QuizCourseSectionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: QuizCourseSectionDetailComponent,
    resolve: {
      quizCourseSection: QuizCourseSectionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: QuizCourseSectionUpdateComponent,
    resolve: {
      quizCourseSection: QuizCourseSectionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: QuizCourseSectionUpdateComponent,
    resolve: {
      quizCourseSection: QuizCourseSectionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default quizCourseSectionRoute;
