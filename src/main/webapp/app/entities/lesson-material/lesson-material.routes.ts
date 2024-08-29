import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import LessonMaterialResolve from './route/lesson-material-routing-resolve.service';

const lessonMaterialRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/lesson-material.component').then(m => m.LessonMaterialComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/lesson-material-detail.component').then(m => m.LessonMaterialDetailComponent),
    resolve: {
      lessonMaterial: LessonMaterialResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/lesson-material-update.component').then(m => m.LessonMaterialUpdateComponent),
    resolve: {
      lessonMaterial: LessonMaterialResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/lesson-material-update.component').then(m => m.LessonMaterialUpdateComponent),
    resolve: {
      lessonMaterial: LessonMaterialResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default lessonMaterialRoute;
