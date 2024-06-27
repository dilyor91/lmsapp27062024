import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IWikiPage } from '../wiki-page.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../wiki-page.test-samples';

import { WikiPageService, RestWikiPage } from './wiki-page.service';

const requireRestSample: RestWikiPage = {
  ...sampleWithRequiredData,
  addToStudentsDate: sampleWithRequiredData.addToStudentsDate?.toJSON(),
  publishedAt: sampleWithRequiredData.publishedAt?.toJSON(),
};

describe('WikiPage Service', () => {
  let service: WikiPageService;
  let httpMock: HttpTestingController;
  let expectedResult: IWikiPage | IWikiPage[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(WikiPageService);
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

    it('should create a WikiPage', () => {
      const wikiPage = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(wikiPage).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a WikiPage', () => {
      const wikiPage = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(wikiPage).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a WikiPage', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of WikiPage', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a WikiPage', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addWikiPageToCollectionIfMissing', () => {
      it('should add a WikiPage to an empty array', () => {
        const wikiPage: IWikiPage = sampleWithRequiredData;
        expectedResult = service.addWikiPageToCollectionIfMissing([], wikiPage);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(wikiPage);
      });

      it('should not add a WikiPage to an array that contains it', () => {
        const wikiPage: IWikiPage = sampleWithRequiredData;
        const wikiPageCollection: IWikiPage[] = [
          {
            ...wikiPage,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addWikiPageToCollectionIfMissing(wikiPageCollection, wikiPage);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a WikiPage to an array that doesn't contain it", () => {
        const wikiPage: IWikiPage = sampleWithRequiredData;
        const wikiPageCollection: IWikiPage[] = [sampleWithPartialData];
        expectedResult = service.addWikiPageToCollectionIfMissing(wikiPageCollection, wikiPage);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(wikiPage);
      });

      it('should add only unique WikiPage to an array', () => {
        const wikiPageArray: IWikiPage[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const wikiPageCollection: IWikiPage[] = [sampleWithRequiredData];
        expectedResult = service.addWikiPageToCollectionIfMissing(wikiPageCollection, ...wikiPageArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const wikiPage: IWikiPage = sampleWithRequiredData;
        const wikiPage2: IWikiPage = sampleWithPartialData;
        expectedResult = service.addWikiPageToCollectionIfMissing([], wikiPage, wikiPage2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(wikiPage);
        expect(expectedResult).toContain(wikiPage2);
      });

      it('should accept null and undefined values', () => {
        const wikiPage: IWikiPage = sampleWithRequiredData;
        expectedResult = service.addWikiPageToCollectionIfMissing([], null, wikiPage, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(wikiPage);
      });

      it('should return initial array if no WikiPage is added', () => {
        const wikiPageCollection: IWikiPage[] = [sampleWithRequiredData];
        expectedResult = service.addWikiPageToCollectionIfMissing(wikiPageCollection, undefined, null);
        expect(expectedResult).toEqual(wikiPageCollection);
      });
    });

    describe('compareWikiPage', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareWikiPage(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareWikiPage(entity1, entity2);
        const compareResult2 = service.compareWikiPage(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareWikiPage(entity1, entity2);
        const compareResult2 = service.compareWikiPage(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareWikiPage(entity1, entity2);
        const compareResult2 = service.compareWikiPage(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
