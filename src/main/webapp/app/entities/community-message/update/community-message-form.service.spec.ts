import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../community-message.test-samples';

import { CommunityMessageFormService } from './community-message-form.service';

describe('CommunityMessage Form Service', () => {
  let service: CommunityMessageFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityMessageFormService);
  });

  describe('Service methods', () => {
    describe('createCommunityMessageFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCommunityMessageFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            message: expect.any(Object),
            senderDate: expect.any(Object),
            community: expect.any(Object),
            sender: expect.any(Object),
          }),
        );
      });

      it('passing ICommunityMessage should create a new form with FormGroup', () => {
        const formGroup = service.createCommunityMessageFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            message: expect.any(Object),
            senderDate: expect.any(Object),
            community: expect.any(Object),
            sender: expect.any(Object),
          }),
        );
      });
    });

    describe('getCommunityMessage', () => {
      it('should return NewCommunityMessage for default CommunityMessage initial value', () => {
        const formGroup = service.createCommunityMessageFormGroup(sampleWithNewData);

        const communityMessage = service.getCommunityMessage(formGroup) as any;

        expect(communityMessage).toMatchObject(sampleWithNewData);
      });

      it('should return NewCommunityMessage for empty CommunityMessage initial value', () => {
        const formGroup = service.createCommunityMessageFormGroup();

        const communityMessage = service.getCommunityMessage(formGroup) as any;

        expect(communityMessage).toMatchObject({});
      });

      it('should return ICommunityMessage', () => {
        const formGroup = service.createCommunityMessageFormGroup(sampleWithRequiredData);

        const communityMessage = service.getCommunityMessage(formGroup) as any;

        expect(communityMessage).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICommunityMessage should not enable id FormControl', () => {
        const formGroup = service.createCommunityMessageFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCommunityMessage should disable id FormControl', () => {
        const formGroup = service.createCommunityMessageFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
