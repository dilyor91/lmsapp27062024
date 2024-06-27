import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IStudentQuestion } from '../student-question.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../student-question.test-samples';

import { StudentQuestionService } from './student-question.service';

const requireRestSample: IStudentQuestion = {
  ...sampleWithRequiredData,
};

describe('StudentQuestion Service', () => {
  let service: StudentQuestionService;
  let httpMock: HttpTestingController;
  let expectedResult: IStudentQuestion | IStudentQuestion[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(StudentQuestionService);
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

    it('should create a StudentQuestion', () => {
      const studentQuestion = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(studentQuestion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a StudentQuestion', () => {
      const studentQuestion = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(studentQuestion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a StudentQuestion', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of StudentQuestion', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a StudentQuestion', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addStudentQuestionToCollectionIfMissing', () => {
      it('should add a StudentQuestion to an empty array', () => {
        const studentQuestion: IStudentQuestion = sampleWithRequiredData;
        expectedResult = service.addStudentQuestionToCollectionIfMissing([], studentQuestion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(studentQuestion);
      });

      it('should not add a StudentQuestion to an array that contains it', () => {
        const studentQuestion: IStudentQuestion = sampleWithRequiredData;
        const studentQuestionCollection: IStudentQuestion[] = [
          {
            ...studentQuestion,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addStudentQuestionToCollectionIfMissing(studentQuestionCollection, studentQuestion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a StudentQuestion to an array that doesn't contain it", () => {
        const studentQuestion: IStudentQuestion = sampleWithRequiredData;
        const studentQuestionCollection: IStudentQuestion[] = [sampleWithPartialData];
        expectedResult = service.addStudentQuestionToCollectionIfMissing(studentQuestionCollection, studentQuestion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(studentQuestion);
      });

      it('should add only unique StudentQuestion to an array', () => {
        const studentQuestionArray: IStudentQuestion[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const studentQuestionCollection: IStudentQuestion[] = [sampleWithRequiredData];
        expectedResult = service.addStudentQuestionToCollectionIfMissing(studentQuestionCollection, ...studentQuestionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const studentQuestion: IStudentQuestion = sampleWithRequiredData;
        const studentQuestion2: IStudentQuestion = sampleWithPartialData;
        expectedResult = service.addStudentQuestionToCollectionIfMissing([], studentQuestion, studentQuestion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(studentQuestion);
        expect(expectedResult).toContain(studentQuestion2);
      });

      it('should accept null and undefined values', () => {
        const studentQuestion: IStudentQuestion = sampleWithRequiredData;
        expectedResult = service.addStudentQuestionToCollectionIfMissing([], null, studentQuestion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(studentQuestion);
      });

      it('should return initial array if no StudentQuestion is added', () => {
        const studentQuestionCollection: IStudentQuestion[] = [sampleWithRequiredData];
        expectedResult = service.addStudentQuestionToCollectionIfMissing(studentQuestionCollection, undefined, null);
        expect(expectedResult).toEqual(studentQuestionCollection);
      });
    });

    describe('compareStudentQuestion', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareStudentQuestion(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareStudentQuestion(entity1, entity2);
        const compareResult2 = service.compareStudentQuestion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareStudentQuestion(entity1, entity2);
        const compareResult2 = service.compareStudentQuestion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareStudentQuestion(entity1, entity2);
        const compareResult2 = service.compareStudentQuestion(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
