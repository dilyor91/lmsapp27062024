import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWikiPage, NewWikiPage } from '../wiki-page.model';

export type PartialUpdateWikiPage = Partial<IWikiPage> & Pick<IWikiPage, 'id'>;

type RestOf<T extends IWikiPage | NewWikiPage> = Omit<T, 'addToStudentsDate' | 'publishedAt'> & {
  addToStudentsDate?: string | null;
  publishedAt?: string | null;
};

export type RestWikiPage = RestOf<IWikiPage>;

export type NewRestWikiPage = RestOf<NewWikiPage>;

export type PartialUpdateRestWikiPage = RestOf<PartialUpdateWikiPage>;

export type EntityResponseType = HttpResponse<IWikiPage>;
export type EntityArrayResponseType = HttpResponse<IWikiPage[]>;

@Injectable({ providedIn: 'root' })
export class WikiPageService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/wiki-pages');

  create(wikiPage: NewWikiPage): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(wikiPage);
    return this.http
      .post<RestWikiPage>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(wikiPage: IWikiPage): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(wikiPage);
    return this.http
      .put<RestWikiPage>(`${this.resourceUrl}/${this.getWikiPageIdentifier(wikiPage)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(wikiPage: PartialUpdateWikiPage): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(wikiPage);
    return this.http
      .patch<RestWikiPage>(`${this.resourceUrl}/${this.getWikiPageIdentifier(wikiPage)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestWikiPage>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestWikiPage[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getWikiPageIdentifier(wikiPage: Pick<IWikiPage, 'id'>): number {
    return wikiPage.id;
  }

  compareWikiPage(o1: Pick<IWikiPage, 'id'> | null, o2: Pick<IWikiPage, 'id'> | null): boolean {
    return o1 && o2 ? this.getWikiPageIdentifier(o1) === this.getWikiPageIdentifier(o2) : o1 === o2;
  }

  addWikiPageToCollectionIfMissing<Type extends Pick<IWikiPage, 'id'>>(
    wikiPageCollection: Type[],
    ...wikiPagesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const wikiPages: Type[] = wikiPagesToCheck.filter(isPresent);
    if (wikiPages.length > 0) {
      const wikiPageCollectionIdentifiers = wikiPageCollection.map(wikiPageItem => this.getWikiPageIdentifier(wikiPageItem));
      const wikiPagesToAdd = wikiPages.filter(wikiPageItem => {
        const wikiPageIdentifier = this.getWikiPageIdentifier(wikiPageItem);
        if (wikiPageCollectionIdentifiers.includes(wikiPageIdentifier)) {
          return false;
        }
        wikiPageCollectionIdentifiers.push(wikiPageIdentifier);
        return true;
      });
      return [...wikiPagesToAdd, ...wikiPageCollection];
    }
    return wikiPageCollection;
  }

  protected convertDateFromClient<T extends IWikiPage | NewWikiPage | PartialUpdateWikiPage>(wikiPage: T): RestOf<T> {
    return {
      ...wikiPage,
      addToStudentsDate: wikiPage.addToStudentsDate?.toJSON() ?? null,
      publishedAt: wikiPage.publishedAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restWikiPage: RestWikiPage): IWikiPage {
    return {
      ...restWikiPage,
      addToStudentsDate: restWikiPage.addToStudentsDate ? dayjs(restWikiPage.addToStudentsDate) : undefined,
      publishedAt: restWikiPage.publishedAt ? dayjs(restWikiPage.publishedAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestWikiPage>): HttpResponse<IWikiPage> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestWikiPage[]>): HttpResponse<IWikiPage[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
