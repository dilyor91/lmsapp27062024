import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAssignmentCourseSection, NewAssignmentCourseSection } from '../assignment-course-section.model';

export type PartialUpdateAssignmentCourseSection = Partial<IAssignmentCourseSection> & Pick<IAssignmentCourseSection, 'id'>;

type RestOf<T extends IAssignmentCourseSection | NewAssignmentCourseSection> = Omit<T, 'startDate' | 'endDate'> & {
  startDate?: string | null;
  endDate?: string | null;
};

export type RestAssignmentCourseSection = RestOf<IAssignmentCourseSection>;

export type NewRestAssignmentCourseSection = RestOf<NewAssignmentCourseSection>;

export type PartialUpdateRestAssignmentCourseSection = RestOf<PartialUpdateAssignmentCourseSection>;

export type EntityResponseType = HttpResponse<IAssignmentCourseSection>;
export type EntityArrayResponseType = HttpResponse<IAssignmentCourseSection[]>;

@Injectable({ providedIn: 'root' })
export class AssignmentCourseSectionService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/assignment-course-sections');

  create(assignmentCourseSection: NewAssignmentCourseSection): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(assignmentCourseSection);
    return this.http
      .post<RestAssignmentCourseSection>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(assignmentCourseSection: IAssignmentCourseSection): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(assignmentCourseSection);
    return this.http
      .put<RestAssignmentCourseSection>(`${this.resourceUrl}/${this.getAssignmentCourseSectionIdentifier(assignmentCourseSection)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(assignmentCourseSection: PartialUpdateAssignmentCourseSection): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(assignmentCourseSection);
    return this.http
      .patch<RestAssignmentCourseSection>(
        `${this.resourceUrl}/${this.getAssignmentCourseSectionIdentifier(assignmentCourseSection)}`,
        copy,
        { observe: 'response' },
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAssignmentCourseSection>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAssignmentCourseSection[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAssignmentCourseSectionIdentifier(assignmentCourseSection: Pick<IAssignmentCourseSection, 'id'>): number {
    return assignmentCourseSection.id;
  }

  compareAssignmentCourseSection(
    o1: Pick<IAssignmentCourseSection, 'id'> | null,
    o2: Pick<IAssignmentCourseSection, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getAssignmentCourseSectionIdentifier(o1) === this.getAssignmentCourseSectionIdentifier(o2) : o1 === o2;
  }

  addAssignmentCourseSectionToCollectionIfMissing<Type extends Pick<IAssignmentCourseSection, 'id'>>(
    assignmentCourseSectionCollection: Type[],
    ...assignmentCourseSectionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const assignmentCourseSections: Type[] = assignmentCourseSectionsToCheck.filter(isPresent);
    if (assignmentCourseSections.length > 0) {
      const assignmentCourseSectionCollectionIdentifiers = assignmentCourseSectionCollection.map(assignmentCourseSectionItem =>
        this.getAssignmentCourseSectionIdentifier(assignmentCourseSectionItem),
      );
      const assignmentCourseSectionsToAdd = assignmentCourseSections.filter(assignmentCourseSectionItem => {
        const assignmentCourseSectionIdentifier = this.getAssignmentCourseSectionIdentifier(assignmentCourseSectionItem);
        if (assignmentCourseSectionCollectionIdentifiers.includes(assignmentCourseSectionIdentifier)) {
          return false;
        }
        assignmentCourseSectionCollectionIdentifiers.push(assignmentCourseSectionIdentifier);
        return true;
      });
      return [...assignmentCourseSectionsToAdd, ...assignmentCourseSectionCollection];
    }
    return assignmentCourseSectionCollection;
  }

  protected convertDateFromClient<T extends IAssignmentCourseSection | NewAssignmentCourseSection | PartialUpdateAssignmentCourseSection>(
    assignmentCourseSection: T,
  ): RestOf<T> {
    return {
      ...assignmentCourseSection,
      startDate: assignmentCourseSection.startDate?.toJSON() ?? null,
      endDate: assignmentCourseSection.endDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restAssignmentCourseSection: RestAssignmentCourseSection): IAssignmentCourseSection {
    return {
      ...restAssignmentCourseSection,
      startDate: restAssignmentCourseSection.startDate ? dayjs(restAssignmentCourseSection.startDate) : undefined,
      endDate: restAssignmentCourseSection.endDate ? dayjs(restAssignmentCourseSection.endDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAssignmentCourseSection>): HttpResponse<IAssignmentCourseSection> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAssignmentCourseSection[]>): HttpResponse<IAssignmentCourseSection[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
