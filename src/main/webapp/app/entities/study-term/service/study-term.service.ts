import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStudyTerm, NewStudyTerm } from '../study-term.model';

export type PartialUpdateStudyTerm = Partial<IStudyTerm> & Pick<IStudyTerm, 'id'>;

type RestOf<T extends IStudyTerm | NewStudyTerm> = Omit<T, 'startDate' | 'endDate'> & {
  startDate?: string | null;
  endDate?: string | null;
};

export type RestStudyTerm = RestOf<IStudyTerm>;

export type NewRestStudyTerm = RestOf<NewStudyTerm>;

export type PartialUpdateRestStudyTerm = RestOf<PartialUpdateStudyTerm>;

export type EntityResponseType = HttpResponse<IStudyTerm>;
export type EntityArrayResponseType = HttpResponse<IStudyTerm[]>;

@Injectable({ providedIn: 'root' })
export class StudyTermService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/study-terms');

  create(studyTerm: NewStudyTerm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(studyTerm);
    return this.http
      .post<RestStudyTerm>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(studyTerm: IStudyTerm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(studyTerm);
    return this.http
      .put<RestStudyTerm>(`${this.resourceUrl}/${this.getStudyTermIdentifier(studyTerm)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(studyTerm: PartialUpdateStudyTerm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(studyTerm);
    return this.http
      .patch<RestStudyTerm>(`${this.resourceUrl}/${this.getStudyTermIdentifier(studyTerm)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestStudyTerm>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestStudyTerm[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getStudyTermIdentifier(studyTerm: Pick<IStudyTerm, 'id'>): number {
    return studyTerm.id;
  }

  compareStudyTerm(o1: Pick<IStudyTerm, 'id'> | null, o2: Pick<IStudyTerm, 'id'> | null): boolean {
    return o1 && o2 ? this.getStudyTermIdentifier(o1) === this.getStudyTermIdentifier(o2) : o1 === o2;
  }

  addStudyTermToCollectionIfMissing<Type extends Pick<IStudyTerm, 'id'>>(
    studyTermCollection: Type[],
    ...studyTermsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const studyTerms: Type[] = studyTermsToCheck.filter(isPresent);
    if (studyTerms.length > 0) {
      const studyTermCollectionIdentifiers = studyTermCollection.map(studyTermItem => this.getStudyTermIdentifier(studyTermItem));
      const studyTermsToAdd = studyTerms.filter(studyTermItem => {
        const studyTermIdentifier = this.getStudyTermIdentifier(studyTermItem);
        if (studyTermCollectionIdentifiers.includes(studyTermIdentifier)) {
          return false;
        }
        studyTermCollectionIdentifiers.push(studyTermIdentifier);
        return true;
      });
      return [...studyTermsToAdd, ...studyTermCollection];
    }
    return studyTermCollection;
  }

  protected convertDateFromClient<T extends IStudyTerm | NewStudyTerm | PartialUpdateStudyTerm>(studyTerm: T): RestOf<T> {
    return {
      ...studyTerm,
      startDate: studyTerm.startDate?.toJSON() ?? null,
      endDate: studyTerm.endDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restStudyTerm: RestStudyTerm): IStudyTerm {
    return {
      ...restStudyTerm,
      startDate: restStudyTerm.startDate ? dayjs(restStudyTerm.startDate) : undefined,
      endDate: restStudyTerm.endDate ? dayjs(restStudyTerm.endDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestStudyTerm>): HttpResponse<IStudyTerm> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestStudyTerm[]>): HttpResponse<IStudyTerm[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
