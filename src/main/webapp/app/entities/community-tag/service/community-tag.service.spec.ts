import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICommunityTag } from '../community-tag.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../community-tag.test-samples';

import { CommunityTagService } from './community-tag.service';

const requireRestSample: ICommunityTag = {
  ...sampleWithRequiredData,
};

describe('CommunityTag Service', () => {
  let service: CommunityTagService;
  let httpMock: HttpTestingController;
  let expectedResult: ICommunityTag | ICommunityTag[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CommunityTagService);
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

    it('should create a CommunityTag', () => {
      const communityTag = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(communityTag).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CommunityTag', () => {
      const communityTag = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(communityTag).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CommunityTag', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CommunityTag', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CommunityTag', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCommunityTagToCollectionIfMissing', () => {
      it('should add a CommunityTag to an empty array', () => {
        const communityTag: ICommunityTag = sampleWithRequiredData;
        expectedResult = service.addCommunityTagToCollectionIfMissing([], communityTag);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(communityTag);
      });

      it('should not add a CommunityTag to an array that contains it', () => {
        const communityTag: ICommunityTag = sampleWithRequiredData;
        const communityTagCollection: ICommunityTag[] = [
          {
            ...communityTag,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCommunityTagToCollectionIfMissing(communityTagCollection, communityTag);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CommunityTag to an array that doesn't contain it", () => {
        const communityTag: ICommunityTag = sampleWithRequiredData;
        const communityTagCollection: ICommunityTag[] = [sampleWithPartialData];
        expectedResult = service.addCommunityTagToCollectionIfMissing(communityTagCollection, communityTag);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(communityTag);
      });

      it('should add only unique CommunityTag to an array', () => {
        const communityTagArray: ICommunityTag[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const communityTagCollection: ICommunityTag[] = [sampleWithRequiredData];
        expectedResult = service.addCommunityTagToCollectionIfMissing(communityTagCollection, ...communityTagArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const communityTag: ICommunityTag = sampleWithRequiredData;
        const communityTag2: ICommunityTag = sampleWithPartialData;
        expectedResult = service.addCommunityTagToCollectionIfMissing([], communityTag, communityTag2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(communityTag);
        expect(expectedResult).toContain(communityTag2);
      });

      it('should accept null and undefined values', () => {
        const communityTag: ICommunityTag = sampleWithRequiredData;
        expectedResult = service.addCommunityTagToCollectionIfMissing([], null, communityTag, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(communityTag);
      });

      it('should return initial array if no CommunityTag is added', () => {
        const communityTagCollection: ICommunityTag[] = [sampleWithRequiredData];
        expectedResult = service.addCommunityTagToCollectionIfMissing(communityTagCollection, undefined, null);
        expect(expectedResult).toEqual(communityTagCollection);
      });
    });

    describe('compareCommunityTag', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCommunityTag(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCommunityTag(entity1, entity2);
        const compareResult2 = service.compareCommunityTag(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCommunityTag(entity1, entity2);
        const compareResult2 = service.compareCommunityTag(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCommunityTag(entity1, entity2);
        const compareResult2 = service.compareCommunityTag(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
