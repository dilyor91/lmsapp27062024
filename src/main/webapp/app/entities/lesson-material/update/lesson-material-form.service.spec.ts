import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../lesson-material.test-samples';

import { LessonMaterialFormService } from './lesson-material-form.service';

describe('LessonMaterial Form Service', () => {
  let service: LessonMaterialFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonMaterialFormService);
  });

  describe('Service methods', () => {
    describe('createLessonMaterialFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLessonMaterialFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            description: expect.any(Object),
            lessonFileType: expect.any(Object),
            attachment: expect.any(Object),
            lesson: expect.any(Object),
          }),
        );
      });

      it('passing ILessonMaterial should create a new form with FormGroup', () => {
        const formGroup = service.createLessonMaterialFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            description: expect.any(Object),
            lessonFileType: expect.any(Object),
            attachment: expect.any(Object),
            lesson: expect.any(Object),
          }),
        );
      });
    });

    describe('getLessonMaterial', () => {
      it('should return NewLessonMaterial for default LessonMaterial initial value', () => {
        const formGroup = service.createLessonMaterialFormGroup(sampleWithNewData);

        const lessonMaterial = service.getLessonMaterial(formGroup) as any;

        expect(lessonMaterial).toMatchObject(sampleWithNewData);
      });

      it('should return NewLessonMaterial for empty LessonMaterial initial value', () => {
        const formGroup = service.createLessonMaterialFormGroup();

        const lessonMaterial = service.getLessonMaterial(formGroup) as any;

        expect(lessonMaterial).toMatchObject({});
      });

      it('should return ILessonMaterial', () => {
        const formGroup = service.createLessonMaterialFormGroup(sampleWithRequiredData);

        const lessonMaterial = service.getLessonMaterial(formGroup) as any;

        expect(lessonMaterial).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILessonMaterial should not enable id FormControl', () => {
        const formGroup = service.createLessonMaterialFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLessonMaterial should disable id FormControl', () => {
        const formGroup = service.createLessonMaterialFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
