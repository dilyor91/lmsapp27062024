import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IQuestionGroup } from '../question-group.model';
import { QuestionGroupService } from '../service/question-group.service';

const questionGroupResolve = (route: ActivatedRouteSnapshot): Observable<null | IQuestionGroup> => {
  const id = route.params['id'];
  if (id) {
    return inject(QuestionGroupService)
      .find(id)
      .pipe(
        mergeMap((questionGroup: HttpResponse<IQuestionGroup>) => {
          if (questionGroup.body) {
            return of(questionGroup.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default questionGroupResolve;
