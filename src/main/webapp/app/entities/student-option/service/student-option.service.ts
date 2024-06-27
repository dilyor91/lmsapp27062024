import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStudentOption, NewStudentOption } from '../student-option.model';

export type PartialUpdateStudentOption = Partial<IStudentOption> & Pick<IStudentOption, 'id'>;

export type EntityResponseType = HttpResponse<IStudentOption>;
export type EntityArrayResponseType = HttpResponse<IStudentOption[]>;

@Injectable({ providedIn: 'root' })
export class StudentOptionService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/student-options');

  create(studentOption: NewStudentOption): Observable<EntityResponseType> {
    return this.http.post<IStudentOption>(this.resourceUrl, studentOption, { observe: 'response' });
  }

  update(studentOption: IStudentOption): Observable<EntityResponseType> {
    return this.http.put<IStudentOption>(`${this.resourceUrl}/${this.getStudentOptionIdentifier(studentOption)}`, studentOption, {
      observe: 'response',
    });
  }

  partialUpdate(studentOption: PartialUpdateStudentOption): Observable<EntityResponseType> {
    return this.http.patch<IStudentOption>(`${this.resourceUrl}/${this.getStudentOptionIdentifier(studentOption)}`, studentOption, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStudentOption>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStudentOption[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getStudentOptionIdentifier(studentOption: Pick<IStudentOption, 'id'>): number {
    return studentOption.id;
  }

  compareStudentOption(o1: Pick<IStudentOption, 'id'> | null, o2: Pick<IStudentOption, 'id'> | null): boolean {
    return o1 && o2 ? this.getStudentOptionIdentifier(o1) === this.getStudentOptionIdentifier(o2) : o1 === o2;
  }

  addStudentOptionToCollectionIfMissing<Type extends Pick<IStudentOption, 'id'>>(
    studentOptionCollection: Type[],
    ...studentOptionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const studentOptions: Type[] = studentOptionsToCheck.filter(isPresent);
    if (studentOptions.length > 0) {
      const studentOptionCollectionIdentifiers = studentOptionCollection.map(studentOptionItem =>
        this.getStudentOptionIdentifier(studentOptionItem),
      );
      const studentOptionsToAdd = studentOptions.filter(studentOptionItem => {
        const studentOptionIdentifier = this.getStudentOptionIdentifier(studentOptionItem);
        if (studentOptionCollectionIdentifiers.includes(studentOptionIdentifier)) {
          return false;
        }
        studentOptionCollectionIdentifiers.push(studentOptionIdentifier);
        return true;
      });
      return [...studentOptionsToAdd, ...studentOptionCollection];
    }
    return studentOptionCollection;
  }
}
