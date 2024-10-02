import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMessageAttachment } from '../message-attachment.model';
import { MessageAttachmentService } from '../service/message-attachment.service';

const messageAttachmentResolve = (route: ActivatedRouteSnapshot): Observable<null | IMessageAttachment> => {
  const id = route.params.id;
  if (id) {
    return inject(MessageAttachmentService)
      .find(id)
      .pipe(
        mergeMap((messageAttachment: HttpResponse<IMessageAttachment>) => {
          if (messageAttachment.body) {
            return of(messageAttachment.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default messageAttachmentResolve;
