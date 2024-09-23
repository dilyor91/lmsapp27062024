import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ITimeTable } from '../time-table.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../time-table.test-samples';

import { RestTimeTable, TimeTableService } from './time-table.service';

const requireRestSample: RestTimeTable = {
  ...sampleWithRequiredData,
  actialDate: sampleWithRequiredData.actialDate?.toJSON(),
};

describe('TimeTable Service', () => {
  let service: TimeTableService;
  let httpMock: HttpTestingController;
  let expectedResult: ITimeTable | ITimeTable[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TimeTableService);
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

    it('should create a TimeTable', () => {
      const timeTable = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(timeTable).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TimeTable', () => {
      const timeTable = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(timeTable).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TimeTable', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TimeTable', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TimeTable', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTimeTableToCollectionIfMissing', () => {
      it('should add a TimeTable to an empty array', () => {
        const timeTable: ITimeTable = sampleWithRequiredData;
        expectedResult = service.addTimeTableToCollectionIfMissing([], timeTable);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(timeTable);
      });

      it('should not add a TimeTable to an array that contains it', () => {
        const timeTable: ITimeTable = sampleWithRequiredData;
        const timeTableCollection: ITimeTable[] = [
          {
            ...timeTable,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTimeTableToCollectionIfMissing(timeTableCollection, timeTable);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TimeTable to an array that doesn't contain it", () => {
        const timeTable: ITimeTable = sampleWithRequiredData;
        const timeTableCollection: ITimeTable[] = [sampleWithPartialData];
        expectedResult = service.addTimeTableToCollectionIfMissing(timeTableCollection, timeTable);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(timeTable);
      });

      it('should add only unique TimeTable to an array', () => {
        const timeTableArray: ITimeTable[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const timeTableCollection: ITimeTable[] = [sampleWithRequiredData];
        expectedResult = service.addTimeTableToCollectionIfMissing(timeTableCollection, ...timeTableArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const timeTable: ITimeTable = sampleWithRequiredData;
        const timeTable2: ITimeTable = sampleWithPartialData;
        expectedResult = service.addTimeTableToCollectionIfMissing([], timeTable, timeTable2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(timeTable);
        expect(expectedResult).toContain(timeTable2);
      });

      it('should accept null and undefined values', () => {
        const timeTable: ITimeTable = sampleWithRequiredData;
        expectedResult = service.addTimeTableToCollectionIfMissing([], null, timeTable, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(timeTable);
      });

      it('should return initial array if no TimeTable is added', () => {
        const timeTableCollection: ITimeTable[] = [sampleWithRequiredData];
        expectedResult = service.addTimeTableToCollectionIfMissing(timeTableCollection, undefined, null);
        expect(expectedResult).toEqual(timeTableCollection);
      });
    });

    describe('compareTimeTable', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTimeTable(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTimeTable(entity1, entity2);
        const compareResult2 = service.compareTimeTable(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTimeTable(entity1, entity2);
        const compareResult2 = service.compareTimeTable(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTimeTable(entity1, entity2);
        const compareResult2 = service.compareTimeTable(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
