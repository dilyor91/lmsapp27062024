import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStudentQuestion } from '../student-question.model';
import { StudentQuestionService } from '../service/student-question.service';

const studentQuestionResolve = (route: ActivatedRouteSnapshot): Observable<null | IStudentQuestion> => {
  const id = route.params['id'];
  if (id) {
    return inject(StudentQuestionService)
      .find(id)
      .pipe(
        mergeMap((studentQuestion: HttpResponse<IStudentQuestion>) => {
          if (studentQuestion.body) {
            return of(studentQuestion.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default studentQuestionResolve;
