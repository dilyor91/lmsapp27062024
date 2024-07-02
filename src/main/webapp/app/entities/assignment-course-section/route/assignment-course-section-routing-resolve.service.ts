import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAssignmentCourseSection } from '../assignment-course-section.model';
import { AssignmentCourseSectionService } from '../service/assignment-course-section.service';

const assignmentCourseSectionResolve = (route: ActivatedRouteSnapshot): Observable<null | IAssignmentCourseSection> => {
  const id = route.params['id'];
  if (id) {
    return inject(AssignmentCourseSectionService)
      .find(id)
      .pipe(
        mergeMap((assignmentCourseSection: HttpResponse<IAssignmentCourseSection>) => {
          if (assignmentCourseSection.body) {
            return of(assignmentCourseSection.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default assignmentCourseSectionResolve;
