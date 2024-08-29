import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IStudyTerm } from '../study-term.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../study-term.test-samples';

import { RestStudyTerm, StudyTermService } from './study-term.service';

const requireRestSample: RestStudyTerm = {
  ...sampleWithRequiredData,
  startDate: sampleWithRequiredData.startDate?.toJSON(),
  endDate: sampleWithRequiredData.endDate?.toJSON(),
};

describe('StudyTerm Service', () => {
  let service: StudyTermService;
  let httpMock: HttpTestingController;
  let expectedResult: IStudyTerm | IStudyTerm[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(StudyTermService);
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

    it('should create a StudyTerm', () => {
      const studyTerm = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(studyTerm).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a StudyTerm', () => {
      const studyTerm = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(studyTerm).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a StudyTerm', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of StudyTerm', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a StudyTerm', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addStudyTermToCollectionIfMissing', () => {
      it('should add a StudyTerm to an empty array', () => {
        const studyTerm: IStudyTerm = sampleWithRequiredData;
        expectedResult = service.addStudyTermToCollectionIfMissing([], studyTerm);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(studyTerm);
      });

      it('should not add a StudyTerm to an array that contains it', () => {
        const studyTerm: IStudyTerm = sampleWithRequiredData;
        const studyTermCollection: IStudyTerm[] = [
          {
            ...studyTerm,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addStudyTermToCollectionIfMissing(studyTermCollection, studyTerm);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a StudyTerm to an array that doesn't contain it", () => {
        const studyTerm: IStudyTerm = sampleWithRequiredData;
        const studyTermCollection: IStudyTerm[] = [sampleWithPartialData];
        expectedResult = service.addStudyTermToCollectionIfMissing(studyTermCollection, studyTerm);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(studyTerm);
      });

      it('should add only unique StudyTerm to an array', () => {
        const studyTermArray: IStudyTerm[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const studyTermCollection: IStudyTerm[] = [sampleWithRequiredData];
        expectedResult = service.addStudyTermToCollectionIfMissing(studyTermCollection, ...studyTermArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const studyTerm: IStudyTerm = sampleWithRequiredData;
        const studyTerm2: IStudyTerm = sampleWithPartialData;
        expectedResult = service.addStudyTermToCollectionIfMissing([], studyTerm, studyTerm2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(studyTerm);
        expect(expectedResult).toContain(studyTerm2);
      });

      it('should accept null and undefined values', () => {
        const studyTerm: IStudyTerm = sampleWithRequiredData;
        expectedResult = service.addStudyTermToCollectionIfMissing([], null, studyTerm, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(studyTerm);
      });

      it('should return initial array if no StudyTerm is added', () => {
        const studyTermCollection: IStudyTerm[] = [sampleWithRequiredData];
        expectedResult = service.addStudyTermToCollectionIfMissing(studyTermCollection, undefined, null);
        expect(expectedResult).toEqual(studyTermCollection);
      });
    });

    describe('compareStudyTerm', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareStudyTerm(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareStudyTerm(entity1, entity2);
        const compareResult2 = service.compareStudyTerm(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareStudyTerm(entity1, entity2);
        const compareResult2 = service.compareStudyTerm(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareStudyTerm(entity1, entity2);
        const compareResult2 = service.compareStudyTerm(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
