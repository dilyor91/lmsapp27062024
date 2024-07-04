import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICourseWeekInfo, NewCourseWeekInfo } from '../course-week-info.model';

export type PartialUpdateCourseWeekInfo = Partial<ICourseWeekInfo> & Pick<ICourseWeekInfo, 'id'>;

type RestOf<T extends ICourseWeekInfo | NewCourseWeekInfo> = Omit<T, 'startDate'> & {
  startDate?: string | null;
};

export type RestCourseWeekInfo = RestOf<ICourseWeekInfo>;

export type NewRestCourseWeekInfo = RestOf<NewCourseWeekInfo>;

export type PartialUpdateRestCourseWeekInfo = RestOf<PartialUpdateCourseWeekInfo>;

export type EntityResponseType = HttpResponse<ICourseWeekInfo>;
export type EntityArrayResponseType = HttpResponse<ICourseWeekInfo[]>;

@Injectable({ providedIn: 'root' })
export class CourseWeekInfoService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/course-week-infos');

  create(courseWeekInfo: NewCourseWeekInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(courseWeekInfo);
    return this.http
      .post<RestCourseWeekInfo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(courseWeekInfo: ICourseWeekInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(courseWeekInfo);
    return this.http
      .put<RestCourseWeekInfo>(`${this.resourceUrl}/${this.getCourseWeekInfoIdentifier(courseWeekInfo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(courseWeekInfo: PartialUpdateCourseWeekInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(courseWeekInfo);
    return this.http
      .patch<RestCourseWeekInfo>(`${this.resourceUrl}/${this.getCourseWeekInfoIdentifier(courseWeekInfo)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCourseWeekInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCourseWeekInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCourseWeekInfoIdentifier(courseWeekInfo: Pick<ICourseWeekInfo, 'id'>): number {
    return courseWeekInfo.id;
  }

  compareCourseWeekInfo(o1: Pick<ICourseWeekInfo, 'id'> | null, o2: Pick<ICourseWeekInfo, 'id'> | null): boolean {
    return o1 && o2 ? this.getCourseWeekInfoIdentifier(o1) === this.getCourseWeekInfoIdentifier(o2) : o1 === o2;
  }

  addCourseWeekInfoToCollectionIfMissing<Type extends Pick<ICourseWeekInfo, 'id'>>(
    courseWeekInfoCollection: Type[],
    ...courseWeekInfosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const courseWeekInfos: Type[] = courseWeekInfosToCheck.filter(isPresent);
    if (courseWeekInfos.length > 0) {
      const courseWeekInfoCollectionIdentifiers = courseWeekInfoCollection.map(courseWeekInfoItem =>
        this.getCourseWeekInfoIdentifier(courseWeekInfoItem),
      );
      const courseWeekInfosToAdd = courseWeekInfos.filter(courseWeekInfoItem => {
        const courseWeekInfoIdentifier = this.getCourseWeekInfoIdentifier(courseWeekInfoItem);
        if (courseWeekInfoCollectionIdentifiers.includes(courseWeekInfoIdentifier)) {
          return false;
        }
        courseWeekInfoCollectionIdentifiers.push(courseWeekInfoIdentifier);
        return true;
      });
      return [...courseWeekInfosToAdd, ...courseWeekInfoCollection];
    }
    return courseWeekInfoCollection;
  }

  protected convertDateFromClient<T extends ICourseWeekInfo | NewCourseWeekInfo | PartialUpdateCourseWeekInfo>(
    courseWeekInfo: T,
  ): RestOf<T> {
    return {
      ...courseWeekInfo,
      startDate: courseWeekInfo.startDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restCourseWeekInfo: RestCourseWeekInfo): ICourseWeekInfo {
    return {
      ...restCourseWeekInfo,
      startDate: restCourseWeekInfo.startDate ? dayjs(restCourseWeekInfo.startDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCourseWeekInfo>): HttpResponse<ICourseWeekInfo> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCourseWeekInfo[]>): HttpResponse<ICourseWeekInfo[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
