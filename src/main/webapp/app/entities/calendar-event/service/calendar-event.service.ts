import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICalendarEvent, NewCalendarEvent } from '../calendar-event.model';

export type PartialUpdateCalendarEvent = Partial<ICalendarEvent> & Pick<ICalendarEvent, 'id'>;

type RestOf<T extends ICalendarEvent | NewCalendarEvent> = Omit<T, 'date'> & {
  date?: string | null;
};

export type RestCalendarEvent = RestOf<ICalendarEvent>;

export type NewRestCalendarEvent = RestOf<NewCalendarEvent>;

export type PartialUpdateRestCalendarEvent = RestOf<PartialUpdateCalendarEvent>;

export type EntityResponseType = HttpResponse<ICalendarEvent>;
export type EntityArrayResponseType = HttpResponse<ICalendarEvent[]>;

@Injectable({ providedIn: 'root' })
export class CalendarEventService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/calendar-events');

  create(calendarEvent: NewCalendarEvent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(calendarEvent);
    return this.http
      .post<RestCalendarEvent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(calendarEvent: ICalendarEvent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(calendarEvent);
    return this.http
      .put<RestCalendarEvent>(`${this.resourceUrl}/${this.getCalendarEventIdentifier(calendarEvent)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(calendarEvent: PartialUpdateCalendarEvent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(calendarEvent);
    return this.http
      .patch<RestCalendarEvent>(`${this.resourceUrl}/${this.getCalendarEventIdentifier(calendarEvent)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCalendarEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCalendarEvent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCalendarEventIdentifier(calendarEvent: Pick<ICalendarEvent, 'id'>): number {
    return calendarEvent.id;
  }

  compareCalendarEvent(o1: Pick<ICalendarEvent, 'id'> | null, o2: Pick<ICalendarEvent, 'id'> | null): boolean {
    return o1 && o2 ? this.getCalendarEventIdentifier(o1) === this.getCalendarEventIdentifier(o2) : o1 === o2;
  }

  addCalendarEventToCollectionIfMissing<Type extends Pick<ICalendarEvent, 'id'>>(
    calendarEventCollection: Type[],
    ...calendarEventsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const calendarEvents: Type[] = calendarEventsToCheck.filter(isPresent);
    if (calendarEvents.length > 0) {
      const calendarEventCollectionIdentifiers = calendarEventCollection.map(calendarEventItem =>
        this.getCalendarEventIdentifier(calendarEventItem),
      );
      const calendarEventsToAdd = calendarEvents.filter(calendarEventItem => {
        const calendarEventIdentifier = this.getCalendarEventIdentifier(calendarEventItem);
        if (calendarEventCollectionIdentifiers.includes(calendarEventIdentifier)) {
          return false;
        }
        calendarEventCollectionIdentifiers.push(calendarEventIdentifier);
        return true;
      });
      return [...calendarEventsToAdd, ...calendarEventCollection];
    }
    return calendarEventCollection;
  }

  protected convertDateFromClient<T extends ICalendarEvent | NewCalendarEvent | PartialUpdateCalendarEvent>(calendarEvent: T): RestOf<T> {
    return {
      ...calendarEvent,
      date: calendarEvent.date?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restCalendarEvent: RestCalendarEvent): ICalendarEvent {
    return {
      ...restCalendarEvent,
      date: restCalendarEvent.date ? dayjs(restCalendarEvent.date) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCalendarEvent>): HttpResponse<ICalendarEvent> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCalendarEvent[]>): HttpResponse<ICalendarEvent[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
