import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../student-option.test-samples';

import { StudentOptionFormService } from './student-option-form.service';

describe('StudentOption Form Service', () => {
  let service: StudentOptionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentOptionFormService);
  });

  describe('Service methods', () => {
    describe('createStudentOptionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createStudentOptionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ordNum: expect.any(Object),
            studentQuestion: expect.any(Object),
            option: expect.any(Object),
          }),
        );
      });

      it('passing IStudentOption should create a new form with FormGroup', () => {
        const formGroup = service.createStudentOptionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ordNum: expect.any(Object),
            studentQuestion: expect.any(Object),
            option: expect.any(Object),
          }),
        );
      });
    });

    describe('getStudentOption', () => {
      it('should return NewStudentOption for default StudentOption initial value', () => {
        const formGroup = service.createStudentOptionFormGroup(sampleWithNewData);

        const studentOption = service.getStudentOption(formGroup) as any;

        expect(studentOption).toMatchObject(sampleWithNewData);
      });

      it('should return NewStudentOption for empty StudentOption initial value', () => {
        const formGroup = service.createStudentOptionFormGroup();

        const studentOption = service.getStudentOption(formGroup) as any;

        expect(studentOption).toMatchObject({});
      });

      it('should return IStudentOption', () => {
        const formGroup = service.createStudentOptionFormGroup(sampleWithRequiredData);

        const studentOption = service.getStudentOption(formGroup) as any;

        expect(studentOption).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IStudentOption should not enable id FormControl', () => {
        const formGroup = service.createStudentOptionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewStudentOption should disable id FormControl', () => {
        const formGroup = service.createStudentOptionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
