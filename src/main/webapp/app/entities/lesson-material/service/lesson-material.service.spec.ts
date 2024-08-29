import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ILessonMaterial } from '../lesson-material.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../lesson-material.test-samples';

import { LessonMaterialService } from './lesson-material.service';

const requireRestSample: ILessonMaterial = {
  ...sampleWithRequiredData,
};

describe('LessonMaterial Service', () => {
  let service: LessonMaterialService;
  let httpMock: HttpTestingController;
  let expectedResult: ILessonMaterial | ILessonMaterial[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(LessonMaterialService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a LessonMaterial', () => {
      const lessonMaterial = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(lessonMaterial).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LessonMaterial', () => {
      const lessonMaterial = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(lessonMaterial).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LessonMaterial', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LessonMaterial', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LessonMaterial', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLessonMaterialToCollectionIfMissing', () => {
      it('should add a LessonMaterial to an empty array', () => {
        const lessonMaterial: ILessonMaterial = sampleWithRequiredData;
        expectedResult = service.addLessonMaterialToCollectionIfMissing([], lessonMaterial);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(lessonMaterial);
      });

      it('should not add a LessonMaterial to an array that contains it', () => {
        const lessonMaterial: ILessonMaterial = sampleWithRequiredData;
        const lessonMaterialCollection: ILessonMaterial[] = [
          {
            ...lessonMaterial,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLessonMaterialToCollectionIfMissing(lessonMaterialCollection, lessonMaterial);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LessonMaterial to an array that doesn't contain it", () => {
        const lessonMaterial: ILessonMaterial = sampleWithRequiredData;
        const lessonMaterialCollection: ILessonMaterial[] = [sampleWithPartialData];
        expectedResult = service.addLessonMaterialToCollectionIfMissing(lessonMaterialCollection, lessonMaterial);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(lessonMaterial);
      });

      it('should add only unique LessonMaterial to an array', () => {
        const lessonMaterialArray: ILessonMaterial[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const lessonMaterialCollection: ILessonMaterial[] = [sampleWithRequiredData];
        expectedResult = service.addLessonMaterialToCollectionIfMissing(lessonMaterialCollection, ...lessonMaterialArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const lessonMaterial: ILessonMaterial = sampleWithRequiredData;
        const lessonMaterial2: ILessonMaterial = sampleWithPartialData;
        expectedResult = service.addLessonMaterialToCollectionIfMissing([], lessonMaterial, lessonMaterial2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(lessonMaterial);
        expect(expectedResult).toContain(lessonMaterial2);
      });

      it('should accept null and undefined values', () => {
        const lessonMaterial: ILessonMaterial = sampleWithRequiredData;
        expectedResult = service.addLessonMaterialToCollectionIfMissing([], null, lessonMaterial, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(lessonMaterial);
      });

      it('should return initial array if no LessonMaterial is added', () => {
        const lessonMaterialCollection: ILessonMaterial[] = [sampleWithRequiredData];
        expectedResult = service.addLessonMaterialToCollectionIfMissing(lessonMaterialCollection, undefined, null);
        expect(expectedResult).toEqual(lessonMaterialCollection);
      });
    });

    describe('compareLessonMaterial', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLessonMaterial(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLessonMaterial(entity1, entity2);
        const compareResult2 = service.compareLessonMaterial(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLessonMaterial(entity1, entity2);
        const compareResult2 = service.compareLessonMaterial(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLessonMaterial(entity1, entity2);
        const compareResult2 = service.compareLessonMaterial(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
