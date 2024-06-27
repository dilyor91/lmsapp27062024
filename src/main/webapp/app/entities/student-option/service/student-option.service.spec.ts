import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IStudentOption } from '../student-option.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../student-option.test-samples';

import { StudentOptionService } from './student-option.service';

const requireRestSample: IStudentOption = {
  ...sampleWithRequiredData,
};

describe('StudentOption Service', () => {
  let service: StudentOptionService;
  let httpMock: HttpTestingController;
  let expectedResult: IStudentOption | IStudentOption[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(StudentOptionService);
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

    it('should create a StudentOption', () => {
      const studentOption = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(studentOption).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a StudentOption', () => {
      const studentOption = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(studentOption).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a StudentOption', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of StudentOption', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a StudentOption', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addStudentOptionToCollectionIfMissing', () => {
      it('should add a StudentOption to an empty array', () => {
        const studentOption: IStudentOption = sampleWithRequiredData;
        expectedResult = service.addStudentOptionToCollectionIfMissing([], studentOption);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(studentOption);
      });

      it('should not add a StudentOption to an array that contains it', () => {
        const studentOption: IStudentOption = sampleWithRequiredData;
        const studentOptionCollection: IStudentOption[] = [
          {
            ...studentOption,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addStudentOptionToCollectionIfMissing(studentOptionCollection, studentOption);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a StudentOption to an array that doesn't contain it", () => {
        const studentOption: IStudentOption = sampleWithRequiredData;
        const studentOptionCollection: IStudentOption[] = [sampleWithPartialData];
        expectedResult = service.addStudentOptionToCollectionIfMissing(studentOptionCollection, studentOption);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(studentOption);
      });

      it('should add only unique StudentOption to an array', () => {
        const studentOptionArray: IStudentOption[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const studentOptionCollection: IStudentOption[] = [sampleWithRequiredData];
        expectedResult = service.addStudentOptionToCollectionIfMissing(studentOptionCollection, ...studentOptionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const studentOption: IStudentOption = sampleWithRequiredData;
        const studentOption2: IStudentOption = sampleWithPartialData;
        expectedResult = service.addStudentOptionToCollectionIfMissing([], studentOption, studentOption2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(studentOption);
        expect(expectedResult).toContain(studentOption2);
      });

      it('should accept null and undefined values', () => {
        const studentOption: IStudentOption = sampleWithRequiredData;
        expectedResult = service.addStudentOptionToCollectionIfMissing([], null, studentOption, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(studentOption);
      });

      it('should return initial array if no StudentOption is added', () => {
        const studentOptionCollection: IStudentOption[] = [sampleWithRequiredData];
        expectedResult = service.addStudentOptionToCollectionIfMissing(studentOptionCollection, undefined, null);
        expect(expectedResult).toEqual(studentOptionCollection);
      });
    });

    describe('compareStudentOption', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareStudentOption(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareStudentOption(entity1, entity2);
        const compareResult2 = service.compareStudentOption(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareStudentOption(entity1, entity2);
        const compareResult2 = service.compareStudentOption(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareStudentOption(entity1, entity2);
        const compareResult2 = service.compareStudentOption(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
