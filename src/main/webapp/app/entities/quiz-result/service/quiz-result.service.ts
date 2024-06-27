import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IQuizResult, NewQuizResult } from '../quiz-result.model';

export type PartialUpdateQuizResult = Partial<IQuizResult> & Pick<IQuizResult, 'id'>;

export type EntityResponseType = HttpResponse<IQuizResult>;
export type EntityArrayResponseType = HttpResponse<IQuizResult[]>;

@Injectable({ providedIn: 'root' })
export class QuizResultService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/quiz-results');

  create(quizResult: NewQuizResult): Observable<EntityResponseType> {
    return this.http.post<IQuizResult>(this.resourceUrl, quizResult, { observe: 'response' });
  }

  update(quizResult: IQuizResult): Observable<EntityResponseType> {
    return this.http.put<IQuizResult>(`${this.resourceUrl}/${this.getQuizResultIdentifier(quizResult)}`, quizResult, {
      observe: 'response',
    });
  }

  partialUpdate(quizResult: PartialUpdateQuizResult): Observable<EntityResponseType> {
    return this.http.patch<IQuizResult>(`${this.resourceUrl}/${this.getQuizResultIdentifier(quizResult)}`, quizResult, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQuizResult>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuizResult[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getQuizResultIdentifier(quizResult: Pick<IQuizResult, 'id'>): number {
    return quizResult.id;
  }

  compareQuizResult(o1: Pick<IQuizResult, 'id'> | null, o2: Pick<IQuizResult, 'id'> | null): boolean {
    return o1 && o2 ? this.getQuizResultIdentifier(o1) === this.getQuizResultIdentifier(o2) : o1 === o2;
  }

  addQuizResultToCollectionIfMissing<Type extends Pick<IQuizResult, 'id'>>(
    quizResultCollection: Type[],
    ...quizResultsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const quizResults: Type[] = quizResultsToCheck.filter(isPresent);
    if (quizResults.length > 0) {
      const quizResultCollectionIdentifiers = quizResultCollection.map(quizResultItem => this.getQuizResultIdentifier(quizResultItem));
      const quizResultsToAdd = quizResults.filter(quizResultItem => {
        const quizResultIdentifier = this.getQuizResultIdentifier(quizResultItem);
        if (quizResultCollectionIdentifiers.includes(quizResultIdentifier)) {
          return false;
        }
        quizResultCollectionIdentifiers.push(quizResultIdentifier);
        return true;
      });
      return [...quizResultsToAdd, ...quizResultCollection];
    }
    return quizResultCollection;
  }
}
