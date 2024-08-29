import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICourseWeek } from '../course-week.model';
import { CourseWeekService } from '../service/course-week.service';

const courseWeekResolve = (route: ActivatedRouteSnapshot): Observable<null | ICourseWeek> => {
  const id = route.params.id;
  if (id) {
    return inject(CourseWeekService)
      .find(id)
      .pipe(
        mergeMap((courseWeek: HttpResponse<ICourseWeek>) => {
          if (courseWeek.body) {
            return of(courseWeek.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default courseWeekResolve;
