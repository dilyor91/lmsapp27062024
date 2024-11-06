import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICourseWeek, NewCourseWeek } from '../course-week.model';

export type PartialUpdateCourseWeek = Partial<ICourseWeek> & Pick<ICourseWeek, 'id'>;

type RestOf<T extends ICourseWeek | NewCourseWeek> = Omit<T, 'weekDate'> & {
  weekDate?: string | null;
};

export type RestCourseWeek = RestOf<ICourseWeek>;

export type NewRestCourseWeek = RestOf<NewCourseWeek>;

export type PartialUpdateRestCourseWeek = RestOf<PartialUpdateCourseWeek>;

export type EntityResponseType = HttpResponse<ICourseWeek>;
export type EntityArrayResponseType = HttpResponse<ICourseWeek[]>;

@Injectable({ providedIn: 'root' })
export class CourseWeekService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/course-weeks');

  create(courseWeek: NewCourseWeek): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(courseWeek);
    return this.http
      .post<RestCourseWeek>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(courseWeek: ICourseWeek): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(courseWeek);
    return this.http
      .put<RestCourseWeek>(`${this.resourceUrl}/${this.getCourseWeekIdentifier(courseWeek)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(courseWeek: PartialUpdateCourseWeek): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(courseWeek);
    return this.http
      .patch<RestCourseWeek>(`${this.resourceUrl}/${this.getCourseWeekIdentifier(courseWeek)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCourseWeek>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCourseWeek[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCourseWeekIdentifier(courseWeek: Pick<ICourseWeek, 'id'>): number {
    return courseWeek.id;
  }

  compareCourseWeek(o1: Pick<ICourseWeek, 'id'> | null, o2: Pick<ICourseWeek, 'id'> | null): boolean {
    return o1 && o2 ? this.getCourseWeekIdentifier(o1) === this.getCourseWeekIdentifier(o2) : o1 === o2;
  }

  addCourseWeekToCollectionIfMissing<Type extends Pick<ICourseWeek, 'id'>>(
    courseWeekCollection: Type[],
    ...courseWeeksToCheck: (Type | null | undefined)[]
  ): Type[] {
    const courseWeeks: Type[] = courseWeeksToCheck.filter(isPresent);
    if (courseWeeks.length > 0) {
      const courseWeekCollectionIdentifiers = courseWeekCollection.map(courseWeekItem => this.getCourseWeekIdentifier(courseWeekItem));
      const courseWeeksToAdd = courseWeeks.filter(courseWeekItem => {
        const courseWeekIdentifier = this.getCourseWeekIdentifier(courseWeekItem);
        if (courseWeekCollectionIdentifiers.includes(courseWeekIdentifier)) {
          return false;
        }
        courseWeekCollectionIdentifiers.push(courseWeekIdentifier);
        return true;
      });
      return [...courseWeeksToAdd, ...courseWeekCollection];
    }
    return courseWeekCollection;
  }

  protected convertDateFromClient<T extends ICourseWeek | NewCourseWeek | PartialUpdateCourseWeek>(courseWeek: T): RestOf<T> {
    return {
      ...courseWeek,
      weekDate: courseWeek.weekDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restCourseWeek: RestCourseWeek): ICourseWeek {
    return {
      ...restCourseWeek,
      weekDate: restCourseWeek.weekDate ? dayjs(restCourseWeek.weekDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCourseWeek>): HttpResponse<ICourseWeek> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCourseWeek[]>): HttpResponse<ICourseWeek[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
