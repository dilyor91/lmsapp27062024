import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IExamResult } from '../exam-result.model';
import { ExamResultService } from '../service/exam-result.service';

const examResultResolve = (route: ActivatedRouteSnapshot): Observable<null | IExamResult> => {
  const id = route.params.id;
  if (id) {
    return inject(ExamResultService)
      .find(id)
      .pipe(
        mergeMap((examResult: HttpResponse<IExamResult>) => {
          if (examResult.body) {
            return of(examResult.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default examResultResolve;
