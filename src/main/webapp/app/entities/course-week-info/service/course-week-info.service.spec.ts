import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICourseWeekInfo } from '../course-week-info.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../course-week-info.test-samples';

import { CourseWeekInfoService, RestCourseWeekInfo } from './course-week-info.service';

const requireRestSample: RestCourseWeekInfo = {
  ...sampleWithRequiredData,
  startDate: sampleWithRequiredData.startDate?.toJSON(),
};

describe('CourseWeekInfo Service', () => {
  let service: CourseWeekInfoService;
  let httpMock: HttpTestingController;
  let expectedResult: ICourseWeekInfo | ICourseWeekInfo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CourseWeekInfoService);
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

    it('should create a CourseWeekInfo', () => {
      const courseWeekInfo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(courseWeekInfo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CourseWeekInfo', () => {
      const courseWeekInfo = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(courseWeekInfo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CourseWeekInfo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CourseWeekInfo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CourseWeekInfo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCourseWeekInfoToCollectionIfMissing', () => {
      it('should add a CourseWeekInfo to an empty array', () => {
        const courseWeekInfo: ICourseWeekInfo = sampleWithRequiredData;
        expectedResult = service.addCourseWeekInfoToCollectionIfMissing([], courseWeekInfo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(courseWeekInfo);
      });

      it('should not add a CourseWeekInfo to an array that contains it', () => {
        const courseWeekInfo: ICourseWeekInfo = sampleWithRequiredData;
        const courseWeekInfoCollection: ICourseWeekInfo[] = [
          {
            ...courseWeekInfo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCourseWeekInfoToCollectionIfMissing(courseWeekInfoCollection, courseWeekInfo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CourseWeekInfo to an array that doesn't contain it", () => {
        const courseWeekInfo: ICourseWeekInfo = sampleWithRequiredData;
        const courseWeekInfoCollection: ICourseWeekInfo[] = [sampleWithPartialData];
        expectedResult = service.addCourseWeekInfoToCollectionIfMissing(courseWeekInfoCollection, courseWeekInfo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(courseWeekInfo);
      });

      it('should add only unique CourseWeekInfo to an array', () => {
        const courseWeekInfoArray: ICourseWeekInfo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const courseWeekInfoCollection: ICourseWeekInfo[] = [sampleWithRequiredData];
        expectedResult = service.addCourseWeekInfoToCollectionIfMissing(courseWeekInfoCollection, ...courseWeekInfoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const courseWeekInfo: ICourseWeekInfo = sampleWithRequiredData;
        const courseWeekInfo2: ICourseWeekInfo = sampleWithPartialData;
        expectedResult = service.addCourseWeekInfoToCollectionIfMissing([], courseWeekInfo, courseWeekInfo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(courseWeekInfo);
        expect(expectedResult).toContain(courseWeekInfo2);
      });

      it('should accept null and undefined values', () => {
        const courseWeekInfo: ICourseWeekInfo = sampleWithRequiredData;
        expectedResult = service.addCourseWeekInfoToCollectionIfMissing([], null, courseWeekInfo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(courseWeekInfo);
      });

      it('should return initial array if no CourseWeekInfo is added', () => {
        const courseWeekInfoCollection: ICourseWeekInfo[] = [sampleWithRequiredData];
        expectedResult = service.addCourseWeekInfoToCollectionIfMissing(courseWeekInfoCollection, undefined, null);
        expect(expectedResult).toEqual(courseWeekInfoCollection);
      });
    });

    describe('compareCourseWeekInfo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCourseWeekInfo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCourseWeekInfo(entity1, entity2);
        const compareResult2 = service.compareCourseWeekInfo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCourseWeekInfo(entity1, entity2);
        const compareResult2 = service.compareCourseWeekInfo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCourseWeekInfo(entity1, entity2);
        const compareResult2 = service.compareCourseWeekInfo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
