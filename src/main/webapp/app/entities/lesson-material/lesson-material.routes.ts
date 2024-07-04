import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { LessonMaterialComponent } from './list/lesson-material.component';
import { LessonMaterialDetailComponent } from './detail/lesson-material-detail.component';
import { LessonMaterialUpdateComponent } from './update/lesson-material-update.component';
import LessonMaterialResolve from './route/lesson-material-routing-resolve.service';

const lessonMaterialRoute: Routes = [
  {
    path: '',
    component: LessonMaterialComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LessonMaterialDetailComponent,
    resolve: {
      lessonMaterial: LessonMaterialResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LessonMaterialUpdateComponent,
    resolve: {
      lessonMaterial: LessonMaterialResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LessonMaterialUpdateComponent,
    resolve: {
      lessonMaterial: LessonMaterialResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default lessonMaterialRoute;
