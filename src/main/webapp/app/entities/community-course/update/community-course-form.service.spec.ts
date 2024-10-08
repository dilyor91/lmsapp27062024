import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../community-course.test-samples';

import { CommunityCourseFormService } from './community-course-form.service';

describe('CommunityCourse Form Service', () => {
  let service: CommunityCourseFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityCourseFormService);
  });

  describe('Service methods', () => {
    describe('createCommunityCourseFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCommunityCourseFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            community: expect.any(Object),
            course: expect.any(Object),
          }),
        );
      });

      it('passing ICommunityCourse should create a new form with FormGroup', () => {
        const formGroup = service.createCommunityCourseFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            community: expect.any(Object),
            course: expect.any(Object),
          }),
        );
      });
    });

    describe('getCommunityCourse', () => {
      it('should return NewCommunityCourse for default CommunityCourse initial value', () => {
        const formGroup = service.createCommunityCourseFormGroup(sampleWithNewData);

        const communityCourse = service.getCommunityCourse(formGroup) as any;

        expect(communityCourse).toMatchObject(sampleWithNewData);
      });

      it('should return NewCommunityCourse for empty CommunityCourse initial value', () => {
        const formGroup = service.createCommunityCourseFormGroup();

        const communityCourse = service.getCommunityCourse(formGroup) as any;

        expect(communityCourse).toMatchObject({});
      });

      it('should return ICommunityCourse', () => {
        const formGroup = service.createCommunityCourseFormGroup(sampleWithRequiredData);

        const communityCourse = service.getCommunityCourse(formGroup) as any;

        expect(communityCourse).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICommunityCourse should not enable id FormControl', () => {
        const formGroup = service.createCommunityCourseFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCommunityCourse should disable id FormControl', () => {
        const formGroup = service.createCommunityCourseFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
