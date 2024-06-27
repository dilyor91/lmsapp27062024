import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IQuizQuestionGroup } from '../quiz-question-group.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../quiz-question-group.test-samples';

import { QuizQuestionGroupService } from './quiz-question-group.service';

const requireRestSample: IQuizQuestionGroup = {
  ...sampleWithRequiredData,
};

describe('QuizQuestionGroup Service', () => {
  let service: QuizQuestionGroupService;
  let httpMock: HttpTestingController;
  let expectedResult: IQuizQuestionGroup | IQuizQuestionGroup[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(QuizQuestionGroupService);
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

    it('should create a QuizQuestionGroup', () => {
      const quizQuestionGroup = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(quizQuestionGroup).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a QuizQuestionGroup', () => {
      const quizQuestionGroup = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(quizQuestionGroup).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a QuizQuestionGroup', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of QuizQuestionGroup', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a QuizQuestionGroup', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addQuizQuestionGroupToCollectionIfMissing', () => {
      it('should add a QuizQuestionGroup to an empty array', () => {
        const quizQuestionGroup: IQuizQuestionGroup = sampleWithRequiredData;
        expectedResult = service.addQuizQuestionGroupToCollectionIfMissing([], quizQuestionGroup);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quizQuestionGroup);
      });

      it('should not add a QuizQuestionGroup to an array that contains it', () => {
        const quizQuestionGroup: IQuizQuestionGroup = sampleWithRequiredData;
        const quizQuestionGroupCollection: IQuizQuestionGroup[] = [
          {
            ...quizQuestionGroup,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addQuizQuestionGroupToCollectionIfMissing(quizQuestionGroupCollection, quizQuestionGroup);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a QuizQuestionGroup to an array that doesn't contain it", () => {
        const quizQuestionGroup: IQuizQuestionGroup = sampleWithRequiredData;
        const quizQuestionGroupCollection: IQuizQuestionGroup[] = [sampleWithPartialData];
        expectedResult = service.addQuizQuestionGroupToCollectionIfMissing(quizQuestionGroupCollection, quizQuestionGroup);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quizQuestionGroup);
      });

      it('should add only unique QuizQuestionGroup to an array', () => {
        const quizQuestionGroupArray: IQuizQuestionGroup[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const quizQuestionGroupCollection: IQuizQuestionGroup[] = [sampleWithRequiredData];
        expectedResult = service.addQuizQuestionGroupToCollectionIfMissing(quizQuestionGroupCollection, ...quizQuestionGroupArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const quizQuestionGroup: IQuizQuestionGroup = sampleWithRequiredData;
        const quizQuestionGroup2: IQuizQuestionGroup = sampleWithPartialData;
        expectedResult = service.addQuizQuestionGroupToCollectionIfMissing([], quizQuestionGroup, quizQuestionGroup2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quizQuestionGroup);
        expect(expectedResult).toContain(quizQuestionGroup2);
      });

      it('should accept null and undefined values', () => {
        const quizQuestionGroup: IQuizQuestionGroup = sampleWithRequiredData;
        expectedResult = service.addQuizQuestionGroupToCollectionIfMissing([], null, quizQuestionGroup, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quizQuestionGroup);
      });

      it('should return initial array if no QuizQuestionGroup is added', () => {
        const quizQuestionGroupCollection: IQuizQuestionGroup[] = [sampleWithRequiredData];
        expectedResult = service.addQuizQuestionGroupToCollectionIfMissing(quizQuestionGroupCollection, undefined, null);
        expect(expectedResult).toEqual(quizQuestionGroupCollection);
      });
    });

    describe('compareQuizQuestionGroup', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareQuizQuestionGroup(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareQuizQuestionGroup(entity1, entity2);
        const compareResult2 = service.compareQuizQuestionGroup(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareQuizQuestionGroup(entity1, entity2);
        const compareResult2 = service.compareQuizQuestionGroup(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareQuizQuestionGroup(entity1, entity2);
        const compareResult2 = service.compareQuizQuestionGroup(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
