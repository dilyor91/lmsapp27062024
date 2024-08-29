import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStudyTerm } from '../study-term.model';
import { StudyTermService } from '../service/study-term.service';

const studyTermResolve = (route: ActivatedRouteSnapshot): Observable<null | IStudyTerm> => {
  const id = route.params.id;
  if (id) {
    return inject(StudyTermService)
      .find(id)
      .pipe(
        mergeMap((studyTerm: HttpResponse<IStudyTerm>) => {
          if (studyTerm.body) {
            return of(studyTerm.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default studyTermResolve;
