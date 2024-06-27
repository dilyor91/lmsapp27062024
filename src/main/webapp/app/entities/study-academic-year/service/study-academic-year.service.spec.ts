import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IStudyAcademicYear } from '../study-academic-year.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../study-academic-year.test-samples';

import { StudyAcademicYearService, RestStudyAcademicYear } from './study-academic-year.service';

const requireRestSample: RestStudyAcademicYear = {
  ...sampleWithRequiredData,
  fromDate: sampleWithRequiredData.fromDate?.toJSON(),
  endDate: sampleWithRequiredData.endDate?.toJSON(),
};

describe('StudyAcademicYear Service', () => {
  let service: StudyAcademicYearService;
  let httpMock: HttpTestingController;
  let expectedResult: IStudyAcademicYear | IStudyAcademicYear[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(StudyAcademicYearService);
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

    it('should create a StudyAcademicYear', () => {
      const studyAcademicYear = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(studyAcademicYear).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a StudyAcademicYear', () => {
      const studyAcademicYear = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(studyAcademicYear).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a StudyAcademicYear', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of StudyAcademicYear', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a StudyAcademicYear', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addStudyAcademicYearToCollectionIfMissing', () => {
      it('should add a StudyAcademicYear to an empty array', () => {
        const studyAcademicYear: IStudyAcademicYear = sampleWithRequiredData;
        expectedResult = service.addStudyAcademicYearToCollectionIfMissing([], studyAcademicYear);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(studyAcademicYear);
      });

      it('should not add a StudyAcademicYear to an array that contains it', () => {
        const studyAcademicYear: IStudyAcademicYear = sampleWithRequiredData;
        const studyAcademicYearCollection: IStudyAcademicYear[] = [
          {
            ...studyAcademicYear,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addStudyAcademicYearToCollectionIfMissing(studyAcademicYearCollection, studyAcademicYear);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a StudyAcademicYear to an array that doesn't contain it", () => {
        const studyAcademicYear: IStudyAcademicYear = sampleWithRequiredData;
        const studyAcademicYearCollection: IStudyAcademicYear[] = [sampleWithPartialData];
        expectedResult = service.addStudyAcademicYearToCollectionIfMissing(studyAcademicYearCollection, studyAcademicYear);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(studyAcademicYear);
      });

      it('should add only unique StudyAcademicYear to an array', () => {
        const studyAcademicYearArray: IStudyAcademicYear[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const studyAcademicYearCollection: IStudyAcademicYear[] = [sampleWithRequiredData];
        expectedResult = service.addStudyAcademicYearToCollectionIfMissing(studyAcademicYearCollection, ...studyAcademicYearArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const studyAcademicYear: IStudyAcademicYear = sampleWithRequiredData;
        const studyAcademicYear2: IStudyAcademicYear = sampleWithPartialData;
        expectedResult = service.addStudyAcademicYearToCollectionIfMissing([], studyAcademicYear, studyAcademicYear2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(studyAcademicYear);
        expect(expectedResult).toContain(studyAcademicYear2);
      });

      it('should accept null and undefined values', () => {
        const studyAcademicYear: IStudyAcademicYear = sampleWithRequiredData;
        expectedResult = service.addStudyAcademicYearToCollectionIfMissing([], null, studyAcademicYear, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(studyAcademicYear);
      });

      it('should return initial array if no StudyAcademicYear is added', () => {
        const studyAcademicYearCollection: IStudyAcademicYear[] = [sampleWithRequiredData];
        expectedResult = service.addStudyAcademicYearToCollectionIfMissing(studyAcademicYearCollection, undefined, null);
        expect(expectedResult).toEqual(studyAcademicYearCollection);
      });
    });

    describe('compareStudyAcademicYear', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareStudyAcademicYear(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareStudyAcademicYear(entity1, entity2);
        const compareResult2 = service.compareStudyAcademicYear(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareStudyAcademicYear(entity1, entity2);
        const compareResult2 = service.compareStudyAcademicYear(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareStudyAcademicYear(entity1, entity2);
        const compareResult2 = service.compareStudyAcademicYear(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
