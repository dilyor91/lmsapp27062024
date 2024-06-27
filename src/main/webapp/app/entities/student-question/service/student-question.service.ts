import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStudentQuestion, NewStudentQuestion } from '../student-question.model';

export type PartialUpdateStudentQuestion = Partial<IStudentQuestion> & Pick<IStudentQuestion, 'id'>;

export type EntityResponseType = HttpResponse<IStudentQuestion>;
export type EntityArrayResponseType = HttpResponse<IStudentQuestion[]>;

@Injectable({ providedIn: 'root' })
export class StudentQuestionService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/student-questions');

  create(studentQuestion: NewStudentQuestion): Observable<EntityResponseType> {
    return this.http.post<IStudentQuestion>(this.resourceUrl, studentQuestion, { observe: 'response' });
  }

  update(studentQuestion: IStudentQuestion): Observable<EntityResponseType> {
    return this.http.put<IStudentQuestion>(`${this.resourceUrl}/${this.getStudentQuestionIdentifier(studentQuestion)}`, studentQuestion, {
      observe: 'response',
    });
  }

  partialUpdate(studentQuestion: PartialUpdateStudentQuestion): Observable<EntityResponseType> {
    return this.http.patch<IStudentQuestion>(`${this.resourceUrl}/${this.getStudentQuestionIdentifier(studentQuestion)}`, studentQuestion, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStudentQuestion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStudentQuestion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getStudentQuestionIdentifier(studentQuestion: Pick<IStudentQuestion, 'id'>): number {
    return studentQuestion.id;
  }

  compareStudentQuestion(o1: Pick<IStudentQuestion, 'id'> | null, o2: Pick<IStudentQuestion, 'id'> | null): boolean {
    return o1 && o2 ? this.getStudentQuestionIdentifier(o1) === this.getStudentQuestionIdentifier(o2) : o1 === o2;
  }

  addStudentQuestionToCollectionIfMissing<Type extends Pick<IStudentQuestion, 'id'>>(
    studentQuestionCollection: Type[],
    ...studentQuestionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const studentQuestions: Type[] = studentQuestionsToCheck.filter(isPresent);
    if (studentQuestions.length > 0) {
      const studentQuestionCollectionIdentifiers = studentQuestionCollection.map(studentQuestionItem =>
        this.getStudentQuestionIdentifier(studentQuestionItem),
      );
      const studentQuestionsToAdd = studentQuestions.filter(studentQuestionItem => {
        const studentQuestionIdentifier = this.getStudentQuestionIdentifier(studentQuestionItem);
        if (studentQuestionCollectionIdentifiers.includes(studentQuestionIdentifier)) {
          return false;
        }
        studentQuestionCollectionIdentifiers.push(studentQuestionIdentifier);
        return true;
      });
      return [...studentQuestionsToAdd, ...studentQuestionCollection];
    }
    return studentQuestionCollection;
  }
}
