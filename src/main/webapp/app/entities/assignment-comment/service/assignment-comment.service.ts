import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAssignmentComment, NewAssignmentComment } from '../assignment-comment.model';

export type PartialUpdateAssignmentComment = Partial<IAssignmentComment> & Pick<IAssignmentComment, 'id'>;

type RestOf<T extends IAssignmentComment | NewAssignmentComment> = Omit<T, 'commentDate'> & {
  commentDate?: string | null;
};

export type RestAssignmentComment = RestOf<IAssignmentComment>;

export type NewRestAssignmentComment = RestOf<NewAssignmentComment>;

export type PartialUpdateRestAssignmentComment = RestOf<PartialUpdateAssignmentComment>;

export type EntityResponseType = HttpResponse<IAssignmentComment>;
export type EntityArrayResponseType = HttpResponse<IAssignmentComment[]>;

@Injectable({ providedIn: 'root' })
export class AssignmentCommentService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/assignment-comments');

  create(assignmentComment: NewAssignmentComment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(assignmentComment);
    return this.http
      .post<RestAssignmentComment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(assignmentComment: IAssignmentComment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(assignmentComment);
    return this.http
      .put<RestAssignmentComment>(`${this.resourceUrl}/${this.getAssignmentCommentIdentifier(assignmentComment)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(assignmentComment: PartialUpdateAssignmentComment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(assignmentComment);
    return this.http
      .patch<RestAssignmentComment>(`${this.resourceUrl}/${this.getAssignmentCommentIdentifier(assignmentComment)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAssignmentComment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAssignmentComment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAssignmentCommentIdentifier(assignmentComment: Pick<IAssignmentComment, 'id'>): number {
    return assignmentComment.id;
  }

  compareAssignmentComment(o1: Pick<IAssignmentComment, 'id'> | null, o2: Pick<IAssignmentComment, 'id'> | null): boolean {
    return o1 && o2 ? this.getAssignmentCommentIdentifier(o1) === this.getAssignmentCommentIdentifier(o2) : o1 === o2;
  }

  addAssignmentCommentToCollectionIfMissing<Type extends Pick<IAssignmentComment, 'id'>>(
    assignmentCommentCollection: Type[],
    ...assignmentCommentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const assignmentComments: Type[] = assignmentCommentsToCheck.filter(isPresent);
    if (assignmentComments.length > 0) {
      const assignmentCommentCollectionIdentifiers = assignmentCommentCollection.map(assignmentCommentItem =>
        this.getAssignmentCommentIdentifier(assignmentCommentItem),
      );
      const assignmentCommentsToAdd = assignmentComments.filter(assignmentCommentItem => {
        const assignmentCommentIdentifier = this.getAssignmentCommentIdentifier(assignmentCommentItem);
        if (assignmentCommentCollectionIdentifiers.includes(assignmentCommentIdentifier)) {
          return false;
        }
        assignmentCommentCollectionIdentifiers.push(assignmentCommentIdentifier);
        return true;
      });
      return [...assignmentCommentsToAdd, ...assignmentCommentCollection];
    }
    return assignmentCommentCollection;
  }

  protected convertDateFromClient<T extends IAssignmentComment | NewAssignmentComment | PartialUpdateAssignmentComment>(
    assignmentComment: T,
  ): RestOf<T> {
    return {
      ...assignmentComment,
      commentDate: assignmentComment.commentDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restAssignmentComment: RestAssignmentComment): IAssignmentComment {
    return {
      ...restAssignmentComment,
      commentDate: restAssignmentComment.commentDate ? dayjs(restAssignmentComment.commentDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAssignmentComment>): HttpResponse<IAssignmentComment> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAssignmentComment[]>): HttpResponse<IAssignmentComment[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
