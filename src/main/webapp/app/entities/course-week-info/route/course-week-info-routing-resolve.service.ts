import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICourseWeekInfo } from '../course-week-info.model';
import { CourseWeekInfoService } from '../service/course-week-info.service';

const courseWeekInfoResolve = (route: ActivatedRouteSnapshot): Observable<null | ICourseWeekInfo> => {
  const id = route.params['id'];
  if (id) {
    return inject(CourseWeekInfoService)
      .find(id)
      .pipe(
        mergeMap((courseWeekInfo: HttpResponse<ICourseWeekInfo>) => {
          if (courseWeekInfo.body) {
            return of(courseWeekInfo.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default courseWeekInfoResolve;
