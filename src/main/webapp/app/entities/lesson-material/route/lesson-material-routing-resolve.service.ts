import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILessonMaterial } from '../lesson-material.model';
import { LessonMaterialService } from '../service/lesson-material.service';

const lessonMaterialResolve = (route: ActivatedRouteSnapshot): Observable<null | ILessonMaterial> => {
  const id = route.params.id;
  if (id) {
    return inject(LessonMaterialService)
      .find(id)
      .pipe(
        mergeMap((lessonMaterial: HttpResponse<ILessonMaterial>) => {
          if (lessonMaterial.body) {
            return of(lessonMaterial.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default lessonMaterialResolve;
