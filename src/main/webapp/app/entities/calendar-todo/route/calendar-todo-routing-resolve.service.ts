import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICalendarTodo } from '../calendar-todo.model';
import { CalendarTodoService } from '../service/calendar-todo.service';

const calendarTodoResolve = (route: ActivatedRouteSnapshot): Observable<null | ICalendarTodo> => {
  const id = route.params.id;
  if (id) {
    return inject(CalendarTodoService)
      .find(id)
      .pipe(
        mergeMap((calendarTodo: HttpResponse<ICalendarTodo>) => {
          if (calendarTodo.body) {
            return of(calendarTodo.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default calendarTodoResolve;
