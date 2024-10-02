import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMessageToUser } from '../message-to-user.model';
import { MessageToUserService } from '../service/message-to-user.service';

const messageToUserResolve = (route: ActivatedRouteSnapshot): Observable<null | IMessageToUser> => {
  const id = route.params.id;
  if (id) {
    return inject(MessageToUserService)
      .find(id)
      .pipe(
        mergeMap((messageToUser: HttpResponse<IMessageToUser>) => {
          if (messageToUser.body) {
            return of(messageToUser.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default messageToUserResolve;
