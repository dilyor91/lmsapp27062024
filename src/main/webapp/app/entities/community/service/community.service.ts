import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICommunity, NewCommunity } from '../community.model';

export type PartialUpdateCommunity = Partial<ICommunity> & Pick<ICommunity, 'id'>;

export type EntityResponseType = HttpResponse<ICommunity>;
export type EntityArrayResponseType = HttpResponse<ICommunity[]>;

@Injectable({ providedIn: 'root' })
export class CommunityService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/communities');

  create(community: NewCommunity): Observable<EntityResponseType> {
    return this.http.post<ICommunity>(this.resourceUrl, community, { observe: 'response' });
  }

  update(community: ICommunity): Observable<EntityResponseType> {
    return this.http.put<ICommunity>(`${this.resourceUrl}/${this.getCommunityIdentifier(community)}`, community, { observe: 'response' });
  }

  partialUpdate(community: PartialUpdateCommunity): Observable<EntityResponseType> {
    return this.http.patch<ICommunity>(`${this.resourceUrl}/${this.getCommunityIdentifier(community)}`, community, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICommunity>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICommunity[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCommunityIdentifier(community: Pick<ICommunity, 'id'>): number {
    return community.id;
  }

  compareCommunity(o1: Pick<ICommunity, 'id'> | null, o2: Pick<ICommunity, 'id'> | null): boolean {
    return o1 && o2 ? this.getCommunityIdentifier(o1) === this.getCommunityIdentifier(o2) : o1 === o2;
  }

  addCommunityToCollectionIfMissing<Type extends Pick<ICommunity, 'id'>>(
    communityCollection: Type[],
    ...communitiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const communities: Type[] = communitiesToCheck.filter(isPresent);
    if (communities.length > 0) {
      const communityCollectionIdentifiers = communityCollection.map(communityItem => this.getCommunityIdentifier(communityItem));
      const communitiesToAdd = communities.filter(communityItem => {
        const communityIdentifier = this.getCommunityIdentifier(communityItem);
        if (communityCollectionIdentifiers.includes(communityIdentifier)) {
          return false;
        }
        communityCollectionIdentifiers.push(communityIdentifier);
        return true;
      });
      return [...communitiesToAdd, ...communityCollection];
    }
    return communityCollection;
  }
}
