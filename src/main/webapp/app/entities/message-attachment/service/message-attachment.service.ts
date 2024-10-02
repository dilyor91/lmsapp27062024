import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMessageAttachment, NewMessageAttachment } from '../message-attachment.model';

export type PartialUpdateMessageAttachment = Partial<IMessageAttachment> & Pick<IMessageAttachment, 'id'>;

export type EntityResponseType = HttpResponse<IMessageAttachment>;
export type EntityArrayResponseType = HttpResponse<IMessageAttachment[]>;

@Injectable({ providedIn: 'root' })
export class MessageAttachmentService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/message-attachments');

  create(messageAttachment: NewMessageAttachment): Observable<EntityResponseType> {
    return this.http.post<IMessageAttachment>(this.resourceUrl, messageAttachment, { observe: 'response' });
  }

  update(messageAttachment: IMessageAttachment): Observable<EntityResponseType> {
    return this.http.put<IMessageAttachment>(
      `${this.resourceUrl}/${this.getMessageAttachmentIdentifier(messageAttachment)}`,
      messageAttachment,
      { observe: 'response' },
    );
  }

  partialUpdate(messageAttachment: PartialUpdateMessageAttachment): Observable<EntityResponseType> {
    return this.http.patch<IMessageAttachment>(
      `${this.resourceUrl}/${this.getMessageAttachmentIdentifier(messageAttachment)}`,
      messageAttachment,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMessageAttachment>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMessageAttachment[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMessageAttachmentIdentifier(messageAttachment: Pick<IMessageAttachment, 'id'>): number {
    return messageAttachment.id;
  }

  compareMessageAttachment(o1: Pick<IMessageAttachment, 'id'> | null, o2: Pick<IMessageAttachment, 'id'> | null): boolean {
    return o1 && o2 ? this.getMessageAttachmentIdentifier(o1) === this.getMessageAttachmentIdentifier(o2) : o1 === o2;
  }

  addMessageAttachmentToCollectionIfMissing<Type extends Pick<IMessageAttachment, 'id'>>(
    messageAttachmentCollection: Type[],
    ...messageAttachmentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const messageAttachments: Type[] = messageAttachmentsToCheck.filter(isPresent);
    if (messageAttachments.length > 0) {
      const messageAttachmentCollectionIdentifiers = messageAttachmentCollection.map(messageAttachmentItem =>
        this.getMessageAttachmentIdentifier(messageAttachmentItem),
      );
      const messageAttachmentsToAdd = messageAttachments.filter(messageAttachmentItem => {
        const messageAttachmentIdentifier = this.getMessageAttachmentIdentifier(messageAttachmentItem);
        if (messageAttachmentCollectionIdentifiers.includes(messageAttachmentIdentifier)) {
          return false;
        }
        messageAttachmentCollectionIdentifiers.push(messageAttachmentIdentifier);
        return true;
      });
      return [...messageAttachmentsToAdd, ...messageAttachmentCollection];
    }
    return messageAttachmentCollection;
  }
}
