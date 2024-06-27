import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { StudentOptionComponent } from './list/student-option.component';
import { StudentOptionDetailComponent } from './detail/student-option-detail.component';
import { StudentOptionUpdateComponent } from './update/student-option-update.component';
import StudentOptionResolve from './route/student-option-routing-resolve.service';

const studentOptionRoute: Routes = [
  {
    path: '',
    component: StudentOptionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StudentOptionDetailComponent,
    resolve: {
      studentOption: StudentOptionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StudentOptionUpdateComponent,
    resolve: {
      studentOption: StudentOptionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StudentOptionUpdateComponent,
    resolve: {
      studentOption: StudentOptionResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default studentOptionRoute;
