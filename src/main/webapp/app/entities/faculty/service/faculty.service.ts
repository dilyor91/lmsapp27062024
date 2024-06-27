import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFaculty, NewFaculty } from '../faculty.model';

export type PartialUpdateFaculty = Partial<IFaculty> & Pick<IFaculty, 'id'>;

export type EntityResponseType = HttpResponse<IFaculty>;
export type EntityArrayResponseType = HttpResponse<IFaculty[]>;

@Injectable({ providedIn: 'root' })
export class FacultyService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/faculties');

  create(faculty: NewFaculty): Observable<EntityResponseType> {
    return this.http.post<IFaculty>(this.resourceUrl, faculty, { observe: 'response' });
  }

  update(faculty: IFaculty): Observable<EntityResponseType> {
    return this.http.put<IFaculty>(`${this.resourceUrl}/${this.getFacultyIdentifier(faculty)}`, faculty, { observe: 'response' });
  }

  partialUpdate(faculty: PartialUpdateFaculty): Observable<EntityResponseType> {
    return this.http.patch<IFaculty>(`${this.resourceUrl}/${this.getFacultyIdentifier(faculty)}`, faculty, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFaculty>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFaculty[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getFacultyIdentifier(faculty: Pick<IFaculty, 'id'>): number {
    return faculty.id;
  }

  compareFaculty(o1: Pick<IFaculty, 'id'> | null, o2: Pick<IFaculty, 'id'> | null): boolean {
    return o1 && o2 ? this.getFacultyIdentifier(o1) === this.getFacultyIdentifier(o2) : o1 === o2;
  }

  addFacultyToCollectionIfMissing<Type extends Pick<IFaculty, 'id'>>(
    facultyCollection: Type[],
    ...facultiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const faculties: Type[] = facultiesToCheck.filter(isPresent);
    if (faculties.length > 0) {
      const facultyCollectionIdentifiers = facultyCollection.map(facultyItem => this.getFacultyIdentifier(facultyItem));
      const facultiesToAdd = faculties.filter(facultyItem => {
        const facultyIdentifier = this.getFacultyIdentifier(facultyItem);
        if (facultyCollectionIdentifiers.includes(facultyIdentifier)) {
          return false;
        }
        facultyCollectionIdentifiers.push(facultyIdentifier);
        return true;
      });
      return [...facultiesToAdd, ...facultyCollection];
    }
    return facultyCollection;
  }
}
