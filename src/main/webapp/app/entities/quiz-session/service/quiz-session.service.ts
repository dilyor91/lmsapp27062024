import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IQuizSession, NewQuizSession } from '../quiz-session.model';

export type PartialUpdateQuizSession = Partial<IQuizSession> & Pick<IQuizSession, 'id'>;

type RestOf<T extends IQuizSession | NewQuizSession> = Omit<T, 'startTime' | 'endTime'> & {
  startTime?: string | null;
  endTime?: string | null;
};

export type RestQuizSession = RestOf<IQuizSession>;

export type NewRestQuizSession = RestOf<NewQuizSession>;

export type PartialUpdateRestQuizSession = RestOf<PartialUpdateQuizSession>;

export type EntityResponseType = HttpResponse<IQuizSession>;
export type EntityArrayResponseType = HttpResponse<IQuizSession[]>;

@Injectable({ providedIn: 'root' })
export class QuizSessionService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/quiz-sessions');

  create(quizSession: NewQuizSession): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(quizSession);
    return this.http
      .post<RestQuizSession>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(quizSession: IQuizSession): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(quizSession);
    return this.http
      .put<RestQuizSession>(`${this.resourceUrl}/${this.getQuizSessionIdentifier(quizSession)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(quizSession: PartialUpdateQuizSession): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(quizSession);
    return this.http
      .patch<RestQuizSession>(`${this.resourceUrl}/${this.getQuizSessionIdentifier(quizSession)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestQuizSession>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestQuizSession[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getQuizSessionIdentifier(quizSession: Pick<IQuizSession, 'id'>): number {
    return quizSession.id;
  }

  compareQuizSession(o1: Pick<IQuizSession, 'id'> | null, o2: Pick<IQuizSession, 'id'> | null): boolean {
    return o1 && o2 ? this.getQuizSessionIdentifier(o1) === this.getQuizSessionIdentifier(o2) : o1 === o2;
  }

  addQuizSessionToCollectionIfMissing<Type extends Pick<IQuizSession, 'id'>>(
    quizSessionCollection: Type[],
    ...quizSessionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const quizSessions: Type[] = quizSessionsToCheck.filter(isPresent);
    if (quizSessions.length > 0) {
      const quizSessionCollectionIdentifiers = quizSessionCollection.map(quizSessionItem => this.getQuizSessionIdentifier(quizSessionItem));
      const quizSessionsToAdd = quizSessions.filter(quizSessionItem => {
        const quizSessionIdentifier = this.getQuizSessionIdentifier(quizSessionItem);
        if (quizSessionCollectionIdentifiers.includes(quizSessionIdentifier)) {
          return false;
        }
        quizSessionCollectionIdentifiers.push(quizSessionIdentifier);
        return true;
      });
      return [...quizSessionsToAdd, ...quizSessionCollection];
    }
    return quizSessionCollection;
  }

  protected convertDateFromClient<T extends IQuizSession | NewQuizSession | PartialUpdateQuizSession>(quizSession: T): RestOf<T> {
    return {
      ...quizSession,
      startTime: quizSession.startTime?.toJSON() ?? null,
      endTime: quizSession.endTime?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restQuizSession: RestQuizSession): IQuizSession {
    return {
      ...restQuizSession,
      startTime: restQuizSession.startTime ? dayjs(restQuizSession.startTime) : undefined,
      endTime: restQuizSession.endTime ? dayjs(restQuizSession.endTime) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestQuizSession>): HttpResponse<IQuizSession> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestQuizSession[]>): HttpResponse<IQuizSession[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
