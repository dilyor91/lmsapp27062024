import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IQuizQuestionGroup, NewQuizQuestionGroup } from '../quiz-question-group.model';

export type PartialUpdateQuizQuestionGroup = Partial<IQuizQuestionGroup> & Pick<IQuizQuestionGroup, 'id'>;

export type EntityResponseType = HttpResponse<IQuizQuestionGroup>;
export type EntityArrayResponseType = HttpResponse<IQuizQuestionGroup[]>;

@Injectable({ providedIn: 'root' })
export class QuizQuestionGroupService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/quiz-question-groups');

  create(quizQuestionGroup: NewQuizQuestionGroup): Observable<EntityResponseType> {
    return this.http.post<IQuizQuestionGroup>(this.resourceUrl, quizQuestionGroup, { observe: 'response' });
  }

  update(quizQuestionGroup: IQuizQuestionGroup): Observable<EntityResponseType> {
    return this.http.put<IQuizQuestionGroup>(
      `${this.resourceUrl}/${this.getQuizQuestionGroupIdentifier(quizQuestionGroup)}`,
      quizQuestionGroup,
      { observe: 'response' },
    );
  }

  partialUpdate(quizQuestionGroup: PartialUpdateQuizQuestionGroup): Observable<EntityResponseType> {
    return this.http.patch<IQuizQuestionGroup>(
      `${this.resourceUrl}/${this.getQuizQuestionGroupIdentifier(quizQuestionGroup)}`,
      quizQuestionGroup,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQuizQuestionGroup>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuizQuestionGroup[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getQuizQuestionGroupIdentifier(quizQuestionGroup: Pick<IQuizQuestionGroup, 'id'>): number {
    return quizQuestionGroup.id;
  }

  compareQuizQuestionGroup(o1: Pick<IQuizQuestionGroup, 'id'> | null, o2: Pick<IQuizQuestionGroup, 'id'> | null): boolean {
    return o1 && o2 ? this.getQuizQuestionGroupIdentifier(o1) === this.getQuizQuestionGroupIdentifier(o2) : o1 === o2;
  }

  addQuizQuestionGroupToCollectionIfMissing<Type extends Pick<IQuizQuestionGroup, 'id'>>(
    quizQuestionGroupCollection: Type[],
    ...quizQuestionGroupsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const quizQuestionGroups: Type[] = quizQuestionGroupsToCheck.filter(isPresent);
    if (quizQuestionGroups.length > 0) {
      const quizQuestionGroupCollectionIdentifiers = quizQuestionGroupCollection.map(quizQuestionGroupItem =>
        this.getQuizQuestionGroupIdentifier(quizQuestionGroupItem),
      );
      const quizQuestionGroupsToAdd = quizQuestionGroups.filter(quizQuestionGroupItem => {
        const quizQuestionGroupIdentifier = this.getQuizQuestionGroupIdentifier(quizQuestionGroupItem);
        if (quizQuestionGroupCollectionIdentifiers.includes(quizQuestionGroupIdentifier)) {
          return false;
        }
        quizQuestionGroupCollectionIdentifiers.push(quizQuestionGroupIdentifier);
        return true;
      });
      return [...quizQuestionGroupsToAdd, ...quizQuestionGroupCollection];
    }
    return quizQuestionGroupCollection;
  }
}
