import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IAnnouncementCourseSection } from '../announcement-course-section.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../announcement-course-section.test-samples';

import { AnnouncementCourseSectionService } from './announcement-course-section.service';

const requireRestSample: IAnnouncementCourseSection = {
  ...sampleWithRequiredData,
};

describe('AnnouncementCourseSection Service', () => {
  let service: AnnouncementCourseSectionService;
  let httpMock: HttpTestingController;
  let expectedResult: IAnnouncementCourseSection | IAnnouncementCourseSection[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(AnnouncementCourseSectionService);
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

    it('should create a AnnouncementCourseSection', () => {
      const announcementCourseSection = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(announcementCourseSection).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AnnouncementCourseSection', () => {
      const announcementCourseSection = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(announcementCourseSection).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AnnouncementCourseSection', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AnnouncementCourseSection', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AnnouncementCourseSection', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAnnouncementCourseSectionToCollectionIfMissing', () => {
      it('should add a AnnouncementCourseSection to an empty array', () => {
        const announcementCourseSection: IAnnouncementCourseSection = sampleWithRequiredData;
        expectedResult = service.addAnnouncementCourseSectionToCollectionIfMissing([], announcementCourseSection);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(announcementCourseSection);
      });

      it('should not add a AnnouncementCourseSection to an array that contains it', () => {
        const announcementCourseSection: IAnnouncementCourseSection = sampleWithRequiredData;
        const announcementCourseSectionCollection: IAnnouncementCourseSection[] = [
          {
            ...announcementCourseSection,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAnnouncementCourseSectionToCollectionIfMissing(
          announcementCourseSectionCollection,
          announcementCourseSection,
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AnnouncementCourseSection to an array that doesn't contain it", () => {
        const announcementCourseSection: IAnnouncementCourseSection = sampleWithRequiredData;
        const announcementCourseSectionCollection: IAnnouncementCourseSection[] = [sampleWithPartialData];
        expectedResult = service.addAnnouncementCourseSectionToCollectionIfMissing(
          announcementCourseSectionCollection,
          announcementCourseSection,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(announcementCourseSection);
      });

      it('should add only unique AnnouncementCourseSection to an array', () => {
        const announcementCourseSectionArray: IAnnouncementCourseSection[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const announcementCourseSectionCollection: IAnnouncementCourseSection[] = [sampleWithRequiredData];
        expectedResult = service.addAnnouncementCourseSectionToCollectionIfMissing(
          announcementCourseSectionCollection,
          ...announcementCourseSectionArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const announcementCourseSection: IAnnouncementCourseSection = sampleWithRequiredData;
        const announcementCourseSection2: IAnnouncementCourseSection = sampleWithPartialData;
        expectedResult = service.addAnnouncementCourseSectionToCollectionIfMissing(
          [],
          announcementCourseSection,
          announcementCourseSection2,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(announcementCourseSection);
        expect(expectedResult).toContain(announcementCourseSection2);
      });

      it('should accept null and undefined values', () => {
        const announcementCourseSection: IAnnouncementCourseSection = sampleWithRequiredData;
        expectedResult = service.addAnnouncementCourseSectionToCollectionIfMissing([], null, announcementCourseSection, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(announcementCourseSection);
      });

      it('should return initial array if no AnnouncementCourseSection is added', () => {
        const announcementCourseSectionCollection: IAnnouncementCourseSection[] = [sampleWithRequiredData];
        expectedResult = service.addAnnouncementCourseSectionToCollectionIfMissing(announcementCourseSectionCollection, undefined, null);
        expect(expectedResult).toEqual(announcementCourseSectionCollection);
      });
    });

    describe('compareAnnouncementCourseSection', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAnnouncementCourseSection(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAnnouncementCourseSection(entity1, entity2);
        const compareResult2 = service.compareAnnouncementCourseSection(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAnnouncementCourseSection(entity1, entity2);
        const compareResult2 = service.compareAnnouncementCourseSection(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAnnouncementCourseSection(entity1, entity2);
        const compareResult2 = service.compareAnnouncementCourseSection(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
