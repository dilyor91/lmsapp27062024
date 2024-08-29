import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IQuizResult } from '../quiz-result.model';
import { QuizResultService } from '../service/quiz-result.service';

const quizResultResolve = (route: ActivatedRouteSnapshot): Observable<null | IQuizResult> => {
  const id = route.params.id;
  if (id) {
    return inject(QuizResultService)
      .find(id)
      .pipe(
        mergeMap((quizResult: HttpResponse<IQuizResult>) => {
          if (quizResult.body) {
            return of(quizResult.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default quizResultResolve;
