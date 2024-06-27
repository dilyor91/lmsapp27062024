import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStudyAcademicYear, NewStudyAcademicYear } from '../study-academic-year.model';

export type PartialUpdateStudyAcademicYear = Partial<IStudyAcademicYear> & Pick<IStudyAcademicYear, 'id'>;

type RestOf<T extends IStudyAcademicYear | NewStudyAcademicYear> = Omit<T, 'fromDate' | 'endDate'> & {
  fromDate?: string | null;
  endDate?: string | null;
};

export type RestStudyAcademicYear = RestOf<IStudyAcademicYear>;

export type NewRestStudyAcademicYear = RestOf<NewStudyAcademicYear>;

export type PartialUpdateRestStudyAcademicYear = RestOf<PartialUpdateStudyAcademicYear>;

export type EntityResponseType = HttpResponse<IStudyAcademicYear>;
export type EntityArrayResponseType = HttpResponse<IStudyAcademicYear[]>;

@Injectable({ providedIn: 'root' })
export class StudyAcademicYearService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/study-academic-years');

  create(studyAcademicYear: NewStudyAcademicYear): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(studyAcademicYear);
    return this.http
      .post<RestStudyAcademicYear>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(studyAcademicYear: IStudyAcademicYear): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(studyAcademicYear);
    return this.http
      .put<RestStudyAcademicYear>(`${this.resourceUrl}/${this.getStudyAcademicYearIdentifier(studyAcademicYear)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(studyAcademicYear: PartialUpdateStudyAcademicYear): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(studyAcademicYear);
    return this.http
      .patch<RestStudyAcademicYear>(`${this.resourceUrl}/${this.getStudyAcademicYearIdentifier(studyAcademicYear)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestStudyAcademicYear>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestStudyAcademicYear[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getStudyAcademicYearIdentifier(studyAcademicYear: Pick<IStudyAcademicYear, 'id'>): number {
    return studyAcademicYear.id;
  }

  compareStudyAcademicYear(o1: Pick<IStudyAcademicYear, 'id'> | null, o2: Pick<IStudyAcademicYear, 'id'> | null): boolean {
    return o1 && o2 ? this.getStudyAcademicYearIdentifier(o1) === this.getStudyAcademicYearIdentifier(o2) : o1 === o2;
  }

  addStudyAcademicYearToCollectionIfMissing<Type extends Pick<IStudyAcademicYear, 'id'>>(
    studyAcademicYearCollection: Type[],
    ...studyAcademicYearsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const studyAcademicYears: Type[] = studyAcademicYearsToCheck.filter(isPresent);
    if (studyAcademicYears.length > 0) {
      const studyAcademicYearCollectionIdentifiers = studyAcademicYearCollection.map(studyAcademicYearItem =>
        this.getStudyAcademicYearIdentifier(studyAcademicYearItem),
      );
      const studyAcademicYearsToAdd = studyAcademicYears.filter(studyAcademicYearItem => {
        const studyAcademicYearIdentifier = this.getStudyAcademicYearIdentifier(studyAcademicYearItem);
        if (studyAcademicYearCollectionIdentifiers.includes(studyAcademicYearIdentifier)) {
          return false;
        }
        studyAcademicYearCollectionIdentifiers.push(studyAcademicYearIdentifier);
        return true;
      });
      return [...studyAcademicYearsToAdd, ...studyAcademicYearCollection];
    }
    return studyAcademicYearCollection;
  }

  protected convertDateFromClient<T extends IStudyAcademicYear | NewStudyAcademicYear | PartialUpdateStudyAcademicYear>(
    studyAcademicYear: T,
  ): RestOf<T> {
    return {
      ...studyAcademicYear,
      fromDate: studyAcademicYear.fromDate?.toJSON() ?? null,
      endDate: studyAcademicYear.endDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restStudyAcademicYear: RestStudyAcademicYear): IStudyAcademicYear {
    return {
      ...restStudyAcademicYear,
      fromDate: restStudyAcademicYear.fromDate ? dayjs(restStudyAcademicYear.fromDate) : undefined,
      endDate: restStudyAcademicYear.endDate ? dayjs(restStudyAcademicYear.endDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestStudyAcademicYear>): HttpResponse<IStudyAcademicYear> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestStudyAcademicYear[]>): HttpResponse<IStudyAcademicYear[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
