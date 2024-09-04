import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAnnouncementCourseSection } from '../announcement-course-section.model';
import { AnnouncementCourseSectionService } from '../service/announcement-course-section.service';

const announcementCourseSectionResolve = (route: ActivatedRouteSnapshot): Observable<null | IAnnouncementCourseSection> => {
  const id = route.params.id;
  if (id) {
    return inject(AnnouncementCourseSectionService)
      .find(id)
      .pipe(
        mergeMap((announcementCourseSection: HttpResponse<IAnnouncementCourseSection>) => {
          if (announcementCourseSection.body) {
            return of(announcementCourseSection.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default announcementCourseSectionResolve;
