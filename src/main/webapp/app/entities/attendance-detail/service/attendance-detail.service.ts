import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAttendanceDetail, NewAttendanceDetail } from '../attendance-detail.model';

export type PartialUpdateAttendanceDetail = Partial<IAttendanceDetail> & Pick<IAttendanceDetail, 'id'>;

export type EntityResponseType = HttpResponse<IAttendanceDetail>;
export type EntityArrayResponseType = HttpResponse<IAttendanceDetail[]>;

@Injectable({ providedIn: 'root' })
export class AttendanceDetailService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/attendance-details');

  create(attendanceDetail: NewAttendanceDetail): Observable<EntityResponseType> {
    return this.http.post<IAttendanceDetail>(this.resourceUrl, attendanceDetail, { observe: 'response' });
  }

  update(attendanceDetail: IAttendanceDetail): Observable<EntityResponseType> {
    return this.http.put<IAttendanceDetail>(
      `${this.resourceUrl}/${this.getAttendanceDetailIdentifier(attendanceDetail)}`,
      attendanceDetail,
      { observe: 'response' },
    );
  }

  partialUpdate(attendanceDetail: PartialUpdateAttendanceDetail): Observable<EntityResponseType> {
    return this.http.patch<IAttendanceDetail>(
      `${this.resourceUrl}/${this.getAttendanceDetailIdentifier(attendanceDetail)}`,
      attendanceDetail,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAttendanceDetail>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAttendanceDetail[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAttendanceDetailIdentifier(attendanceDetail: Pick<IAttendanceDetail, 'id'>): number {
    return attendanceDetail.id;
  }

  compareAttendanceDetail(o1: Pick<IAttendanceDetail, 'id'> | null, o2: Pick<IAttendanceDetail, 'id'> | null): boolean {
    return o1 && o2 ? this.getAttendanceDetailIdentifier(o1) === this.getAttendanceDetailIdentifier(o2) : o1 === o2;
  }

  addAttendanceDetailToCollectionIfMissing<Type extends Pick<IAttendanceDetail, 'id'>>(
    attendanceDetailCollection: Type[],
    ...attendanceDetailsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const attendanceDetails: Type[] = attendanceDetailsToCheck.filter(isPresent);
    if (attendanceDetails.length > 0) {
      const attendanceDetailCollectionIdentifiers = attendanceDetailCollection.map(attendanceDetailItem =>
        this.getAttendanceDetailIdentifier(attendanceDetailItem),
      );
      const attendanceDetailsToAdd = attendanceDetails.filter(attendanceDetailItem => {
        const attendanceDetailIdentifier = this.getAttendanceDetailIdentifier(attendanceDetailItem);
        if (attendanceDetailCollectionIdentifiers.includes(attendanceDetailIdentifier)) {
          return false;
        }
        attendanceDetailCollectionIdentifiers.push(attendanceDetailIdentifier);
        return true;
      });
      return [...attendanceDetailsToAdd, ...attendanceDetailCollection];
    }
    return attendanceDetailCollection;
  }
}
