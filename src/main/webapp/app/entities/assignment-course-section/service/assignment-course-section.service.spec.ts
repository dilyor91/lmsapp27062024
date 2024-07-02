import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IAssignmentCourseSection } from '../assignment-course-section.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../assignment-course-section.test-samples';

import { AssignmentCourseSectionService, RestAssignmentCourseSection } from './assignment-course-section.service';

const requireRestSample: RestAssignmentCourseSection = {
  ...sampleWithRequiredData,
  startDate: sampleWithRequiredData.startDate?.toJSON(),
  endDate: sampleWithRequiredData.endDate?.toJSON(),
};

describe('AssignmentCourseSection Service', () => {
  let service: AssignmentCourseSectionService;
  let httpMock: HttpTestingController;
  let expectedResult: IAssignmentCourseSection | IAssignmentCourseSection[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(AssignmentCourseSectionService);
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

    it('should create a AssignmentCourseSection', () => {
      const assignmentCourseSection = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(assignmentCourseSection).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AssignmentCourseSection', () => {
      const assignmentCourseSection = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(assignmentCourseSection).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AssignmentCourseSection', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AssignmentCourseSection', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AssignmentCourseSection', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAssignmentCourseSectionToCollectionIfMissing', () => {
      it('should add a AssignmentCourseSection to an empty array', () => {
        const assignmentCourseSection: IAssignmentCourseSection = sampleWithRequiredData;
        expectedResult = service.addAssignmentCourseSectionToCollectionIfMissing([], assignmentCourseSection);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(assignmentCourseSection);
      });

      it('should not add a AssignmentCourseSection to an array that contains it', () => {
        const assignmentCourseSection: IAssignmentCourseSection = sampleWithRequiredData;
        const assignmentCourseSectionCollection: IAssignmentCourseSection[] = [
          {
            ...assignmentCourseSection,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAssignmentCourseSectionToCollectionIfMissing(
          assignmentCourseSectionCollection,
          assignmentCourseSection,
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AssignmentCourseSection to an array that doesn't contain it", () => {
        const assignmentCourseSection: IAssignmentCourseSection = sampleWithRequiredData;
        const assignmentCourseSectionCollection: IAssignmentCourseSection[] = [sampleWithPartialData];
        expectedResult = service.addAssignmentCourseSectionToCollectionIfMissing(
          assignmentCourseSectionCollection,
          assignmentCourseSection,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(assignmentCourseSection);
      });

      it('should add only unique AssignmentCourseSection to an array', () => {
        const assignmentCourseSectionArray: IAssignmentCourseSection[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const assignmentCourseSectionCollection: IAssignmentCourseSection[] = [sampleWithRequiredData];
        expectedResult = service.addAssignmentCourseSectionToCollectionIfMissing(
          assignmentCourseSectionCollection,
          ...assignmentCourseSectionArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const assignmentCourseSection: IAssignmentCourseSection = sampleWithRequiredData;
        const assignmentCourseSection2: IAssignmentCourseSection = sampleWithPartialData;
        expectedResult = service.addAssignmentCourseSectionToCollectionIfMissing([], assignmentCourseSection, assignmentCourseSection2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(assignmentCourseSection);
        expect(expectedResult).toContain(assignmentCourseSection2);
      });

      it('should accept null and undefined values', () => {
        const assignmentCourseSection: IAssignmentCourseSection = sampleWithRequiredData;
        expectedResult = service.addAssignmentCourseSectionToCollectionIfMissing([], null, assignmentCourseSection, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(assignmentCourseSection);
      });

      it('should return initial array if no AssignmentCourseSection is added', () => {
        const assignmentCourseSectionCollection: IAssignmentCourseSection[] = [sampleWithRequiredData];
        expectedResult = service.addAssignmentCourseSectionToCollectionIfMissing(assignmentCourseSectionCollection, undefined, null);
        expect(expectedResult).toEqual(assignmentCourseSectionCollection);
      });
    });

    describe('compareAssignmentCourseSection', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAssignmentCourseSection(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAssignmentCourseSection(entity1, entity2);
        const compareResult2 = service.compareAssignmentCourseSection(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAssignmentCourseSection(entity1, entity2);
        const compareResult2 = service.compareAssignmentCourseSection(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAssignmentCourseSection(entity1, entity2);
        const compareResult2 = service.compareAssignmentCourseSection(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
