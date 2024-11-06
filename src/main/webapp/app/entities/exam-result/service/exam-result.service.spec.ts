import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IExamResult } from '../exam-result.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../exam-result.test-samples';

import { ExamResultService, RestExamResult } from './exam-result.service';

const requireRestSample: RestExamResult = {
  ...sampleWithRequiredData,
  gradedDate: sampleWithRequiredData.gradedDate?.toJSON(),
};

describe('ExamResult Service', () => {
  let service: ExamResultService;
  let httpMock: HttpTestingController;
  let expectedResult: IExamResult | IExamResult[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ExamResultService);
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

    it('should create a ExamResult', () => {
      const examResult = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(examResult).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ExamResult', () => {
      const examResult = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(examResult).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ExamResult', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ExamResult', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ExamResult', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addExamResultToCollectionIfMissing', () => {
      it('should add a ExamResult to an empty array', () => {
        const examResult: IExamResult = sampleWithRequiredData;
        expectedResult = service.addExamResultToCollectionIfMissing([], examResult);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(examResult);
      });

      it('should not add a ExamResult to an array that contains it', () => {
        const examResult: IExamResult = sampleWithRequiredData;
        const examResultCollection: IExamResult[] = [
          {
            ...examResult,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addExamResultToCollectionIfMissing(examResultCollection, examResult);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ExamResult to an array that doesn't contain it", () => {
        const examResult: IExamResult = sampleWithRequiredData;
        const examResultCollection: IExamResult[] = [sampleWithPartialData];
        expectedResult = service.addExamResultToCollectionIfMissing(examResultCollection, examResult);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(examResult);
      });

      it('should add only unique ExamResult to an array', () => {
        const examResultArray: IExamResult[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const examResultCollection: IExamResult[] = [sampleWithRequiredData];
        expectedResult = service.addExamResultToCollectionIfMissing(examResultCollection, ...examResultArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const examResult: IExamResult = sampleWithRequiredData;
        const examResult2: IExamResult = sampleWithPartialData;
        expectedResult = service.addExamResultToCollectionIfMissing([], examResult, examResult2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(examResult);
        expect(expectedResult).toContain(examResult2);
      });

      it('should accept null and undefined values', () => {
        const examResult: IExamResult = sampleWithRequiredData;
        expectedResult = service.addExamResultToCollectionIfMissing([], null, examResult, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(examResult);
      });

      it('should return initial array if no ExamResult is added', () => {
        const examResultCollection: IExamResult[] = [sampleWithRequiredData];
        expectedResult = service.addExamResultToCollectionIfMissing(examResultCollection, undefined, null);
        expect(expectedResult).toEqual(examResultCollection);
      });
    });

    describe('compareExamResult', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareExamResult(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareExamResult(entity1, entity2);
        const compareResult2 = service.compareExamResult(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareExamResult(entity1, entity2);
        const compareResult2 = service.compareExamResult(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareExamResult(entity1, entity2);
        const compareResult2 = service.compareExamResult(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
