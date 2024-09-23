import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITimeTable } from '../time-table.model';
import { TimeTableService } from '../service/time-table.service';

const timeTableResolve = (route: ActivatedRouteSnapshot): Observable<null | ITimeTable> => {
  const id = route.params.id;
  if (id) {
    return inject(TimeTableService)
      .find(id)
      .pipe(
        mergeMap((timeTable: HttpResponse<ITimeTable>) => {
          if (timeTable.body) {
            return of(timeTable.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default timeTableResolve;
