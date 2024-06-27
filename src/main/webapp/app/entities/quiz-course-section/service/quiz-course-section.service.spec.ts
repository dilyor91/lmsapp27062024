import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IQuizCourseSection } from '../quiz-course-section.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../quiz-course-section.test-samples';

import { QuizCourseSectionService, RestQuizCourseSection } from './quiz-course-section.service';

const requireRestSample: RestQuizCourseSection = {
  ...sampleWithRequiredData,
  startDate: sampleWithRequiredData.startDate?.toJSON(),
  endDate: sampleWithRequiredData.endDate?.toJSON(),
};

describe('QuizCourseSection Service', () => {
  let service: QuizCourseSectionService;
  let httpMock: HttpTestingController;
  let expectedResult: IQuizCourseSection | IQuizCourseSection[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(QuizCourseSectionService);
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

    it('should create a QuizCourseSection', () => {
      const quizCourseSection = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(quizCourseSection).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a QuizCourseSection', () => {
      const quizCourseSection = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(quizCourseSection).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a QuizCourseSection', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of QuizCourseSection', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a QuizCourseSection', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addQuizCourseSectionToCollectionIfMissing', () => {
      it('should add a QuizCourseSection to an empty array', () => {
        const quizCourseSection: IQuizCourseSection = sampleWithRequiredData;
        expectedResult = service.addQuizCourseSectionToCollectionIfMissing([], quizCourseSection);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quizCourseSection);
      });

      it('should not add a QuizCourseSection to an array that contains it', () => {
        const quizCourseSection: IQuizCourseSection = sampleWithRequiredData;
        const quizCourseSectionCollection: IQuizCourseSection[] = [
          {
            ...quizCourseSection,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addQuizCourseSectionToCollectionIfMissing(quizCourseSectionCollection, quizCourseSection);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a QuizCourseSection to an array that doesn't contain it", () => {
        const quizCourseSection: IQuizCourseSection = sampleWithRequiredData;
        const quizCourseSectionCollection: IQuizCourseSection[] = [sampleWithPartialData];
        expectedResult = service.addQuizCourseSectionToCollectionIfMissing(quizCourseSectionCollection, quizCourseSection);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quizCourseSection);
      });

      it('should add only unique QuizCourseSection to an array', () => {
        const quizCourseSectionArray: IQuizCourseSection[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const quizCourseSectionCollection: IQuizCourseSection[] = [sampleWithRequiredData];
        expectedResult = service.addQuizCourseSectionToCollectionIfMissing(quizCourseSectionCollection, ...quizCourseSectionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const quizCourseSection: IQuizCourseSection = sampleWithRequiredData;
        const quizCourseSection2: IQuizCourseSection = sampleWithPartialData;
        expectedResult = service.addQuizCourseSectionToCollectionIfMissing([], quizCourseSection, quizCourseSection2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quizCourseSection);
        expect(expectedResult).toContain(quizCourseSection2);
      });

      it('should accept null and undefined values', () => {
        const quizCourseSection: IQuizCourseSection = sampleWithRequiredData;
        expectedResult = service.addQuizCourseSectionToCollectionIfMissing([], null, quizCourseSection, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quizCourseSection);
      });

      it('should return initial array if no QuizCourseSection is added', () => {
        const quizCourseSectionCollection: IQuizCourseSection[] = [sampleWithRequiredData];
        expectedResult = service.addQuizCourseSectionToCollectionIfMissing(quizCourseSectionCollection, undefined, null);
        expect(expectedResult).toEqual(quizCourseSectionCollection);
      });
    });

    describe('compareQuizCourseSection', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareQuizCourseSection(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareQuizCourseSection(entity1, entity2);
        const compareResult2 = service.compareQuizCourseSection(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareQuizCourseSection(entity1, entity2);
        const compareResult2 = service.compareQuizCourseSection(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareQuizCourseSection(entity1, entity2);
        const compareResult2 = service.compareQuizCourseSection(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
