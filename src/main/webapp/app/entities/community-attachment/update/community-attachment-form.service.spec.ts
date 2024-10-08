import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../community-attachment.test-samples';

import { CommunityAttachmentFormService } from './community-attachment-form.service';

describe('CommunityAttachment Form Service', () => {
  let service: CommunityAttachmentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityAttachmentFormService);
  });

  describe('Service methods', () => {
    describe('createCommunityAttachmentFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCommunityAttachmentFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            community: expect.any(Object),
            attachment: expect.any(Object),
          }),
        );
      });

      it('passing ICommunityAttachment should create a new form with FormGroup', () => {
        const formGroup = service.createCommunityAttachmentFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            community: expect.any(Object),
            attachment: expect.any(Object),
          }),
        );
      });
    });

    describe('getCommunityAttachment', () => {
      it('should return NewCommunityAttachment for default CommunityAttachment initial value', () => {
        const formGroup = service.createCommunityAttachmentFormGroup(sampleWithNewData);

        const communityAttachment = service.getCommunityAttachment(formGroup) as any;

        expect(communityAttachment).toMatchObject(sampleWithNewData);
      });

      it('should return NewCommunityAttachment for empty CommunityAttachment initial value', () => {
        const formGroup = service.createCommunityAttachmentFormGroup();

        const communityAttachment = service.getCommunityAttachment(formGroup) as any;

        expect(communityAttachment).toMatchObject({});
      });

      it('should return ICommunityAttachment', () => {
        const formGroup = service.createCommunityAttachmentFormGroup(sampleWithRequiredData);

        const communityAttachment = service.getCommunityAttachment(formGroup) as any;

        expect(communityAttachment).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICommunityAttachment should not enable id FormControl', () => {
        const formGroup = service.createCommunityAttachmentFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCommunityAttachment should disable id FormControl', () => {
        const formGroup = service.createCommunityAttachmentFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
