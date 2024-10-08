import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICommunity } from '../community.model';
import { CommunityService } from '../service/community.service';

const communityResolve = (route: ActivatedRouteSnapshot): Observable<null | ICommunity> => {
  const id = route.params.id;
  if (id) {
    return inject(CommunityService)
      .find(id)
      .pipe(
        mergeMap((community: HttpResponse<ICommunity>) => {
          if (community.body) {
            return of(community.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default communityResolve;
