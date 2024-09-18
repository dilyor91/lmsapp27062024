import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IAnnouncementStudentRead } from '../announcement-student-read.model';
import {
  sampleWithFullData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithRequiredData,
} from '../announcement-student-read.test-samples';

import { AnnouncementStudentReadService, RestAnnouncementStudentRead } from './announcement-student-read.service';

const requireRestSample: RestAnnouncementStudentRead = {
  ...sampleWithRequiredData,
  readAt: sampleWithRequiredData.readAt?.toJSON(),
};

describe('AnnouncementStudentRead Service', () => {
  let service: AnnouncementStudentReadService;
  let httpMock: HttpTestingController;
  let expectedResult: IAnnouncementStudentRead | IAnnouncementStudentRead[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(AnnouncementStudentReadService);
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

    it('should create a AnnouncementStudentRead', () => {
      const announcementStudentRead = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(announcementStudentRead).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AnnouncementStudentRead', () => {
      const announcementStudentRead = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(announcementStudentRead).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AnnouncementStudentRead', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AnnouncementStudentRead', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AnnouncementStudentRead', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAnnouncementStudentReadToCollectionIfMissing', () => {
      it('should add a AnnouncementStudentRead to an empty array', () => {
        const announcementStudentRead: IAnnouncementStudentRead = sampleWithRequiredData;
        expectedResult = service.addAnnouncementStudentReadToCollectionIfMissing([], announcementStudentRead);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(announcementStudentRead);
      });

      it('should not add a AnnouncementStudentRead to an array that contains it', () => {
        const announcementStudentRead: IAnnouncementStudentRead = sampleWithRequiredData;
        const announcementStudentReadCollection: IAnnouncementStudentRead[] = [
          {
            ...announcementStudentRead,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAnnouncementStudentReadToCollectionIfMissing(
          announcementStudentReadCollection,
          announcementStudentRead,
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AnnouncementStudentRead to an array that doesn't contain it", () => {
        const announcementStudentRead: IAnnouncementStudentRead = sampleWithRequiredData;
        const announcementStudentReadCollection: IAnnouncementStudentRead[] = [sampleWithPartialData];
        expectedResult = service.addAnnouncementStudentReadToCollectionIfMissing(
          announcementStudentReadCollection,
          announcementStudentRead,
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(announcementStudentRead);
      });

      it('should add only unique AnnouncementStudentRead to an array', () => {
        const announcementStudentReadArray: IAnnouncementStudentRead[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const announcementStudentReadCollection: IAnnouncementStudentRead[] = [sampleWithRequiredData];
        expectedResult = service.addAnnouncementStudentReadToCollectionIfMissing(
          announcementStudentReadCollection,
          ...announcementStudentReadArray,
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const announcementStudentRead: IAnnouncementStudentRead = sampleWithRequiredData;
        const announcementStudentRead2: IAnnouncementStudentRead = sampleWithPartialData;
        expectedResult = service.addAnnouncementStudentReadToCollectionIfMissing([], announcementStudentRead, announcementStudentRead2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(announcementStudentRead);
        expect(expectedResult).toContain(announcementStudentRead2);
      });

      it('should accept null and undefined values', () => {
        const announcementStudentRead: IAnnouncementStudentRead = sampleWithRequiredData;
        expectedResult = service.addAnnouncementStudentReadToCollectionIfMissing([], null, announcementStudentRead, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(announcementStudentRead);
      });

      it('should return initial array if no AnnouncementStudentRead is added', () => {
        const announcementStudentReadCollection: IAnnouncementStudentRead[] = [sampleWithRequiredData];
        expectedResult = service.addAnnouncementStudentReadToCollectionIfMissing(announcementStudentReadCollection, undefined, null);
        expect(expectedResult).toEqual(announcementStudentReadCollection);
      });
    });

    describe('compareAnnouncementStudentRead', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAnnouncementStudentRead(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAnnouncementStudentRead(entity1, entity2);
        const compareResult2 = service.compareAnnouncementStudentRead(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAnnouncementStudentRead(entity1, entity2);
        const compareResult2 = service.compareAnnouncementStudentRead(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAnnouncementStudentRead(entity1, entity2);
        const compareResult2 = service.compareAnnouncementStudentRead(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
