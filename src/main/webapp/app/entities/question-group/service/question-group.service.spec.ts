import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IQuestionGroup } from '../question-group.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../question-group.test-samples';

import { QuestionGroupService } from './question-group.service';

const requireRestSample: IQuestionGroup = {
  ...sampleWithRequiredData,
};

describe('QuestionGroup Service', () => {
  let service: QuestionGroupService;
  let httpMock: HttpTestingController;
  let expectedResult: IQuestionGroup | IQuestionGroup[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(QuestionGroupService);
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

    it('should create a QuestionGroup', () => {
      const questionGroup = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(questionGroup).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a QuestionGroup', () => {
      const questionGroup = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(questionGroup).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a QuestionGroup', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of QuestionGroup', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a QuestionGroup', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addQuestionGroupToCollectionIfMissing', () => {
      it('should add a QuestionGroup to an empty array', () => {
        const questionGroup: IQuestionGroup = sampleWithRequiredData;
        expectedResult = service.addQuestionGroupToCollectionIfMissing([], questionGroup);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(questionGroup);
      });

      it('should not add a QuestionGroup to an array that contains it', () => {
        const questionGroup: IQuestionGroup = sampleWithRequiredData;
        const questionGroupCollection: IQuestionGroup[] = [
          {
            ...questionGroup,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addQuestionGroupToCollectionIfMissing(questionGroupCollection, questionGroup);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a QuestionGroup to an array that doesn't contain it", () => {
        const questionGroup: IQuestionGroup = sampleWithRequiredData;
        const questionGroupCollection: IQuestionGroup[] = [sampleWithPartialData];
        expectedResult = service.addQuestionGroupToCollectionIfMissing(questionGroupCollection, questionGroup);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(questionGroup);
      });

      it('should add only unique QuestionGroup to an array', () => {
        const questionGroupArray: IQuestionGroup[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const questionGroupCollection: IQuestionGroup[] = [sampleWithRequiredData];
        expectedResult = service.addQuestionGroupToCollectionIfMissing(questionGroupCollection, ...questionGroupArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const questionGroup: IQuestionGroup = sampleWithRequiredData;
        const questionGroup2: IQuestionGroup = sampleWithPartialData;
        expectedResult = service.addQuestionGroupToCollectionIfMissing([], questionGroup, questionGroup2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(questionGroup);
        expect(expectedResult).toContain(questionGroup2);
      });

      it('should accept null and undefined values', () => {
        const questionGroup: IQuestionGroup = sampleWithRequiredData;
        expectedResult = service.addQuestionGroupToCollectionIfMissing([], null, questionGroup, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(questionGroup);
      });

      it('should return initial array if no QuestionGroup is added', () => {
        const questionGroupCollection: IQuestionGroup[] = [sampleWithRequiredData];
        expectedResult = service.addQuestionGroupToCollectionIfMissing(questionGroupCollection, undefined, null);
        expect(expectedResult).toEqual(questionGroupCollection);
      });
    });

    describe('compareQuestionGroup', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareQuestionGroup(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareQuestionGroup(entity1, entity2);
        const compareResult2 = service.compareQuestionGroup(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareQuestionGroup(entity1, entity2);
        const compareResult2 = service.compareQuestionGroup(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareQuestionGroup(entity1, entity2);
        const compareResult2 = service.compareQuestionGroup(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
