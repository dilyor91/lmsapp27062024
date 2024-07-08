import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISubmissionAssignment } from '../submission-assignment.model';
import { SubmissionAssignmentService } from '../service/submission-assignment.service';

const submissionAssignmentResolve = (route: ActivatedRouteSnapshot): Observable<null | ISubmissionAssignment> => {
  const id = route.params['id'];
  if (id) {
    return inject(SubmissionAssignmentService)
      .find(id)
      .pipe(
        mergeMap((submissionAssignment: HttpResponse<ISubmissionAssignment>) => {
          if (submissionAssignment.body) {
            return of(submissionAssignment.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default submissionAssignmentResolve;
