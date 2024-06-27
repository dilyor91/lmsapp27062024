import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IQuizQuestionGroup } from '../quiz-question-group.model';
import { QuizQuestionGroupService } from '../service/quiz-question-group.service';

const quizQuestionGroupResolve = (route: ActivatedRouteSnapshot): Observable<null | IQuizQuestionGroup> => {
  const id = route.params['id'];
  if (id) {
    return inject(QuizQuestionGroupService)
      .find(id)
      .pipe(
        mergeMap((quizQuestionGroup: HttpResponse<IQuizQuestionGroup>) => {
          if (quizQuestionGroup.body) {
            return of(quizQuestionGroup.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default quizQuestionGroupResolve;
