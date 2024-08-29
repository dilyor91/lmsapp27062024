import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IAssignmentComment } from '../assignment-comment.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../assignment-comment.test-samples';

import { AssignmentCommentService, RestAssignmentComment } from './assignment-comment.service';

const requireRestSample: RestAssignmentComment = {
  ...sampleWithRequiredData,
  commentDate: sampleWithRequiredData.commentDate?.toJSON(),
};

describe('AssignmentComment Service', () => {
  let service: AssignmentCommentService;
  let httpMock: HttpTestingController;
  let expectedResult: IAssignmentComment | IAssignmentComment[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(AssignmentCommentService);
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

    it('should create a AssignmentComment', () => {
      const assignmentComment = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(assignmentComment).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AssignmentComment', () => {
      const assignmentComment = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(assignmentComment).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AssignmentComment', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AssignmentComment', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AssignmentComment', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAssignmentCommentToCollectionIfMissing', () => {
      it('should add a AssignmentComment to an empty array', () => {
        const assignmentComment: IAssignmentComment = sampleWithRequiredData;
        expectedResult = service.addAssignmentCommentToCollectionIfMissing([], assignmentComment);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(assignmentComment);
      });

      it('should not add a AssignmentComment to an array that contains it', () => {
        const assignmentComment: IAssignmentComment = sampleWithRequiredData;
        const assignmentCommentCollection: IAssignmentComment[] = [
          {
            ...assignmentComment,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAssignmentCommentToCollectionIfMissing(assignmentCommentCollection, assignmentComment);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AssignmentComment to an array that doesn't contain it", () => {
        const assignmentComment: IAssignmentComment = sampleWithRequiredData;
        const assignmentCommentCollection: IAssignmentComment[] = [sampleWithPartialData];
        expectedResult = service.addAssignmentCommentToCollectionIfMissing(assignmentCommentCollection, assignmentComment);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(assignmentComment);
      });

      it('should add only unique AssignmentComment to an array', () => {
        const assignmentCommentArray: IAssignmentComment[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const assignmentCommentCollection: IAssignmentComment[] = [sampleWithRequiredData];
        expectedResult = service.addAssignmentCommentToCollectionIfMissing(assignmentCommentCollection, ...assignmentCommentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const assignmentComment: IAssignmentComment = sampleWithRequiredData;
        const assignmentComment2: IAssignmentComment = sampleWithPartialData;
        expectedResult = service.addAssignmentCommentToCollectionIfMissing([], assignmentComment, assignmentComment2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(assignmentComment);
        expect(expectedResult).toContain(assignmentComment2);
      });

      it('should accept null and undefined values', () => {
        const assignmentComment: IAssignmentComment = sampleWithRequiredData;
        expectedResult = service.addAssignmentCommentToCollectionIfMissing([], null, assignmentComment, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(assignmentComment);
      });

      it('should return initial array if no AssignmentComment is added', () => {
        const assignmentCommentCollection: IAssignmentComment[] = [sampleWithRequiredData];
        expectedResult = service.addAssignmentCommentToCollectionIfMissing(assignmentCommentCollection, undefined, null);
        expect(expectedResult).toEqual(assignmentCommentCollection);
      });
    });

    describe('compareAssignmentComment', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAssignmentComment(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAssignmentComment(entity1, entity2);
        const compareResult2 = service.compareAssignmentComment(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAssignmentComment(entity1, entity2);
        const compareResult2 = service.compareAssignmentComment(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAssignmentComment(entity1, entity2);
        const compareResult2 = service.compareAssignmentComment(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
