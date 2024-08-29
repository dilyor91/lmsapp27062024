import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICourseWeek } from '../course-week.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../course-week.test-samples';

import { CourseWeekService, RestCourseWeek } from './course-week.service';

const requireRestSample: RestCourseWeek = {
  ...sampleWithRequiredData,
  weekDate: sampleWithRequiredData.weekDate?.toJSON(),
};

describe('CourseWeek Service', () => {
  let service: CourseWeekService;
  let httpMock: HttpTestingController;
  let expectedResult: ICourseWeek | ICourseWeek[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CourseWeekService);
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

    it('should create a CourseWeek', () => {
      const courseWeek = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(courseWeek).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CourseWeek', () => {
      const courseWeek = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(courseWeek).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CourseWeek', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CourseWeek', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CourseWeek', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCourseWeekToCollectionIfMissing', () => {
      it('should add a CourseWeek to an empty array', () => {
        const courseWeek: ICourseWeek = sampleWithRequiredData;
        expectedResult = service.addCourseWeekToCollectionIfMissing([], courseWeek);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(courseWeek);
      });

      it('should not add a CourseWeek to an array that contains it', () => {
        const courseWeek: ICourseWeek = sampleWithRequiredData;
        const courseWeekCollection: ICourseWeek[] = [
          {
            ...courseWeek,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCourseWeekToCollectionIfMissing(courseWeekCollection, courseWeek);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CourseWeek to an array that doesn't contain it", () => {
        const courseWeek: ICourseWeek = sampleWithRequiredData;
        const courseWeekCollection: ICourseWeek[] = [sampleWithPartialData];
        expectedResult = service.addCourseWeekToCollectionIfMissing(courseWeekCollection, courseWeek);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(courseWeek);
      });

      it('should add only unique CourseWeek to an array', () => {
        const courseWeekArray: ICourseWeek[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const courseWeekCollection: ICourseWeek[] = [sampleWithRequiredData];
        expectedResult = service.addCourseWeekToCollectionIfMissing(courseWeekCollection, ...courseWeekArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const courseWeek: ICourseWeek = sampleWithRequiredData;
        const courseWeek2: ICourseWeek = sampleWithPartialData;
        expectedResult = service.addCourseWeekToCollectionIfMissing([], courseWeek, courseWeek2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(courseWeek);
        expect(expectedResult).toContain(courseWeek2);
      });

      it('should accept null and undefined values', () => {
        const courseWeek: ICourseWeek = sampleWithRequiredData;
        expectedResult = service.addCourseWeekToCollectionIfMissing([], null, courseWeek, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(courseWeek);
      });

      it('should return initial array if no CourseWeek is added', () => {
        const courseWeekCollection: ICourseWeek[] = [sampleWithRequiredData];
        expectedResult = service.addCourseWeekToCollectionIfMissing(courseWeekCollection, undefined, null);
        expect(expectedResult).toEqual(courseWeekCollection);
      });
    });

    describe('compareCourseWeek', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCourseWeek(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCourseWeek(entity1, entity2);
        const compareResult2 = service.compareCourseWeek(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCourseWeek(entity1, entity2);
        const compareResult2 = service.compareCourseWeek(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCourseWeek(entity1, entity2);
        const compareResult2 = service.compareCourseWeek(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
