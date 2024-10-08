import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICommunityAttachment } from '../community-attachment.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../community-attachment.test-samples';

import { CommunityAttachmentService } from './community-attachment.service';

const requireRestSample: ICommunityAttachment = {
  ...sampleWithRequiredData,
};

describe('CommunityAttachment Service', () => {
  let service: CommunityAttachmentService;
  let httpMock: HttpTestingController;
  let expectedResult: ICommunityAttachment | ICommunityAttachment[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CommunityAttachmentService);
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

    it('should create a CommunityAttachment', () => {
      const communityAttachment = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(communityAttachment).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CommunityAttachment', () => {
      const communityAttachment = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(communityAttachment).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CommunityAttachment', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CommunityAttachment', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CommunityAttachment', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCommunityAttachmentToCollectionIfMissing', () => {
      it('should add a CommunityAttachment to an empty array', () => {
        const communityAttachment: ICommunityAttachment = sampleWithRequiredData;
        expectedResult = service.addCommunityAttachmentToCollectionIfMissing([], communityAttachment);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(communityAttachment);
      });

      it('should not add a CommunityAttachment to an array that contains it', () => {
        const communityAttachment: ICommunityAttachment = sampleWithRequiredData;
        const communityAttachmentCollection: ICommunityAttachment[] = [
          {
            ...communityAttachment,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCommunityAttachmentToCollectionIfMissing(communityAttachmentCollection, communityAttachment);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CommunityAttachment to an array that doesn't contain it", () => {
        const communityAttachment: ICommunityAttachment = sampleWithRequiredData;
        const communityAttachmentCollection: ICommunityAttachment[] = [sampleWithPartialData];
        expectedResult = service.addCommunityAttachmentToCollectionIfMissing(communityAttachmentCollection, communityAttachment);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(communityAttachment);
      });

      it('should add only unique CommunityAttachment to an array', () => {
        const communityAttachmentArray: ICommunityAttachment[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const communityAttachmentCollection: ICommunityAttachment[] = [sampleWithRequiredData];
        expectedResult = service.addCommunityAttachmentToCollectionIfMissing(communityAttachmentCollection, ...communityAttachmentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const communityAttachment: ICommunityAttachment = sampleWithRequiredData;
        const communityAttachment2: ICommunityAttachment = sampleWithPartialData;
        expectedResult = service.addCommunityAttachmentToCollectionIfMissing([], communityAttachment, communityAttachment2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(communityAttachment);
        expect(expectedResult).toContain(communityAttachment2);
      });

      it('should accept null and undefined values', () => {
        const communityAttachment: ICommunityAttachment = sampleWithRequiredData;
        expectedResult = service.addCommunityAttachmentToCollectionIfMissing([], null, communityAttachment, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(communityAttachment);
      });

      it('should return initial array if no CommunityAttachment is added', () => {
        const communityAttachmentCollection: ICommunityAttachment[] = [sampleWithRequiredData];
        expectedResult = service.addCommunityAttachmentToCollectionIfMissing(communityAttachmentCollection, undefined, null);
        expect(expectedResult).toEqual(communityAttachmentCollection);
      });
    });

    describe('compareCommunityAttachment', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCommunityAttachment(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCommunityAttachment(entity1, entity2);
        const compareResult2 = service.compareCommunityAttachment(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCommunityAttachment(entity1, entity2);
        const compareResult2 = service.compareCommunityAttachment(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCommunityAttachment(entity1, entity2);
        const compareResult2 = service.compareCommunityAttachment(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
