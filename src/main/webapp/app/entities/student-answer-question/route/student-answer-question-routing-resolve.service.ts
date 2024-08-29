import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStudentAnswerQuestion } from '../student-answer-question.model';
import { StudentAnswerQuestionService } from '../service/student-answer-question.service';

const studentAnswerQuestionResolve = (route: ActivatedRouteSnapshot): Observable<null | IStudentAnswerQuestion> => {
  const id = route.params.id;
  if (id) {
    return inject(StudentAnswerQuestionService)
      .find(id)
      .pipe(
        mergeMap((studentAnswerQuestion: HttpResponse<IStudentAnswerQuestion>) => {
          if (studentAnswerQuestion.body) {
            return of(studentAnswerQuestion.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default studentAnswerQuestionResolve;
