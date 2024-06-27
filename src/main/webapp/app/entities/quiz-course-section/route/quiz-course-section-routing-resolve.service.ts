import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IQuizCourseSection } from '../quiz-course-section.model';
import { QuizCourseSectionService } from '../service/quiz-course-section.service';

const quizCourseSectionResolve = (route: ActivatedRouteSnapshot): Observable<null | IQuizCourseSection> => {
  const id = route.params['id'];
  if (id) {
    return inject(QuizCourseSectionService)
      .find(id)
      .pipe(
        mergeMap((quizCourseSection: HttpResponse<IQuizCourseSection>) => {
          if (quizCourseSection.body) {
            return of(quizCourseSection.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default quizCourseSectionResolve;
