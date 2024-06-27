import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { StudyAcademicYearComponent } from './list/study-academic-year.component';
import { StudyAcademicYearDetailComponent } from './detail/study-academic-year-detail.component';
import { StudyAcademicYearUpdateComponent } from './update/study-academic-year-update.component';
import StudyAcademicYearResolve from './route/study-academic-year-routing-resolve.service';

const studyAcademicYearRoute: Routes = [
  {
    path: '',
    component: StudyAcademicYearComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StudyAcademicYearDetailComponent,
    resolve: {
      studyAcademicYear: StudyAcademicYearResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StudyAcademicYearUpdateComponent,
    resolve: {
      studyAcademicYear: StudyAcademicYearResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StudyAcademicYearUpdateComponent,
    resolve: {
      studyAcademicYear: StudyAcademicYearResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default studyAcademicYearRoute;
