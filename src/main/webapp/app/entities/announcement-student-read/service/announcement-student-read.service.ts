import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAnnouncementStudentRead, NewAnnouncementStudentRead } from '../announcement-student-read.model';

export type PartialUpdateAnnouncementStudentRead = Partial<IAnnouncementStudentRead> & Pick<IAnnouncementStudentRead, 'id'>;

type RestOf<T extends IAnnouncementStudentRead | NewAnnouncementStudentRead> = Omit<T, 'readAt'> & {
  readAt?: string | null;
};

export type RestAnnouncementStudentRead = RestOf<IAnnouncementStudentRead>;

export type NewRestAnnouncementStudentRead = RestOf<NewAnnouncementStudentRead>;

export type PartialUpdateRestAnnouncementStudentRead = RestOf<PartialUpdateAnnouncementStudentRead>;

export type EntityResponseType = HttpResponse<IAnnouncementStudentRead>;
export type EntityArrayResponseType = HttpResponse<IAnnouncementStudentRead[]>;

@Injectable({ providedIn: 'root' })
export class AnnouncementStudentReadService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/announcement-student-reads');

  create(announcementStudentRead: NewAnnouncementStudentRead): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(announcementStudentRead);
    return this.http
      .post<RestAnnouncementStudentRead>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(announcementStudentRead: IAnnouncementStudentRead): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(announcementStudentRead);
    return this.http
      .put<RestAnnouncementStudentRead>(`${this.resourceUrl}/${this.getAnnouncementStudentReadIdentifier(announcementStudentRead)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(announcementStudentRead: PartialUpdateAnnouncementStudentRead): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(announcementStudentRead);
    return this.http
      .patch<RestAnnouncementStudentRead>(
        `${this.resourceUrl}/${this.getAnnouncementStudentReadIdentifier(announcementStudentRead)}`,
        copy,
        { observe: 'response' },
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAnnouncementStudentRead>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAnnouncementStudentRead[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAnnouncementStudentReadIdentifier(announcementStudentRead: Pick<IAnnouncementStudentRead, 'id'>): number {
    return announcementStudentRead.id;
  }

  compareAnnouncementStudentRead(
    o1: Pick<IAnnouncementStudentRead, 'id'> | null,
    o2: Pick<IAnnouncementStudentRead, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getAnnouncementStudentReadIdentifier(o1) === this.getAnnouncementStudentReadIdentifier(o2) : o1 === o2;
  }

  addAnnouncementStudentReadToCollectionIfMissing<Type extends Pick<IAnnouncementStudentRead, 'id'>>(
    announcementStudentReadCollection: Type[],
    ...announcementStudentReadsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const announcementStudentReads: Type[] = announcementStudentReadsToCheck.filter(isPresent);
    if (announcementStudentReads.length > 0) {
      const announcementStudentReadCollectionIdentifiers = announcementStudentReadCollection.map(announcementStudentReadItem =>
        this.getAnnouncementStudentReadIdentifier(announcementStudentReadItem),
      );
      const announcementStudentReadsToAdd = announcementStudentReads.filter(announcementStudentReadItem => {
        const announcementStudentReadIdentifier = this.getAnnouncementStudentReadIdentifier(announcementStudentReadItem);
        if (announcementStudentReadCollectionIdentifiers.includes(announcementStudentReadIdentifier)) {
          return false;
        }
        announcementStudentReadCollectionIdentifiers.push(announcementStudentReadIdentifier);
        return true;
      });
      return [...announcementStudentReadsToAdd, ...announcementStudentReadCollection];
    }
    return announcementStudentReadCollection;
  }

  protected convertDateFromClient<T extends IAnnouncementStudentRead | NewAnnouncementStudentRead | PartialUpdateAnnouncementStudentRead>(
    announcementStudentRead: T,
  ): RestOf<T> {
    return {
      ...announcementStudentRead,
      readAt: announcementStudentRead.readAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restAnnouncementStudentRead: RestAnnouncementStudentRead): IAnnouncementStudentRead {
    return {
      ...restAnnouncementStudentRead,
      readAt: restAnnouncementStudentRead.readAt ? dayjs(restAnnouncementStudentRead.readAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAnnouncementStudentRead>): HttpResponse<IAnnouncementStudentRead> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAnnouncementStudentRead[]>): HttpResponse<IAnnouncementStudentRead[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
