import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICommunityTag, NewCommunityTag } from '../community-tag.model';

export type PartialUpdateCommunityTag = Partial<ICommunityTag> & Pick<ICommunityTag, 'id'>;

export type EntityResponseType = HttpResponse<ICommunityTag>;
export type EntityArrayResponseType = HttpResponse<ICommunityTag[]>;

@Injectable({ providedIn: 'root' })
export class CommunityTagService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/community-tags');

  create(communityTag: NewCommunityTag): Observable<EntityResponseType> {
    return this.http.post<ICommunityTag>(this.resourceUrl, communityTag, { observe: 'response' });
  }

  update(communityTag: ICommunityTag): Observable<EntityResponseType> {
    return this.http.put<ICommunityTag>(`${this.resourceUrl}/${this.getCommunityTagIdentifier(communityTag)}`, communityTag, {
      observe: 'response',
    });
  }

  partialUpdate(communityTag: PartialUpdateCommunityTag): Observable<EntityResponseType> {
    return this.http.patch<ICommunityTag>(`${this.resourceUrl}/${this.getCommunityTagIdentifier(communityTag)}`, communityTag, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICommunityTag>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICommunityTag[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCommunityTagIdentifier(communityTag: Pick<ICommunityTag, 'id'>): number {
    return communityTag.id;
  }

  compareCommunityTag(o1: Pick<ICommunityTag, 'id'> | null, o2: Pick<ICommunityTag, 'id'> | null): boolean {
    return o1 && o2 ? this.getCommunityTagIdentifier(o1) === this.getCommunityTagIdentifier(o2) : o1 === o2;
  }

  addCommunityTagToCollectionIfMissing<Type extends Pick<ICommunityTag, 'id'>>(
    communityTagCollection: Type[],
    ...communityTagsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const communityTags: Type[] = communityTagsToCheck.filter(isPresent);
    if (communityTags.length > 0) {
      const communityTagCollectionIdentifiers = communityTagCollection.map(communityTagItem =>
        this.getCommunityTagIdentifier(communityTagItem),
      );
      const communityTagsToAdd = communityTags.filter(communityTagItem => {
        const communityTagIdentifier = this.getCommunityTagIdentifier(communityTagItem);
        if (communityTagCollectionIdentifiers.includes(communityTagIdentifier)) {
          return false;
        }
        communityTagCollectionIdentifiers.push(communityTagIdentifier);
        return true;
      });
      return [...communityTagsToAdd, ...communityTagCollection];
    }
    return communityTagCollection;
  }
}
