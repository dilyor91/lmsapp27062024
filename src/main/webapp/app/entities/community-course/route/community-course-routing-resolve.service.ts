import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICommunityCourse } from '../community-course.model';
import { CommunityCourseService } from '../service/community-course.service';

const communityCourseResolve = (route: ActivatedRouteSnapshot): Observable<null | ICommunityCourse> => {
  const id = route.params.id;
  if (id) {
    return inject(CommunityCourseService)
      .find(id)
      .pipe(
        mergeMap((communityCourse: HttpResponse<ICommunityCourse>) => {
          if (communityCourse.body) {
            return of(communityCourse.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default communityCourseResolve;
