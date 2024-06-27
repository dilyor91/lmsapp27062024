import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { AttendanceDetailComponent } from './list/attendance-detail.component';
import { AttendanceDetailDetailComponent } from './detail/attendance-detail-detail.component';
import { AttendanceDetailUpdateComponent } from './update/attendance-detail-update.component';
import AttendanceDetailResolve from './route/attendance-detail-routing-resolve.service';

const attendanceDetailRoute: Routes = [
  {
    path: '',
    component: AttendanceDetailComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AttendanceDetailDetailComponent,
    resolve: {
      attendanceDetail: AttendanceDetailResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AttendanceDetailUpdateComponent,
    resolve: {
      attendanceDetail: AttendanceDetailResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AttendanceDetailUpdateComponent,
    resolve: {
      attendanceDetail: AttendanceDetailResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default attendanceDetailRoute;
