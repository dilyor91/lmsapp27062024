import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICommunityAttachment, NewCommunityAttachment } from '../community-attachment.model';

export type PartialUpdateCommunityAttachment = Partial<ICommunityAttachment> & Pick<ICommunityAttachment, 'id'>;

export type EntityResponseType = HttpResponse<ICommunityAttachment>;
export type EntityArrayResponseType = HttpResponse<ICommunityAttachment[]>;

@Injectable({ providedIn: 'root' })
export class CommunityAttachmentService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/community-attachments');

  create(communityAttachment: NewCommunityAttachment): Observable<EntityResponseType> {
    return this.http.post<ICommunityAttachment>(this.resourceUrl, communityAttachment, { observe: 'response' });
  }

  update(communityAttachment: ICommunityAttachment): Observable<EntityResponseType> {
    return this.http.put<ICommunityAttachment>(
      `${this.resourceUrl}/${this.getCommunityAttachmentIdentifier(communityAttachment)}`,
      communityAttachment,
      { observe: 'response' },
    );
  }

  partialUpdate(communityAttachment: PartialUpdateCommunityAttachment): Observable<EntityResponseType> {
    return this.http.patch<ICommunityAttachment>(
      `${this.resourceUrl}/${this.getCommunityAttachmentIdentifier(communityAttachment)}`,
      communityAttachment,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICommunityAttachment>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICommunityAttachment[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCommunityAttachmentIdentifier(communityAttachment: Pick<ICommunityAttachment, 'id'>): number {
    return communityAttachment.id;
  }

  compareCommunityAttachment(o1: Pick<ICommunityAttachment, 'id'> | null, o2: Pick<ICommunityAttachment, 'id'> | null): boolean {
    return o1 && o2 ? this.getCommunityAttachmentIdentifier(o1) === this.getCommunityAttachmentIdentifier(o2) : o1 === o2;
  }

  addCommunityAttachmentToCollectionIfMissing<Type extends Pick<ICommunityAttachment, 'id'>>(
    communityAttachmentCollection: Type[],
    ...communityAttachmentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const communityAttachments: Type[] = communityAttachmentsToCheck.filter(isPresent);
    if (communityAttachments.length > 0) {
      const communityAttachmentCollectionIdentifiers = communityAttachmentCollection.map(communityAttachmentItem =>
        this.getCommunityAttachmentIdentifier(communityAttachmentItem),
      );
      const communityAttachmentsToAdd = communityAttachments.filter(communityAttachmentItem => {
        const communityAttachmentIdentifier = this.getCommunityAttachmentIdentifier(communityAttachmentItem);
        if (communityAttachmentCollectionIdentifiers.includes(communityAttachmentIdentifier)) {
          return false;
        }
        communityAttachmentCollectionIdentifiers.push(communityAttachmentIdentifier);
        return true;
      });
      return [...communityAttachmentsToAdd, ...communityAttachmentCollection];
    }
    return communityAttachmentCollection;
  }
}
