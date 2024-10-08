import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICommunityCourse, NewCommunityCourse } from '../community-course.model';

export type PartialUpdateCommunityCourse = Partial<ICommunityCourse> & Pick<ICommunityCourse, 'id'>;

export type EntityResponseType = HttpResponse<ICommunityCourse>;
export type EntityArrayResponseType = HttpResponse<ICommunityCourse[]>;

@Injectable({ providedIn: 'root' })
export class CommunityCourseService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/community-courses');

  create(communityCourse: NewCommunityCourse): Observable<EntityResponseType> {
    return this.http.post<ICommunityCourse>(this.resourceUrl, communityCourse, { observe: 'response' });
  }

  update(communityCourse: ICommunityCourse): Observable<EntityResponseType> {
    return this.http.put<ICommunityCourse>(`${this.resourceUrl}/${this.getCommunityCourseIdentifier(communityCourse)}`, communityCourse, {
      observe: 'response',
    });
  }

  partialUpdate(communityCourse: PartialUpdateCommunityCourse): Observable<EntityResponseType> {
    return this.http.patch<ICommunityCourse>(`${this.resourceUrl}/${this.getCommunityCourseIdentifier(communityCourse)}`, communityCourse, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICommunityCourse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICommunityCourse[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCommunityCourseIdentifier(communityCourse: Pick<ICommunityCourse, 'id'>): number {
    return communityCourse.id;
  }

  compareCommunityCourse(o1: Pick<ICommunityCourse, 'id'> | null, o2: Pick<ICommunityCourse, 'id'> | null): boolean {
    return o1 && o2 ? this.getCommunityCourseIdentifier(o1) === this.getCommunityCourseIdentifier(o2) : o1 === o2;
  }

  addCommunityCourseToCollectionIfMissing<Type extends Pick<ICommunityCourse, 'id'>>(
    communityCourseCollection: Type[],
    ...communityCoursesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const communityCourses: Type[] = communityCoursesToCheck.filter(isPresent);
    if (communityCourses.length > 0) {
      const communityCourseCollectionIdentifiers = communityCourseCollection.map(communityCourseItem =>
        this.getCommunityCourseIdentifier(communityCourseItem),
      );
      const communityCoursesToAdd = communityCourses.filter(communityCourseItem => {
        const communityCourseIdentifier = this.getCommunityCourseIdentifier(communityCourseItem);
        if (communityCourseCollectionIdentifiers.includes(communityCourseIdentifier)) {
          return false;
        }
        communityCourseCollectionIdentifiers.push(communityCourseIdentifier);
        return true;
      });
      return [...communityCoursesToAdd, ...communityCourseCollection];
    }
    return communityCourseCollection;
  }
}
