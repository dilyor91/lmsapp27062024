import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILessonMaterial, NewLessonMaterial } from '../lesson-material.model';

export type PartialUpdateLessonMaterial = Partial<ILessonMaterial> & Pick<ILessonMaterial, 'id'>;

export type EntityResponseType = HttpResponse<ILessonMaterial>;
export type EntityArrayResponseType = HttpResponse<ILessonMaterial[]>;

@Injectable({ providedIn: 'root' })
export class LessonMaterialService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/lesson-materials');

  create(lessonMaterial: NewLessonMaterial): Observable<EntityResponseType> {
    return this.http.post<ILessonMaterial>(this.resourceUrl, lessonMaterial, { observe: 'response' });
  }

  update(lessonMaterial: ILessonMaterial): Observable<EntityResponseType> {
    return this.http.put<ILessonMaterial>(`${this.resourceUrl}/${this.getLessonMaterialIdentifier(lessonMaterial)}`, lessonMaterial, {
      observe: 'response',
    });
  }

  partialUpdate(lessonMaterial: PartialUpdateLessonMaterial): Observable<EntityResponseType> {
    return this.http.patch<ILessonMaterial>(`${this.resourceUrl}/${this.getLessonMaterialIdentifier(lessonMaterial)}`, lessonMaterial, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILessonMaterial>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILessonMaterial[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getLessonMaterialIdentifier(lessonMaterial: Pick<ILessonMaterial, 'id'>): number {
    return lessonMaterial.id;
  }

  compareLessonMaterial(o1: Pick<ILessonMaterial, 'id'> | null, o2: Pick<ILessonMaterial, 'id'> | null): boolean {
    return o1 && o2 ? this.getLessonMaterialIdentifier(o1) === this.getLessonMaterialIdentifier(o2) : o1 === o2;
  }

  addLessonMaterialToCollectionIfMissing<Type extends Pick<ILessonMaterial, 'id'>>(
    lessonMaterialCollection: Type[],
    ...lessonMaterialsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const lessonMaterials: Type[] = lessonMaterialsToCheck.filter(isPresent);
    if (lessonMaterials.length > 0) {
      const lessonMaterialCollectionIdentifiers = lessonMaterialCollection.map(lessonMaterialItem =>
        this.getLessonMaterialIdentifier(lessonMaterialItem),
      );
      const lessonMaterialsToAdd = lessonMaterials.filter(lessonMaterialItem => {
        const lessonMaterialIdentifier = this.getLessonMaterialIdentifier(lessonMaterialItem);
        if (lessonMaterialCollectionIdentifiers.includes(lessonMaterialIdentifier)) {
          return false;
        }
        lessonMaterialCollectionIdentifiers.push(lessonMaterialIdentifier);
        return true;
      });
      return [...lessonMaterialsToAdd, ...lessonMaterialCollection];
    }
    return lessonMaterialCollection;
  }
}
