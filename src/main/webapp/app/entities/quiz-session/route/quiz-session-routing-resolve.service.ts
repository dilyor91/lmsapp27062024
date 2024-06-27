import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IQuizSession } from '../quiz-session.model';
import { QuizSessionService } from '../service/quiz-session.service';

const quizSessionResolve = (route: ActivatedRouteSnapshot): Observable<null | IQuizSession> => {
  const id = route.params['id'];
  if (id) {
    return inject(QuizSessionService)
      .find(id)
      .pipe(
        mergeMap((quizSession: HttpResponse<IQuizSession>) => {
          if (quizSession.body) {
            return of(quizSession.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default quizSessionResolve;
