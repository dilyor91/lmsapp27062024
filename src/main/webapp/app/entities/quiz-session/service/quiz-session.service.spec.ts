import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IQuizSession } from '../quiz-session.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../quiz-session.test-samples';

import { QuizSessionService, RestQuizSession } from './quiz-session.service';

const requireRestSample: RestQuizSession = {
  ...sampleWithRequiredData,
  startTime: sampleWithRequiredData.startTime?.toJSON(),
  endTime: sampleWithRequiredData.endTime?.toJSON(),
};

describe('QuizSession Service', () => {
  let service: QuizSessionService;
  let httpMock: HttpTestingController;
  let expectedResult: IQuizSession | IQuizSession[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(QuizSessionService);
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

    it('should create a QuizSession', () => {
      const quizSession = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(quizSession).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a QuizSession', () => {
      const quizSession = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(quizSession).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a QuizSession', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of QuizSession', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a QuizSession', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addQuizSessionToCollectionIfMissing', () => {
      it('should add a QuizSession to an empty array', () => {
        const quizSession: IQuizSession = sampleWithRequiredData;
        expectedResult = service.addQuizSessionToCollectionIfMissing([], quizSession);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quizSession);
      });

      it('should not add a QuizSession to an array that contains it', () => {
        const quizSession: IQuizSession = sampleWithRequiredData;
        const quizSessionCollection: IQuizSession[] = [
          {
            ...quizSession,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addQuizSessionToCollectionIfMissing(quizSessionCollection, quizSession);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a QuizSession to an array that doesn't contain it", () => {
        const quizSession: IQuizSession = sampleWithRequiredData;
        const quizSessionCollection: IQuizSession[] = [sampleWithPartialData];
        expectedResult = service.addQuizSessionToCollectionIfMissing(quizSessionCollection, quizSession);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quizSession);
      });

      it('should add only unique QuizSession to an array', () => {
        const quizSessionArray: IQuizSession[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const quizSessionCollection: IQuizSession[] = [sampleWithRequiredData];
        expectedResult = service.addQuizSessionToCollectionIfMissing(quizSessionCollection, ...quizSessionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const quizSession: IQuizSession = sampleWithRequiredData;
        const quizSession2: IQuizSession = sampleWithPartialData;
        expectedResult = service.addQuizSessionToCollectionIfMissing([], quizSession, quizSession2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quizSession);
        expect(expectedResult).toContain(quizSession2);
      });

      it('should accept null and undefined values', () => {
        const quizSession: IQuizSession = sampleWithRequiredData;
        expectedResult = service.addQuizSessionToCollectionIfMissing([], null, quizSession, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quizSession);
      });

      it('should return initial array if no QuizSession is added', () => {
        const quizSessionCollection: IQuizSession[] = [sampleWithRequiredData];
        expectedResult = service.addQuizSessionToCollectionIfMissing(quizSessionCollection, undefined, null);
        expect(expectedResult).toEqual(quizSessionCollection);
      });
    });

    describe('compareQuizSession', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareQuizSession(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareQuizSession(entity1, entity2);
        const compareResult2 = service.compareQuizSession(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareQuizSession(entity1, entity2);
        const compareResult2 = service.compareQuizSession(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareQuizSession(entity1, entity2);
        const compareResult2 = service.compareQuizSession(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
