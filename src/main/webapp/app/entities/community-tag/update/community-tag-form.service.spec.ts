import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../community-tag.test-samples';

import { CommunityTagFormService } from './community-tag-form.service';

describe('CommunityTag Form Service', () => {
  let service: CommunityTagFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityTagFormService);
  });

  describe('Service methods', () => {
    describe('createCommunityTagFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCommunityTagFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            community: expect.any(Object),
            tag: expect.any(Object),
          }),
        );
      });

      it('passing ICommunityTag should create a new form with FormGroup', () => {
        const formGroup = service.createCommunityTagFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            community: expect.any(Object),
            tag: expect.any(Object),
          }),
        );
      });
    });

    describe('getCommunityTag', () => {
      it('should return NewCommunityTag for default CommunityTag initial value', () => {
        const formGroup = service.createCommunityTagFormGroup(sampleWithNewData);

        const communityTag = service.getCommunityTag(formGroup) as any;

        expect(communityTag).toMatchObject(sampleWithNewData);
      });

      it('should return NewCommunityTag for empty CommunityTag initial value', () => {
        const formGroup = service.createCommunityTagFormGroup();

        const communityTag = service.getCommunityTag(formGroup) as any;

        expect(communityTag).toMatchObject({});
      });

      it('should return ICommunityTag', () => {
        const formGroup = service.createCommunityTagFormGroup(sampleWithRequiredData);

        const communityTag = service.getCommunityTag(formGroup) as any;

        expect(communityTag).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICommunityTag should not enable id FormControl', () => {
        const formGroup = service.createCommunityTagFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCommunityTag should disable id FormControl', () => {
        const formGroup = service.createCommunityTagFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
