import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../exam-result.test-samples';

import { ExamResultFormService } from './exam-result-form.service';

describe('ExamResult Form Service', () => {
  let service: ExamResultFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamResultFormService);
  });

  describe('Service methods', () => {
    describe('createExamResultFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createExamResultFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            point: expect.any(Object),
            gradedDate: expect.any(Object),
            student: expect.any(Object),
            exam: expect.any(Object),
            course: expect.any(Object),
          }),
        );
      });

      it('passing IExamResult should create a new form with FormGroup', () => {
        const formGroup = service.createExamResultFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            point: expect.any(Object),
            gradedDate: expect.any(Object),
            student: expect.any(Object),
            exam: expect.any(Object),
            course: expect.any(Object),
          }),
        );
      });
    });

    describe('getExamResult', () => {
      it('should return NewExamResult for default ExamResult initial value', () => {
        const formGroup = service.createExamResultFormGroup(sampleWithNewData);

        const examResult = service.getExamResult(formGroup) as any;

        expect(examResult).toMatchObject(sampleWithNewData);
      });

      it('should return NewExamResult for empty ExamResult initial value', () => {
        const formGroup = service.createExamResultFormGroup();

        const examResult = service.getExamResult(formGroup) as any;

        expect(examResult).toMatchObject({});
      });

      it('should return IExamResult', () => {
        const formGroup = service.createExamResultFormGroup(sampleWithRequiredData);

        const examResult = service.getExamResult(formGroup) as any;

        expect(examResult).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IExamResult should not enable id FormControl', () => {
        const formGroup = service.createExamResultFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewExamResult should disable id FormControl', () => {
        const formGroup = service.createExamResultFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
