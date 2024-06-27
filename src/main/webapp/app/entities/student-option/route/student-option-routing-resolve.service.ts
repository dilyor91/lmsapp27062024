import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStudentOption } from '../student-option.model';
import { StudentOptionService } from '../service/student-option.service';

const studentOptionResolve = (route: ActivatedRouteSnapshot): Observable<null | IStudentOption> => {
  const id = route.params['id'];
  if (id) {
    return inject(StudentOptionService)
      .find(id)
      .pipe(
        mergeMap((studentOption: HttpResponse<IStudentOption>) => {
          if (studentOption.body) {
            return of(studentOption.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default studentOptionResolve;
