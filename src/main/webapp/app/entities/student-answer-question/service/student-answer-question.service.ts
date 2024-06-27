import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStudentAnswerQuestion, NewStudentAnswerQuestion } from '../student-answer-question.model';

export type PartialUpdateStudentAnswerQuestion = Partial<IStudentAnswerQuestion> & Pick<IStudentAnswerQuestion, 'id'>;

export type EntityResponseType = HttpResponse<IStudentAnswerQuestion>;
export type EntityArrayResponseType = HttpResponse<IStudentAnswerQuestion[]>;

@Injectable({ providedIn: 'root' })
export class StudentAnswerQuestionService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/student-answer-questions');

  create(studentAnswerQuestion: NewStudentAnswerQuestion): Observable<EntityResponseType> {
    return this.http.post<IStudentAnswerQuestion>(this.resourceUrl, studentAnswerQuestion, { observe: 'response' });
  }

  update(studentAnswerQuestion: IStudentAnswerQuestion): Observable<EntityResponseType> {
    return this.http.put<IStudentAnswerQuestion>(
      `${this.resourceUrl}/${this.getStudentAnswerQuestionIdentifier(studentAnswerQuestion)}`,
      studentAnswerQuestion,
      { observe: 'response' },
    );
  }

  partialUpdate(studentAnswerQuestion: PartialUpdateStudentAnswerQuestion): Observable<EntityResponseType> {
    return this.http.patch<IStudentAnswerQuestion>(
      `${this.resourceUrl}/${this.getStudentAnswerQuestionIdentifier(studentAnswerQuestion)}`,
      studentAnswerQuestion,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStudentAnswerQuestion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStudentAnswerQuestion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getStudentAnswerQuestionIdentifier(studentAnswerQuestion: Pick<IStudentAnswerQuestion, 'id'>): number {
    return studentAnswerQuestion.id;
  }

  compareStudentAnswerQuestion(o1: Pick<IStudentAnswerQuestion, 'id'> | null, o2: Pick<IStudentAnswerQuestion, 'id'> | null): boolean {
    return o1 && o2 ? this.getStudentAnswerQuestionIdentifier(o1) === this.getStudentAnswerQuestionIdentifier(o2) : o1 === o2;
  }

  addStudentAnswerQuestionToCollectionIfMissing<Type extends Pick<IStudentAnswerQuestion, 'id'>>(
    studentAnswerQuestionCollection: Type[],
    ...studentAnswerQuestionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const studentAnswerQuestions: Type[] = studentAnswerQuestionsToCheck.filter(isPresent);
    if (studentAnswerQuestions.length > 0) {
      const studentAnswerQuestionCollectionIdentifiers = studentAnswerQuestionCollection.map(studentAnswerQuestionItem =>
        this.getStudentAnswerQuestionIdentifier(studentAnswerQuestionItem),
      );
      const studentAnswerQuestionsToAdd = studentAnswerQuestions.filter(studentAnswerQuestionItem => {
        const studentAnswerQuestionIdentifier = this.getStudentAnswerQuestionIdentifier(studentAnswerQuestionItem);
        if (studentAnswerQuestionCollectionIdentifiers.includes(studentAnswerQuestionIdentifier)) {
          return false;
        }
        studentAnswerQuestionCollectionIdentifiers.push(studentAnswerQuestionIdentifier);
        return true;
      });
      return [...studentAnswerQuestionsToAdd, ...studentAnswerQuestionCollection];
    }
    return studentAnswerQuestionCollection;
  }
}
