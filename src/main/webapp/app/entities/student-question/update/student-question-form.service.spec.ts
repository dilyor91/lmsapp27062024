import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../student-question.test-samples';

import { StudentQuestionFormService } from './student-question-form.service';

describe('StudentQuestion Form Service', () => {
  let service: StudentQuestionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentQuestionFormService);
  });

  describe('Service methods', () => {
    describe('createStudentQuestionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createStudentQuestionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ordNum: expect.any(Object),
            quizSession: expect.any(Object),
            question: expect.any(Object),
          }),
        );
      });

      it('passing IStudentQuestion should create a new form with FormGroup', () => {
        const formGroup = service.createStudentQuestionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ordNum: expect.any(Object),
            quizSession: expect.any(Object),
            question: expect.any(Object),
          }),
        );
      });
    });

    describe('getStudentQuestion', () => {
      it('should return NewStudentQuestion for default StudentQuestion initial value', () => {
        const formGroup = service.createStudentQuestionFormGroup(sampleWithNewData);

        const studentQuestion = service.getStudentQuestion(formGroup) as any;

        expect(studentQuestion).toMatchObject(sampleWithNewData);
      });

      it('should return NewStudentQuestion for empty StudentQuestion initial value', () => {
        const formGroup = service.createStudentQuestionFormGroup();

        const studentQuestion = service.getStudentQuestion(formGroup) as any;

        expect(studentQuestion).toMatchObject({});
      });

      it('should return IStudentQuestion', () => {
        const formGroup = service.createStudentQuestionFormGroup(sampleWithRequiredData);

        const studentQuestion = service.getStudentQuestion(formGroup) as any;

        expect(studentQuestion).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IStudentQuestion should not enable id FormControl', () => {
        const formGroup = service.createStudentQuestionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewStudentQuestion should disable id FormControl', () => {
        const formGroup = service.createStudentQuestionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
