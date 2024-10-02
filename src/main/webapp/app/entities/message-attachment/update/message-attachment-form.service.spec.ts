import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../message-attachment.test-samples';

import { MessageAttachmentFormService } from './message-attachment-form.service';

describe('MessageAttachment Form Service', () => {
  let service: MessageAttachmentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageAttachmentFormService);
  });

  describe('Service methods', () => {
    describe('createMessageAttachmentFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMessageAttachmentFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            message: expect.any(Object),
            attachment: expect.any(Object),
          }),
        );
      });

      it('passing IMessageAttachment should create a new form with FormGroup', () => {
        const formGroup = service.createMessageAttachmentFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            message: expect.any(Object),
            attachment: expect.any(Object),
          }),
        );
      });
    });

    describe('getMessageAttachment', () => {
      it('should return NewMessageAttachment for default MessageAttachment initial value', () => {
        const formGroup = service.createMessageAttachmentFormGroup(sampleWithNewData);

        const messageAttachment = service.getMessageAttachment(formGroup) as any;

        expect(messageAttachment).toMatchObject(sampleWithNewData);
      });

      it('should return NewMessageAttachment for empty MessageAttachment initial value', () => {
        const formGroup = service.createMessageAttachmentFormGroup();

        const messageAttachment = service.getMessageAttachment(formGroup) as any;

        expect(messageAttachment).toMatchObject({});
      });

      it('should return IMessageAttachment', () => {
        const formGroup = service.createMessageAttachmentFormGroup(sampleWithRequiredData);

        const messageAttachment = service.getMessageAttachment(formGroup) as any;

        expect(messageAttachment).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMessageAttachment should not enable id FormControl', () => {
        const formGroup = service.createMessageAttachmentFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMessageAttachment should disable id FormControl', () => {
        const formGroup = service.createMessageAttachmentFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
