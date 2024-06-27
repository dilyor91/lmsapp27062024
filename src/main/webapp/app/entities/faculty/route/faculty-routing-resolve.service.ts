import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFaculty } from '../faculty.model';
import { FacultyService } from '../service/faculty.service';

const facultyResolve = (route: ActivatedRouteSnapshot): Observable<null | IFaculty> => {
  const id = route.params['id'];
  if (id) {
    return inject(FacultyService)
      .find(id)
      .pipe(
        mergeMap((faculty: HttpResponse<IFaculty>) => {
          if (faculty.body) {
            return of(faculty.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default facultyResolve;
