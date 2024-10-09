import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICommunityMessage } from '../community-message.model';
import { CommunityMessageService } from '../service/community-message.service';

const communityMessageResolve = (route: ActivatedRouteSnapshot): Observable<null | ICommunityMessage> => {
  const id = route.params.id;
  if (id) {
    return inject(CommunityMessageService)
      .find(id)
      .pipe(
        mergeMap((communityMessage: HttpResponse<ICommunityMessage>) => {
          if (communityMessage.body) {
            return of(communityMessage.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default communityMessageResolve;
