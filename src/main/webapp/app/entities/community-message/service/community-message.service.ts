import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICommunityMessage, NewCommunityMessage } from '../community-message.model';

export type PartialUpdateCommunityMessage = Partial<ICommunityMessage> & Pick<ICommunityMessage, 'id'>;

type RestOf<T extends ICommunityMessage | NewCommunityMessage> = Omit<T, 'senderDate'> & {
  senderDate?: string | null;
};

export type RestCommunityMessage = RestOf<ICommunityMessage>;

export type NewRestCommunityMessage = RestOf<NewCommunityMessage>;

export type PartialUpdateRestCommunityMessage = RestOf<PartialUpdateCommunityMessage>;

export type EntityResponseType = HttpResponse<ICommunityMessage>;
export type EntityArrayResponseType = HttpResponse<ICommunityMessage[]>;

@Injectable({ providedIn: 'root' })
export class CommunityMessageService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/community-messages');

  create(communityMessage: NewCommunityMessage): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(communityMessage);
    return this.http
      .post<RestCommunityMessage>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(communityMessage: ICommunityMessage): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(communityMessage);
    return this.http
      .put<RestCommunityMessage>(`${this.resourceUrl}/${this.getCommunityMessageIdentifier(communityMessage)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(communityMessage: PartialUpdateCommunityMessage): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(communityMessage);
    return this.http
      .patch<RestCommunityMessage>(`${this.resourceUrl}/${this.getCommunityMessageIdentifier(communityMessage)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCommunityMessage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCommunityMessage[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCommunityMessageIdentifier(communityMessage: Pick<ICommunityMessage, 'id'>): number {
    return communityMessage.id;
  }

  compareCommunityMessage(o1: Pick<ICommunityMessage, 'id'> | null, o2: Pick<ICommunityMessage, 'id'> | null): boolean {
    return o1 && o2 ? this.getCommunityMessageIdentifier(o1) === this.getCommunityMessageIdentifier(o2) : o1 === o2;
  }

  addCommunityMessageToCollectionIfMissing<Type extends Pick<ICommunityMessage, 'id'>>(
    communityMessageCollection: Type[],
    ...communityMessagesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const communityMessages: Type[] = communityMessagesToCheck.filter(isPresent);
    if (communityMessages.length > 0) {
      const communityMessageCollectionIdentifiers = communityMessageCollection.map(communityMessageItem =>
        this.getCommunityMessageIdentifier(communityMessageItem),
      );
      const communityMessagesToAdd = communityMessages.filter(communityMessageItem => {
        const communityMessageIdentifier = this.getCommunityMessageIdentifier(communityMessageItem);
        if (communityMessageCollectionIdentifiers.includes(communityMessageIdentifier)) {
          return false;
        }
        communityMessageCollectionIdentifiers.push(communityMessageIdentifier);
        return true;
      });
      return [...communityMessagesToAdd, ...communityMessageCollection];
    }
    return communityMessageCollection;
  }

  protected convertDateFromClient<T extends ICommunityMessage | NewCommunityMessage | PartialUpdateCommunityMessage>(
    communityMessage: T,
  ): RestOf<T> {
    return {
      ...communityMessage,
      senderDate: communityMessage.senderDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restCommunityMessage: RestCommunityMessage): ICommunityMessage {
    return {
      ...restCommunityMessage,
      senderDate: restCommunityMessage.senderDate ? dayjs(restCommunityMessage.senderDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCommunityMessage>): HttpResponse<ICommunityMessage> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCommunityMessage[]>): HttpResponse<ICommunityMessage[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
