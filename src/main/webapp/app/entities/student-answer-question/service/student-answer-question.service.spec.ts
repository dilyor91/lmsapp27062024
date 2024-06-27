import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IStudentAnswerQuestion } from '../student-answer-question.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../student-answer-question.test-samples';

import { StudentAnswerQuestionService } from './student-answer-question.service';

const requireRestSample: IStudentAnswerQuestion = {
  ...sampleWithRequiredData,
};

describe('StudentAnswerQuestion Service', () => {
  let service: StudentAnswerQuestionService;
  let httpMock: HttpTestingController;
  let expectedResult: IStudentAnswerQuestion | IStudentAnswerQuestion[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(StudentAnswerQuestionService);
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

    it('should create a StudentAnswerQuestion', () => {
      const studentAnswerQuestion = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(studentAnswerQuestion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a StudentAnswerQuestion', () => {
      const studentAnswerQuestion = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(studentAnswerQuestion).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a StudentAnswerQuestion', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of StudentAnswerQuestion', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a StudentAnswerQuestion', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addStudentAnswerQuestionToCollectionIfMissing', () => {
      it('should add a StudentAnswerQuestion to an empty array', () => {
        const studentAnswerQuestion: IStudentAnswerQuestion = sampleWithRequiredData;
        expectedResult = service.addStudentAnswerQuestionToCollectionIfMissing([], studentAnswerQuestion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(studentAnswerQuestion);
      });

      it('should not add a StudentAnswerQuestion to an array that contains it', () => {
        const studentAnswerQuestion: IStudentAnswerQuestion = sampleWithRequiredData;
        const studentAnswerQuestionCollection: IStudentAnswerQuestion[] = [
          {
            ...studentAnswerQuestion,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addStudentAnswerQuestionToCollectionIfMissing(studentAnswerQuestionCollection, studentAnswerQuestion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a StudentAnswerQuestion to an array that doesn't contain it", () => {
        const studentAnswerQuestion: IStudentAnswerQuestion = sampleWithRequiredData;
        const studentAnswerQuestionCollection: IStudentAnswerQuestion[] = [sampleWithPartialData];
        expectedResult = service.addStudentAnswerQuestionToCollectionIfMissing(studentAnswerQuestionCollection, studentAnswerQuestion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(studentAnswerQuestion);
      });

      it('should add only unique StudentAnswerQuestion to an array', () => {
        const studentAnswerQuestionArray: IStudentAnswerQuestion[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const studentAnswerQuestionCollection: IStudentAnswerQuestion[] = [sampleWithRequiredData];
        expectedResult = service.addStudentAnswerQuestionToCollectionIfMissing(
          studentAnswerQuestionCollection,
          ...studentAnswerQuestionArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const studentAnswerQuestion: IStudentAnswerQuestion = sampleWithRequiredData;
        const studentAnswerQuestion2: IStudentAnswerQuestion = sampleWithPartialData;
        expectedResult = service.addStudentAnswerQuestionToCollectionIfMissing([], studentAnswerQuestion, studentAnswerQuestion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(studentAnswerQuestion);
        expect(expectedResult).toContain(studentAnswerQuestion2);
      });

      it('should accept null and undefined values', () => {
        const studentAnswerQuestion: IStudentAnswerQuestion = sampleWithRequiredData;
        expectedResult = service.addStudentAnswerQuestionToCollectionIfMissing([], null, studentAnswerQuestion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(studentAnswerQuestion);
      });

      it('should return initial array if no StudentAnswerQuestion is added', () => {
        const studentAnswerQuestionCollection: IStudentAnswerQuestion[] = [sampleWithRequiredData];
        expectedResult = service.addStudentAnswerQuestionToCollectionIfMissing(studentAnswerQuestionCollection, undefined, null);
        expect(expectedResult).toEqual(studentAnswerQuestionCollection);
      });
    });

    describe('compareStudentAnswerQuestion', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareStudentAnswerQuestion(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareStudentAnswerQuestion(entity1, entity2);
        const compareResult2 = service.compareStudentAnswerQuestion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareStudentAnswerQuestion(entity1, entity2);
        const compareResult2 = service.compareStudentAnswerQuestion(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareStudentAnswerQuestion(entity1, entity2);
        const compareResult2 = service.compareStudentAnswerQuestion(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
