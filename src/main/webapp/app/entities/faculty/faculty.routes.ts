import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { FacultyComponent } from './list/faculty.component';
import { FacultyDetailComponent } from './detail/faculty-detail.component';
import { FacultyUpdateComponent } from './update/faculty-update.component';
import FacultyResolve from './route/faculty-routing-resolve.service';

const facultyRoute: Routes = [
  {
    path: '',
    component: FacultyComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FacultyDetailComponent,
    resolve: {
      faculty: FacultyResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FacultyUpdateComponent,
    resolve: {
      faculty: FacultyResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FacultyUpdateComponent,
    resolve: {
      faculty: FacultyResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default facultyRoute;
