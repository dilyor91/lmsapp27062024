import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWikiPage } from '../wiki-page.model';
import { WikiPageService } from '../service/wiki-page.service';

const wikiPageResolve = (route: ActivatedRouteSnapshot): Observable<null | IWikiPage> => {
  const id = route.params['id'];
  if (id) {
    return inject(WikiPageService)
      .find(id)
      .pipe(
        mergeMap((wikiPage: HttpResponse<IWikiPage>) => {
          if (wikiPage.body) {
            return of(wikiPage.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default wikiPageResolve;
