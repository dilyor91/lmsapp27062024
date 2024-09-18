import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAnnouncementStudentRead } from '../announcement-student-read.model';
import { AnnouncementStudentReadService } from '../service/announcement-student-read.service';

const announcementStudentReadResolve = (route: ActivatedRouteSnapshot): Observable<null | IAnnouncementStudentRead> => {
  const id = route.params.id;
  if (id) {
    return inject(AnnouncementStudentReadService)
      .find(id)
      .pipe(
        mergeMap((announcementStudentRead: HttpResponse<IAnnouncementStudentRead>) => {
          if (announcementStudentRead.body) {
            return of(announcementStudentRead.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default announcementStudentReadResolve;
