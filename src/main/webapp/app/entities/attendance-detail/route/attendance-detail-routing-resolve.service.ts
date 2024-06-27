import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAttendanceDetail } from '../attendance-detail.model';
import { AttendanceDetailService } from '../service/attendance-detail.service';

const attendanceDetailResolve = (route: ActivatedRouteSnapshot): Observable<null | IAttendanceDetail> => {
  const id = route.params['id'];
  if (id) {
    return inject(AttendanceDetailService)
      .find(id)
      .pipe(
        mergeMap((attendanceDetail: HttpResponse<IAttendanceDetail>) => {
          if (attendanceDetail.body) {
            return of(attendanceDetail.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default attendanceDetailResolve;
