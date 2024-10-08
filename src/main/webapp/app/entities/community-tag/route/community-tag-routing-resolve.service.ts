import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICommunityTag } from '../community-tag.model';
import { CommunityTagService } from '../service/community-tag.service';

const communityTagResolve = (route: ActivatedRouteSnapshot): Observable<null | ICommunityTag> => {
  const id = route.params.id;
  if (id) {
    return inject(CommunityTagService)
      .find(id)
      .pipe(
        mergeMap((communityTag: HttpResponse<ICommunityTag>) => {
          if (communityTag.body) {
            return of(communityTag.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default communityTagResolve;
