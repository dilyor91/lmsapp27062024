import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IGrade, NewGrade } from '../grade.model';

export type PartialUpdateGrade = Partial<IGrade> & Pick<IGrade, 'id'>;

type RestOf<T extends IGrade | NewGrade> = Omit<T, 'gradedDate'> & {
  gradedDate?: string | null;
};

export type RestGrade = RestOf<IGrade>;

export type NewRestGrade = RestOf<NewGrade>;

export type PartialUpdateRestGrade = RestOf<PartialUpdateGrade>;

export type EntityResponseType = HttpResponse<IGrade>;
export type EntityArrayResponseType = HttpResponse<IGrade[]>;

@Injectable({ providedIn: 'root' })
export class GradeService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/grades');

  create(grade: NewGrade): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(grade);
    return this.http.post<RestGrade>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(grade: IGrade): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(grade);
    return this.http
      .put<RestGrade>(`${this.resourceUrl}/${this.getGradeIdentifier(grade)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(grade: PartialUpdateGrade): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(grade);
    return this.http
      .patch<RestGrade>(`${this.resourceUrl}/${this.getGradeIdentifier(grade)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestGrade>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestGrade[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getGradeIdentifier(grade: Pick<IGrade, 'id'>): number {
    return grade.id;
  }

  compareGrade(o1: Pick<IGrade, 'id'> | null, o2: Pick<IGrade, 'id'> | null): boolean {
    return o1 && o2 ? this.getGradeIdentifier(o1) === this.getGradeIdentifier(o2) : o1 === o2;
  }

  addGradeToCollectionIfMissing<Type extends Pick<IGrade, 'id'>>(
    gradeCollection: Type[],
    ...gradesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const grades: Type[] = gradesToCheck.filter(isPresent);
    if (grades.length > 0) {
      const gradeCollectionIdentifiers = gradeCollection.map(gradeItem => this.getGradeIdentifier(gradeItem));
      const gradesToAdd = grades.filter(gradeItem => {
        const gradeIdentifier = this.getGradeIdentifier(gradeItem);
        if (gradeCollectionIdentifiers.includes(gradeIdentifier)) {
          return false;
        }
        gradeCollectionIdentifiers.push(gradeIdentifier);
        return true;
      });
      return [...gradesToAdd, ...gradeCollection];
    }
    return gradeCollection;
  }

  protected convertDateFromClient<T extends IGrade | NewGrade | PartialUpdateGrade>(grade: T): RestOf<T> {
    return {
      ...grade,
      gradedDate: grade.gradedDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restGrade: RestGrade): IGrade {
    return {
      ...restGrade,
      gradedDate: restGrade.gradedDate ? dayjs(restGrade.gradedDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestGrade>): HttpResponse<IGrade> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestGrade[]>): HttpResponse<IGrade[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
