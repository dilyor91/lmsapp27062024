import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IQuizCourseSection, NewQuizCourseSection } from '../quiz-course-section.model';

export type PartialUpdateQuizCourseSection = Partial<IQuizCourseSection> & Pick<IQuizCourseSection, 'id'>;

type RestOf<T extends IQuizCourseSection | NewQuizCourseSection> = Omit<T, 'startDate' | 'endDate'> & {
  startDate?: string | null;
  endDate?: string | null;
};

export type RestQuizCourseSection = RestOf<IQuizCourseSection>;

export type NewRestQuizCourseSection = RestOf<NewQuizCourseSection>;

export type PartialUpdateRestQuizCourseSection = RestOf<PartialUpdateQuizCourseSection>;

export type EntityResponseType = HttpResponse<IQuizCourseSection>;
export type EntityArrayResponseType = HttpResponse<IQuizCourseSection[]>;

@Injectable({ providedIn: 'root' })
export class QuizCourseSectionService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/quiz-course-sections');

  create(quizCourseSection: NewQuizCourseSection): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(quizCourseSection);
    return this.http
      .post<RestQuizCourseSection>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(quizCourseSection: IQuizCourseSection): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(quizCourseSection);
    return this.http
      .put<RestQuizCourseSection>(`${this.resourceUrl}/${this.getQuizCourseSectionIdentifier(quizCourseSection)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(quizCourseSection: PartialUpdateQuizCourseSection): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(quizCourseSection);
    return this.http
      .patch<RestQuizCourseSection>(`${this.resourceUrl}/${this.getQuizCourseSectionIdentifier(quizCourseSection)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestQuizCourseSection>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestQuizCourseSection[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getQuizCourseSectionIdentifier(quizCourseSection: Pick<IQuizCourseSection, 'id'>): number {
    return quizCourseSection.id;
  }

  compareQuizCourseSection(o1: Pick<IQuizCourseSection, 'id'> | null, o2: Pick<IQuizCourseSection, 'id'> | null): boolean {
    return o1 && o2 ? this.getQuizCourseSectionIdentifier(o1) === this.getQuizCourseSectionIdentifier(o2) : o1 === o2;
  }

  addQuizCourseSectionToCollectionIfMissing<Type extends Pick<IQuizCourseSection, 'id'>>(
    quizCourseSectionCollection: Type[],
    ...quizCourseSectionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const quizCourseSections: Type[] = quizCourseSectionsToCheck.filter(isPresent);
    if (quizCourseSections.length > 0) {
      const quizCourseSectionCollectionIdentifiers = quizCourseSectionCollection.map(quizCourseSectionItem =>
        this.getQuizCourseSectionIdentifier(quizCourseSectionItem),
      );
      const quizCourseSectionsToAdd = quizCourseSections.filter(quizCourseSectionItem => {
        const quizCourseSectionIdentifier = this.getQuizCourseSectionIdentifier(quizCourseSectionItem);
        if (quizCourseSectionCollectionIdentifiers.includes(quizCourseSectionIdentifier)) {
          return false;
        }
        quizCourseSectionCollectionIdentifiers.push(quizCourseSectionIdentifier);
        return true;
      });
      return [...quizCourseSectionsToAdd, ...quizCourseSectionCollection];
    }
    return quizCourseSectionCollection;
  }

  protected convertDateFromClient<T extends IQuizCourseSection | NewQuizCourseSection | PartialUpdateQuizCourseSection>(
    quizCourseSection: T,
  ): RestOf<T> {
    return {
      ...quizCourseSection,
      startDate: quizCourseSection.startDate?.toJSON() ?? null,
      endDate: quizCourseSection.endDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restQuizCourseSection: RestQuizCourseSection): IQuizCourseSection {
    return {
      ...restQuizCourseSection,
      startDate: restQuizCourseSection.startDate ? dayjs(restQuizCourseSection.startDate) : undefined,
      endDate: restQuizCourseSection.endDate ? dayjs(restQuizCourseSection.endDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestQuizCourseSection>): HttpResponse<IQuizCourseSection> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestQuizCourseSection[]>): HttpResponse<IQuizCourseSection[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
