import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAssignmentComment } from '../assignment-comment.model';
import { AssignmentCommentService } from '../service/assignment-comment.service';

const assignmentCommentResolve = (route: ActivatedRouteSnapshot): Observable<null | IAssignmentComment> => {
  const id = route.params['id'];
  if (id) {
    return inject(AssignmentCommentService)
      .find(id)
      .pipe(
        mergeMap((assignmentComment: HttpResponse<IAssignmentComment>) => {
          if (assignmentComment.body) {
            return of(assignmentComment.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default assignmentCommentResolve;
