import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISubmissionAssignment, NewSubmissionAssignment } from '../submission-assignment.model';

export type PartialUpdateSubmissionAssignment = Partial<ISubmissionAssignment> & Pick<ISubmissionAssignment, 'id'>;

type RestOf<T extends ISubmissionAssignment | NewSubmissionAssignment> = Omit<T, 'submissionDate'> & {
  submissionDate?: string | null;
};

export type RestSubmissionAssignment = RestOf<ISubmissionAssignment>;

export type NewRestSubmissionAssignment = RestOf<NewSubmissionAssignment>;

export type PartialUpdateRestSubmissionAssignment = RestOf<PartialUpdateSubmissionAssignment>;

export type EntityResponseType = HttpResponse<ISubmissionAssignment>;
export type EntityArrayResponseType = HttpResponse<ISubmissionAssignment[]>;

@Injectable({ providedIn: 'root' })
export class SubmissionAssignmentService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/submission-assignments');

  create(submissionAssignment: NewSubmissionAssignment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(submissionAssignment);
    return this.http
      .post<RestSubmissionAssignment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(submissionAssignment: ISubmissionAssignment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(submissionAssignment);
    return this.http
      .put<RestSubmissionAssignment>(`${this.resourceUrl}/${this.getSubmissionAssignmentIdentifier(submissionAssignment)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(submissionAssignment: PartialUpdateSubmissionAssignment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(submissionAssignment);
    return this.http
      .patch<RestSubmissionAssignment>(`${this.resourceUrl}/${this.getSubmissionAssignmentIdentifier(submissionAssignment)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestSubmissionAssignment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSubmissionAssignment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSubmissionAssignmentIdentifier(submissionAssignment: Pick<ISubmissionAssignment, 'id'>): number {
    return submissionAssignment.id;
  }

  compareSubmissionAssignment(o1: Pick<ISubmissionAssignment, 'id'> | null, o2: Pick<ISubmissionAssignment, 'id'> | null): boolean {
    return o1 && o2 ? this.getSubmissionAssignmentIdentifier(o1) === this.getSubmissionAssignmentIdentifier(o2) : o1 === o2;
  }

  addSubmissionAssignmentToCollectionIfMissing<Type extends Pick<ISubmissionAssignment, 'id'>>(
    submissionAssignmentCollection: Type[],
    ...submissionAssignmentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const submissionAssignments: Type[] = submissionAssignmentsToCheck.filter(isPresent);
    if (submissionAssignments.length > 0) {
      const submissionAssignmentCollectionIdentifiers = submissionAssignmentCollection.map(submissionAssignmentItem =>
        this.getSubmissionAssignmentIdentifier(submissionAssignmentItem),
      );
      const submissionAssignmentsToAdd = submissionAssignments.filter(submissionAssignmentItem => {
        const submissionAssignmentIdentifier = this.getSubmissionAssignmentIdentifier(submissionAssignmentItem);
        if (submissionAssignmentCollectionIdentifiers.includes(submissionAssignmentIdentifier)) {
          return false;
        }
        submissionAssignmentCollectionIdentifiers.push(submissionAssignmentIdentifier);
        return true;
      });
      return [...submissionAssignmentsToAdd, ...submissionAssignmentCollection];
    }
    return submissionAssignmentCollection;
  }

  protected convertDateFromClient<T extends ISubmissionAssignment | NewSubmissionAssignment | PartialUpdateSubmissionAssignment>(
    submissionAssignment: T,
  ): RestOf<T> {
    return {
      ...submissionAssignment,
      submissionDate: submissionAssignment.submissionDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restSubmissionAssignment: RestSubmissionAssignment): ISubmissionAssignment {
    return {
      ...restSubmissionAssignment,
      submissionDate: restSubmissionAssignment.submissionDate ? dayjs(restSubmissionAssignment.submissionDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSubmissionAssignment>): HttpResponse<ISubmissionAssignment> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSubmissionAssignment[]>): HttpResponse<ISubmissionAssignment[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
