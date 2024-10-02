import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IMessageToUser } from '../message-to-user.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../message-to-user.test-samples';

import { MessageToUserService, RestMessageToUser } from './message-to-user.service';

const requireRestSample: RestMessageToUser = {
  ...sampleWithRequiredData,
  readAt: sampleWithRequiredData.readAt?.toJSON(),
};

describe('MessageToUser Service', () => {
  let service: MessageToUserService;
  let httpMock: HttpTestingController;
  let expectedResult: IMessageToUser | IMessageToUser[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(MessageToUserService);
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

    it('should create a MessageToUser', () => {
      const messageToUser = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(messageToUser).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MessageToUser', () => {
      const messageToUser = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(messageToUser).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MessageToUser', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MessageToUser', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MessageToUser', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMessageToUserToCollectionIfMissing', () => {
      it('should add a MessageToUser to an empty array', () => {
        const messageToUser: IMessageToUser = sampleWithRequiredData;
        expectedResult = service.addMessageToUserToCollectionIfMissing([], messageToUser);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(messageToUser);
      });

      it('should not add a MessageToUser to an array that contains it', () => {
        const messageToUser: IMessageToUser = sampleWithRequiredData;
        const messageToUserCollection: IMessageToUser[] = [
          {
            ...messageToUser,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMessageToUserToCollectionIfMissing(messageToUserCollection, messageToUser);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MessageToUser to an array that doesn't contain it", () => {
        const messageToUser: IMessageToUser = sampleWithRequiredData;
        const messageToUserCollection: IMessageToUser[] = [sampleWithPartialData];
        expectedResult = service.addMessageToUserToCollectionIfMissing(messageToUserCollection, messageToUser);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(messageToUser);
      });

      it('should add only unique MessageToUser to an array', () => {
        const messageToUserArray: IMessageToUser[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const messageToUserCollection: IMessageToUser[] = [sampleWithRequiredData];
        expectedResult = service.addMessageToUserToCollectionIfMissing(messageToUserCollection, ...messageToUserArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const messageToUser: IMessageToUser = sampleWithRequiredData;
        const messageToUser2: IMessageToUser = sampleWithPartialData;
        expectedResult = service.addMessageToUserToCollectionIfMissing([], messageToUser, messageToUser2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(messageToUser);
        expect(expectedResult).toContain(messageToUser2);
      });

      it('should accept null and undefined values', () => {
        const messageToUser: IMessageToUser = sampleWithRequiredData;
        expectedResult = service.addMessageToUserToCollectionIfMissing([], null, messageToUser, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(messageToUser);
      });

      it('should return initial array if no MessageToUser is added', () => {
        const messageToUserCollection: IMessageToUser[] = [sampleWithRequiredData];
        expectedResult = service.addMessageToUserToCollectionIfMissing(messageToUserCollection, undefined, null);
        expect(expectedResult).toEqual(messageToUserCollection);
      });
    });

    describe('compareMessageToUser', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMessageToUser(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMessageToUser(entity1, entity2);
        const compareResult2 = service.compareMessageToUser(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMessageToUser(entity1, entity2);
        const compareResult2 = service.compareMessageToUser(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMessageToUser(entity1, entity2);
        const compareResult2 = service.compareMessageToUser(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
