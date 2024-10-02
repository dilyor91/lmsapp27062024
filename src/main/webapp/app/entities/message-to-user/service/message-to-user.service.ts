import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMessageToUser, NewMessageToUser } from '../message-to-user.model';

export type PartialUpdateMessageToUser = Partial<IMessageToUser> & Pick<IMessageToUser, 'id'>;

type RestOf<T extends IMessageToUser | NewMessageToUser> = Omit<T, 'readAt'> & {
  readAt?: string | null;
};

export type RestMessageToUser = RestOf<IMessageToUser>;

export type NewRestMessageToUser = RestOf<NewMessageToUser>;

export type PartialUpdateRestMessageToUser = RestOf<PartialUpdateMessageToUser>;

export type EntityResponseType = HttpResponse<IMessageToUser>;
export type EntityArrayResponseType = HttpResponse<IMessageToUser[]>;

@Injectable({ providedIn: 'root' })
export class MessageToUserService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/message-to-users');

  create(messageToUser: NewMessageToUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(messageToUser);
    return this.http
      .post<RestMessageToUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(messageToUser: IMessageToUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(messageToUser);
    return this.http
      .put<RestMessageToUser>(`${this.resourceUrl}/${this.getMessageToUserIdentifier(messageToUser)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(messageToUser: PartialUpdateMessageToUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(messageToUser);
    return this.http
      .patch<RestMessageToUser>(`${this.resourceUrl}/${this.getMessageToUserIdentifier(messageToUser)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestMessageToUser>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestMessageToUser[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMessageToUserIdentifier(messageToUser: Pick<IMessageToUser, 'id'>): number {
    return messageToUser.id;
  }

  compareMessageToUser(o1: Pick<IMessageToUser, 'id'> | null, o2: Pick<IMessageToUser, 'id'> | null): boolean {
    return o1 && o2 ? this.getMessageToUserIdentifier(o1) === this.getMessageToUserIdentifier(o2) : o1 === o2;
  }

  addMessageToUserToCollectionIfMissing<Type extends Pick<IMessageToUser, 'id'>>(
    messageToUserCollection: Type[],
    ...messageToUsersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const messageToUsers: Type[] = messageToUsersToCheck.filter(isPresent);
    if (messageToUsers.length > 0) {
      const messageToUserCollectionIdentifiers = messageToUserCollection.map(messageToUserItem =>
        this.getMessageToUserIdentifier(messageToUserItem),
      );
      const messageToUsersToAdd = messageToUsers.filter(messageToUserItem => {
        const messageToUserIdentifier = this.getMessageToUserIdentifier(messageToUserItem);
        if (messageToUserCollectionIdentifiers.includes(messageToUserIdentifier)) {
          return false;
        }
        messageToUserCollectionIdentifiers.push(messageToUserIdentifier);
        return true;
      });
      return [...messageToUsersToAdd, ...messageToUserCollection];
    }
    return messageToUserCollection;
  }

  protected convertDateFromClient<T extends IMessageToUser | NewMessageToUser | PartialUpdateMessageToUser>(messageToUser: T): RestOf<T> {
    return {
      ...messageToUser,
      readAt: messageToUser.readAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restMessageToUser: RestMessageToUser): IMessageToUser {
    return {
      ...restMessageToUser,
      readAt: restMessageToUser.readAt ? dayjs(restMessageToUser.readAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestMessageToUser>): HttpResponse<IMessageToUser> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestMessageToUser[]>): HttpResponse<IMessageToUser[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
