import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBuilding } from '../building.model';
import { BuildingService } from '../service/building.service';

const buildingResolve = (route: ActivatedRouteSnapshot): Observable<null | IBuilding> => {
  const id = route.params.id;
  if (id) {
    return inject(BuildingService)
      .find(id)
      .pipe(
        mergeMap((building: HttpResponse<IBuilding>) => {
          if (building.body) {
            return of(building.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default buildingResolve;
