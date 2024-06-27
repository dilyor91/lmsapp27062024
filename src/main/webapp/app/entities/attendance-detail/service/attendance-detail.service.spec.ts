import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IAttendanceDetail } from '../attendance-detail.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../attendance-detail.test-samples';

import { AttendanceDetailService } from './attendance-detail.service';

const requireRestSample: IAttendanceDetail = {
  ...sampleWithRequiredData,
};

describe('AttendanceDetail Service', () => {
  let service: AttendanceDetailService;
  let httpMock: HttpTestingController;
  let expectedResult: IAttendanceDetail | IAttendanceDetail[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(AttendanceDetailService);
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

    it('should create a AttendanceDetail', () => {
      const attendanceDetail = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(attendanceDetail).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a AttendanceDetail', () => {
      const attendanceDetail = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(attendanceDetail).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a AttendanceDetail', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of AttendanceDetail', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a AttendanceDetail', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAttendanceDetailToCollectionIfMissing', () => {
      it('should add a AttendanceDetail to an empty array', () => {
        const attendanceDetail: IAttendanceDetail = sampleWithRequiredData;
        expectedResult = service.addAttendanceDetailToCollectionIfMissing([], attendanceDetail);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(attendanceDetail);
      });

      it('should not add a AttendanceDetail to an array that contains it', () => {
        const attendanceDetail: IAttendanceDetail = sampleWithRequiredData;
        const attendanceDetailCollection: IAttendanceDetail[] = [
          {
            ...attendanceDetail,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAttendanceDetailToCollectionIfMissing(attendanceDetailCollection, attendanceDetail);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a AttendanceDetail to an array that doesn't contain it", () => {
        const attendanceDetail: IAttendanceDetail = sampleWithRequiredData;
        const attendanceDetailCollection: IAttendanceDetail[] = [sampleWithPartialData];
        expectedResult = service.addAttendanceDetailToCollectionIfMissing(attendanceDetailCollection, attendanceDetail);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(attendanceDetail);
      });

      it('should add only unique AttendanceDetail to an array', () => {
        const attendanceDetailArray: IAttendanceDetail[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const attendanceDetailCollection: IAttendanceDetail[] = [sampleWithRequiredData];
        expectedResult = service.addAttendanceDetailToCollectionIfMissing(attendanceDetailCollection, ...attendanceDetailArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const attendanceDetail: IAttendanceDetail = sampleWithRequiredData;
        const attendanceDetail2: IAttendanceDetail = sampleWithPartialData;
        expectedResult = service.addAttendanceDetailToCollectionIfMissing([], attendanceDetail, attendanceDetail2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(attendanceDetail);
        expect(expectedResult).toContain(attendanceDetail2);
      });

      it('should accept null and undefined values', () => {
        const attendanceDetail: IAttendanceDetail = sampleWithRequiredData;
        expectedResult = service.addAttendanceDetailToCollectionIfMissing([], null, attendanceDetail, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(attendanceDetail);
      });

      it('should return initial array if no AttendanceDetail is added', () => {
        const attendanceDetailCollection: IAttendanceDetail[] = [sampleWithRequiredData];
        expectedResult = service.addAttendanceDetailToCollectionIfMissing(attendanceDetailCollection, undefined, null);
        expect(expectedResult).toEqual(attendanceDetailCollection);
      });
    });

    describe('compareAttendanceDetail', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAttendanceDetail(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAttendanceDetail(entity1, entity2);
        const compareResult2 = service.compareAttendanceDetail(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAttendanceDetail(entity1, entity2);
        const compareResult2 = service.compareAttendanceDetail(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAttendanceDetail(entity1, entity2);
        const compareResult2 = service.compareAttendanceDetail(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
