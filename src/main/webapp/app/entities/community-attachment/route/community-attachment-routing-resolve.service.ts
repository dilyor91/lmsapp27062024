import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICommunityAttachment } from '../community-attachment.model';
import { CommunityAttachmentService } from '../service/community-attachment.service';

const communityAttachmentResolve = (route: ActivatedRouteSnapshot): Observable<null | ICommunityAttachment> => {
  const id = route.params.id;
  if (id) {
    return inject(CommunityAttachmentService)
      .find(id)
      .pipe(
        mergeMap((communityAttachment: HttpResponse<ICommunityAttachment>) => {
          if (communityAttachment.body) {
            return of(communityAttachment.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default communityAttachmentResolve;
