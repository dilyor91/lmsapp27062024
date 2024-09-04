import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAnnouncementCourseSection, NewAnnouncementCourseSection } from '../announcement-course-section.model';

export type PartialUpdateAnnouncementCourseSection = Partial<IAnnouncementCourseSection> & Pick<IAnnouncementCourseSection, 'id'>;

export type EntityResponseType = HttpResponse<IAnnouncementCourseSection>;
export type EntityArrayResponseType = HttpResponse<IAnnouncementCourseSection[]>;

@Injectable({ providedIn: 'root' })
export class AnnouncementCourseSectionService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/announcement-course-sections');

  create(announcementCourseSection: NewAnnouncementCourseSection): Observable<EntityResponseType> {
    return this.http.post<IAnnouncementCourseSection>(this.resourceUrl, announcementCourseSection, { observe: 'response' });
  }

  update(announcementCourseSection: IAnnouncementCourseSection): Observable<EntityResponseType> {
    return this.http.put<IAnnouncementCourseSection>(
      `${this.resourceUrl}/${this.getAnnouncementCourseSectionIdentifier(announcementCourseSection)}`,
      announcementCourseSection,
      { observe: 'response' },
    );
  }

  partialUpdate(announcementCourseSection: PartialUpdateAnnouncementCourseSection): Observable<EntityResponseType> {
    return this.http.patch<IAnnouncementCourseSection>(
      `${this.resourceUrl}/${this.getAnnouncementCourseSectionIdentifier(announcementCourseSection)}`,
      announcementCourseSection,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAnnouncementCourseSection>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAnnouncementCourseSection[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAnnouncementCourseSectionIdentifier(announcementCourseSection: Pick<IAnnouncementCourseSection, 'id'>): number {
    return announcementCourseSection.id;
  }

  compareAnnouncementCourseSection(
    o1: Pick<IAnnouncementCourseSection, 'id'> | null,
    o2: Pick<IAnnouncementCourseSection, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getAnnouncementCourseSectionIdentifier(o1) === this.getAnnouncementCourseSectionIdentifier(o2) : o1 === o2;
  }

  addAnnouncementCourseSectionToCollectionIfMissing<Type extends Pick<IAnnouncementCourseSection, 'id'>>(
    announcementCourseSectionCollection: Type[],
    ...announcementCourseSectionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const announcementCourseSections: Type[] = announcementCourseSectionsToCheck.filter(isPresent);
    if (announcementCourseSections.length > 0) {
      const announcementCourseSectionCollectionIdentifiers = announcementCourseSectionCollection.map(announcementCourseSectionItem =>
        this.getAnnouncementCourseSectionIdentifier(announcementCourseSectionItem),
      );
      const announcementCourseSectionsToAdd = announcementCourseSections.filter(announcementCourseSectionItem => {
        const announcementCourseSectionIdentifier = this.getAnnouncementCourseSectionIdentifier(announcementCourseSectionItem);
        if (announcementCourseSectionCollectionIdentifiers.includes(announcementCourseSectionIdentifier)) {
          return false;
        }
        announcementCourseSectionCollectionIdentifiers.push(announcementCourseSectionIdentifier);
        return true;
      });
      return [...announcementCourseSectionsToAdd, ...announcementCourseSectionCollection];
    }
    return announcementCourseSectionCollection;
  }
}
