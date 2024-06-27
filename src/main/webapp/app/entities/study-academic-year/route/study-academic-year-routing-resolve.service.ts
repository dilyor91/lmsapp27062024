import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStudyAcademicYear } from '../study-academic-year.model';
import { StudyAcademicYearService } from '../service/study-academic-year.service';

const studyAcademicYearResolve = (route: ActivatedRouteSnapshot): Observable<null | IStudyAcademicYear> => {
  const id = route.params['id'];
  if (id) {
    return inject(StudyAcademicYearService)
      .find(id)
      .pipe(
        mergeMap((studyAcademicYear: HttpResponse<IStudyAcademicYear>) => {
          if (studyAcademicYear.body) {
            return of(studyAcademicYear.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default studyAcademicYearResolve;
