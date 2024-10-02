import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../message-to-user.test-samples';

import { MessageToUserFormService } from './message-to-user-form.service';

describe('MessageToUser Form Service', () => {
  let service: MessageToUserFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageToUserFormService);
  });

  describe('Service methods', () => {
    describe('createMessageToUserFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMessageToUserFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            read: expect.any(Object),
            readAt: expect.any(Object),
            deleted: expect.any(Object),
            message: expect.any(Object),
            receiver: expect.any(Object),
          }),
        );
      });

      it('passing IMessageToUser should create a new form with FormGroup', () => {
        const formGroup = service.createMessageToUserFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            read: expect.any(Object),
            readAt: expect.any(Object),
            deleted: expect.any(Object),
            message: expect.any(Object),
            receiver: expect.any(Object),
          }),
        );
      });
    });

    describe('getMessageToUser', () => {
      it('should return NewMessageToUser for default MessageToUser initial value', () => {
        const formGroup = service.createMessageToUserFormGroup(sampleWithNewData);

        const messageToUser = service.getMessageToUser(formGroup) as any;

        expect(messageToUser).toMatchObject(sampleWithNewData);
      });

      it('should return NewMessageToUser for empty MessageToUser initial value', () => {
        const formGroup = service.createMessageToUserFormGroup();

        const messageToUser = service.getMessageToUser(formGroup) as any;

        expect(messageToUser).toMatchObject({});
      });

      it('should return IMessageToUser', () => {
        const formGroup = service.createMessageToUserFormGroup(sampleWithRequiredData);

        const messageToUser = service.getMessageToUser(formGroup) as any;

        expect(messageToUser).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMessageToUser should not enable id FormControl', () => {
        const formGroup = service.createMessageToUserFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMessageToUser should disable id FormControl', () => {
        const formGroup = service.createMessageToUserFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
