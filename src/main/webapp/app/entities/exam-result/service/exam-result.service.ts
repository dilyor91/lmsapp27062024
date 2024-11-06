import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IExamResult, NewExamResult } from '../exam-result.model';

export type PartialUpdateExamResult = Partial<IExamResult> & Pick<IExamResult, 'id'>;

type RestOf<T extends IExamResult | NewExamResult> = Omit<T, 'gradedDate'> & {
  gradedDate?: string | null;
};

export type RestExamResult = RestOf<IExamResult>;

export type NewRestExamResult = RestOf<NewExamResult>;

export type PartialUpdateRestExamResult = RestOf<PartialUpdateExamResult>;

export type EntityResponseType = HttpResponse<IExamResult>;
export type EntityArrayResponseType = HttpResponse<IExamResult[]>;

@Injectable({ providedIn: 'root' })
export class ExamResultService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/exam-results');

  create(examResult: NewExamResult): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(examResult);
    return this.http
      .post<RestExamResult>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(examResult: IExamResult): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(examResult);
    return this.http
      .put<RestExamResult>(`${this.resourceUrl}/${this.getExamResultIdentifier(examResult)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(examResult: PartialUpdateExamResult): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(examResult);
    return this.http
      .patch<RestExamResult>(`${this.resourceUrl}/${this.getExamResultIdentifier(examResult)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestExamResult>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestExamResult[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getExamResultIdentifier(examResult: Pick<IExamResult, 'id'>): number {
    return examResult.id;
  }

  compareExamResult(o1: Pick<IExamResult, 'id'> | null, o2: Pick<IExamResult, 'id'> | null): boolean {
    return o1 && o2 ? this.getExamResultIdentifier(o1) === this.getExamResultIdentifier(o2) : o1 === o2;
  }

  addExamResultToCollectionIfMissing<Type extends Pick<IExamResult, 'id'>>(
    examResultCollection: Type[],
    ...examResultsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const examResults: Type[] = examResultsToCheck.filter(isPresent);
    if (examResults.length > 0) {
      const examResultCollectionIdentifiers = examResultCollection.map(examResultItem => this.getExamResultIdentifier(examResultItem));
      const examResultsToAdd = examResults.filter(examResultItem => {
        const examResultIdentifier = this.getExamResultIdentifier(examResultItem);
        if (examResultCollectionIdentifiers.includes(examResultIdentifier)) {
          return false;
        }
        examResultCollectionIdentifiers.push(examResultIdentifier);
        return true;
      });
      return [...examResultsToAdd, ...examResultCollection];
    }
    return examResultCollection;
  }

  protected convertDateFromClient<T extends IExamResult | NewExamResult | PartialUpdateExamResult>(examResult: T): RestOf<T> {
    return {
      ...examResult,
      gradedDate: examResult.gradedDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restExamResult: RestExamResult): IExamResult {
    return {
      ...restExamResult,
      gradedDate: restExamResult.gradedDate ? dayjs(restExamResult.gradedDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestExamResult>): HttpResponse<IExamResult> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestExamResult[]>): HttpResponse<IExamResult[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
