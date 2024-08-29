import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICalendarTodo, NewCalendarTodo } from '../calendar-todo.model';

export type PartialUpdateCalendarTodo = Partial<ICalendarTodo> & Pick<ICalendarTodo, 'id'>;

type RestOf<T extends ICalendarTodo | NewCalendarTodo> = Omit<T, 'date'> & {
  date?: string | null;
};

export type RestCalendarTodo = RestOf<ICalendarTodo>;

export type NewRestCalendarTodo = RestOf<NewCalendarTodo>;

export type PartialUpdateRestCalendarTodo = RestOf<PartialUpdateCalendarTodo>;

export type EntityResponseType = HttpResponse<ICalendarTodo>;
export type EntityArrayResponseType = HttpResponse<ICalendarTodo[]>;

@Injectable({ providedIn: 'root' })
export class CalendarTodoService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/calendar-todos');

  create(calendarTodo: NewCalendarTodo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(calendarTodo);
    return this.http
      .post<RestCalendarTodo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(calendarTodo: ICalendarTodo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(calendarTodo);
    return this.http
      .put<RestCalendarTodo>(`${this.resourceUrl}/${this.getCalendarTodoIdentifier(calendarTodo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(calendarTodo: PartialUpdateCalendarTodo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(calendarTodo);
    return this.http
      .patch<RestCalendarTodo>(`${this.resourceUrl}/${this.getCalendarTodoIdentifier(calendarTodo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCalendarTodo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCalendarTodo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCalendarTodoIdentifier(calendarTodo: Pick<ICalendarTodo, 'id'>): number {
    return calendarTodo.id;
  }

  compareCalendarTodo(o1: Pick<ICalendarTodo, 'id'> | null, o2: Pick<ICalendarTodo, 'id'> | null): boolean {
    return o1 && o2 ? this.getCalendarTodoIdentifier(o1) === this.getCalendarTodoIdentifier(o2) : o1 === o2;
  }

  addCalendarTodoToCollectionIfMissing<Type extends Pick<ICalendarTodo, 'id'>>(
    calendarTodoCollection: Type[],
    ...calendarTodosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const calendarTodos: Type[] = calendarTodosToCheck.filter(isPresent);
    if (calendarTodos.length > 0) {
      const calendarTodoCollectionIdentifiers = calendarTodoCollection.map(calendarTodoItem =>
        this.getCalendarTodoIdentifier(calendarTodoItem),
      );
      const calendarTodosToAdd = calendarTodos.filter(calendarTodoItem => {
        const calendarTodoIdentifier = this.getCalendarTodoIdentifier(calendarTodoItem);
        if (calendarTodoCollectionIdentifiers.includes(calendarTodoIdentifier)) {
          return false;
        }
        calendarTodoCollectionIdentifiers.push(calendarTodoIdentifier);
        return true;
      });
      return [...calendarTodosToAdd, ...calendarTodoCollection];
    }
    return calendarTodoCollection;
  }

  protected convertDateFromClient<T extends ICalendarTodo | NewCalendarTodo | PartialUpdateCalendarTodo>(calendarTodo: T): RestOf<T> {
    return {
      ...calendarTodo,
      date: calendarTodo.date?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restCalendarTodo: RestCalendarTodo): ICalendarTodo {
    return {
      ...restCalendarTodo,
      date: restCalendarTodo.date ? dayjs(restCalendarTodo.date) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCalendarTodo>): HttpResponse<ICalendarTodo> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCalendarTodo[]>): HttpResponse<ICalendarTodo[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
