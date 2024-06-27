import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IQuestionGroup, NewQuestionGroup } from '../question-group.model';

export type PartialUpdateQuestionGroup = Partial<IQuestionGroup> & Pick<IQuestionGroup, 'id'>;

export type EntityResponseType = HttpResponse<IQuestionGroup>;
export type EntityArrayResponseType = HttpResponse<IQuestionGroup[]>;

@Injectable({ providedIn: 'root' })
export class QuestionGroupService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/question-groups');

  create(questionGroup: NewQuestionGroup): Observable<EntityResponseType> {
    return this.http.post<IQuestionGroup>(this.resourceUrl, questionGroup, { observe: 'response' });
  }

  update(questionGroup: IQuestionGroup): Observable<EntityResponseType> {
    return this.http.put<IQuestionGroup>(`${this.resourceUrl}/${this.getQuestionGroupIdentifier(questionGroup)}`, questionGroup, {
      observe: 'response',
    });
  }

  partialUpdate(questionGroup: PartialUpdateQuestionGroup): Observable<EntityResponseType> {
    return this.http.patch<IQuestionGroup>(`${this.resourceUrl}/${this.getQuestionGroupIdentifier(questionGroup)}`, questionGroup, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQuestionGroup>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuestionGroup[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getQuestionGroupIdentifier(questionGroup: Pick<IQuestionGroup, 'id'>): number {
    return questionGroup.id;
  }

  compareQuestionGroup(o1: Pick<IQuestionGroup, 'id'> | null, o2: Pick<IQuestionGroup, 'id'> | null): boolean {
    return o1 && o2 ? this.getQuestionGroupIdentifier(o1) === this.getQuestionGroupIdentifier(o2) : o1 === o2;
  }

  addQuestionGroupToCollectionIfMissing<Type extends Pick<IQuestionGroup, 'id'>>(
    questionGroupCollection: Type[],
    ...questionGroupsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const questionGroups: Type[] = questionGroupsToCheck.filter(isPresent);
    if (questionGroups.length > 0) {
      const questionGroupCollectionIdentifiers = questionGroupCollection.map(questionGroupItem =>
        this.getQuestionGroupIdentifier(questionGroupItem),
      );
      const questionGroupsToAdd = questionGroups.filter(questionGroupItem => {
        const questionGroupIdentifier = this.getQuestionGroupIdentifier(questionGroupItem);
        if (questionGroupCollectionIdentifiers.includes(questionGroupIdentifier)) {
          return false;
        }
        questionGroupCollectionIdentifiers.push(questionGroupIdentifier);
        return true;
      });
      return [...questionGroupsToAdd, ...questionGroupCollection];
    }
    return questionGroupCollection;
  }
}
