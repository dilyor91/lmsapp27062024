import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICommunityCourse } from '../community-course.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../community-course.test-samples';

import { CommunityCourseService } from './community-course.service';

const requireRestSample: ICommunityCourse = {
  ...sampleWithRequiredData,
};

describe('CommunityCourse Service', () => {
  let service: CommunityCourseService;
  let httpMock: HttpTestingController;
  let expectedResult: ICommunityCourse | ICommunityCourse[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CommunityCourseService);
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

    it('should create a CommunityCourse', () => {
      const communityCourse = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(communityCourse).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CommunityCourse', () => {
      const communityCourse = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(communityCourse).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CommunityCourse', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CommunityCourse', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CommunityCourse', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCommunityCourseToCollectionIfMissing', () => {
      it('should add a CommunityCourse to an empty array', () => {
        const communityCourse: ICommunityCourse = sampleWithRequiredData;
        expectedResult = service.addCommunityCourseToCollectionIfMissing([], communityCourse);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(communityCourse);
      });

      it('should not add a CommunityCourse to an array that contains it', () => {
        const communityCourse: ICommunityCourse = sampleWithRequiredData;
        const communityCourseCollection: ICommunityCourse[] = [
          {
            ...communityCourse,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCommunityCourseToCollectionIfMissing(communityCourseCollection, communityCourse);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CommunityCourse to an array that doesn't contain it", () => {
        const communityCourse: ICommunityCourse = sampleWithRequiredData;
        const communityCourseCollection: ICommunityCourse[] = [sampleWithPartialData];
        expectedResult = service.addCommunityCourseToCollectionIfMissing(communityCourseCollection, communityCourse);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(communityCourse);
      });

      it('should add only unique CommunityCourse to an array', () => {
        const communityCourseArray: ICommunityCourse[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const communityCourseCollection: ICommunityCourse[] = [sampleWithRequiredData];
        expectedResult = service.addCommunityCourseToCollectionIfMissing(communityCourseCollection, ...communityCourseArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const communityCourse: ICommunityCourse = sampleWithRequiredData;
        const communityCourse2: ICommunityCourse = sampleWithPartialData;
        expectedResult = service.addCommunityCourseToCollectionIfMissing([], communityCourse, communityCourse2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(communityCourse);
        expect(expectedResult).toContain(communityCourse2);
      });

      it('should accept null and undefined values', () => {
        const communityCourse: ICommunityCourse = sampleWithRequiredData;
        expectedResult = service.addCommunityCourseToCollectionIfMissing([], null, communityCourse, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(communityCourse);
      });

      it('should return initial array if no CommunityCourse is added', () => {
        const communityCourseCollection: ICommunityCourse[] = [sampleWithRequiredData];
        expectedResult = service.addCommunityCourseToCollectionIfMissing(communityCourseCollection, undefined, null);
        expect(expectedResult).toEqual(communityCourseCollection);
      });
    });

    describe('compareCommunityCourse', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCommunityCourse(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCommunityCourse(entity1, entity2);
        const compareResult2 = service.compareCommunityCourse(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCommunityCourse(entity1, entity2);
        const compareResult2 = service.compareCommunityCourse(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCommunityCourse(entity1, entity2);
        const compareResult2 = service.compareCommunityCourse(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
