import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICommunityMessage } from '../community-message.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../community-message.test-samples';

import { CommunityMessageService, RestCommunityMessage } from './community-message.service';

const requireRestSample: RestCommunityMessage = {
  ...sampleWithRequiredData,
  senderDate: sampleWithRequiredData.senderDate?.toJSON(),
};

describe('CommunityMessage Service', () => {
  let service: CommunityMessageService;
  let httpMock: HttpTestingController;
  let expectedResult: ICommunityMessage | ICommunityMessage[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CommunityMessageService);
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

    it('should create a CommunityMessage', () => {
      const communityMessage = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(communityMessage).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CommunityMessage', () => {
      const communityMessage = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(communityMessage).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CommunityMessage', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CommunityMessage', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CommunityMessage', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCommunityMessageToCollectionIfMissing', () => {
      it('should add a CommunityMessage to an empty array', () => {
        const communityMessage: ICommunityMessage = sampleWithRequiredData;
        expectedResult = service.addCommunityMessageToCollectionIfMissing([], communityMessage);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(communityMessage);
      });

      it('should not add a CommunityMessage to an array that contains it', () => {
        const communityMessage: ICommunityMessage = sampleWithRequiredData;
        const communityMessageCollection: ICommunityMessage[] = [
          {
            ...communityMessage,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCommunityMessageToCollectionIfMissing(communityMessageCollection, communityMessage);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CommunityMessage to an array that doesn't contain it", () => {
        const communityMessage: ICommunityMessage = sampleWithRequiredData;
        const communityMessageCollection: ICommunityMessage[] = [sampleWithPartialData];
        expectedResult = service.addCommunityMessageToCollectionIfMissing(communityMessageCollection, communityMessage);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(communityMessage);
      });

      it('should add only unique CommunityMessage to an array', () => {
        const communityMessageArray: ICommunityMessage[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const communityMessageCollection: ICommunityMessage[] = [sampleWithRequiredData];
        expectedResult = service.addCommunityMessageToCollectionIfMissing(communityMessageCollection, ...communityMessageArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const communityMessage: ICommunityMessage = sampleWithRequiredData;
        const communityMessage2: ICommunityMessage = sampleWithPartialData;
        expectedResult = service.addCommunityMessageToCollectionIfMissing([], communityMessage, communityMessage2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(communityMessage);
        expect(expectedResult).toContain(communityMessage2);
      });

      it('should accept null and undefined values', () => {
        const communityMessage: ICommunityMessage = sampleWithRequiredData;
        expectedResult = service.addCommunityMessageToCollectionIfMissing([], null, communityMessage, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(communityMessage);
      });

      it('should return initial array if no CommunityMessage is added', () => {
        const communityMessageCollection: ICommunityMessage[] = [sampleWithRequiredData];
        expectedResult = service.addCommunityMessageToCollectionIfMissing(communityMessageCollection, undefined, null);
        expect(expectedResult).toEqual(communityMessageCollection);
      });
    });

    describe('compareCommunityMessage', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCommunityMessage(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCommunityMessage(entity1, entity2);
        const compareResult2 = service.compareCommunityMessage(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCommunityMessage(entity1, entity2);
        const compareResult2 = service.compareCommunityMessage(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCommunityMessage(entity1, entity2);
        const compareResult2 = service.compareCommunityMessage(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
