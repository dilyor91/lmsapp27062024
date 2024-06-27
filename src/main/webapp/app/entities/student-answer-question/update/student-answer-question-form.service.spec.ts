import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../student-answer-question.test-samples';

import { StudentAnswerQuestionFormService } from './student-answer-question-form.service';

describe('StudentAnswerQuestion Form Service', () => {
  let service: StudentAnswerQuestionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentAnswerQuestionFormService);
  });

  describe('Service methods', () => {
    describe('createStudentAnswerQuestionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createStudentAnswerQuestionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            isCorrect: expect.any(Object),
            question: expect.any(Object),
            option: expect.any(Object),
            quizSession: expect.any(Object),
          }),
        );
      });

      it('passing IStudentAnswerQuestion should create a new form with FormGroup', () => {
        const formGroup = service.createStudentAnswerQuestionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            isCorrect: expect.any(Object),
            question: expect.any(Object),
            option: expect.any(Object),
            quizSession: expect.any(Object),
          }),
        );
      });
    });

    describe('getStudentAnswerQuestion', () => {
      it('should return NewStudentAnswerQuestion for default StudentAnswerQuestion initial value', () => {
        const formGroup = service.createStudentAnswerQuestionFormGroup(sampleWithNewData);

        const studentAnswerQuestion = service.getStudentAnswerQuestion(formGroup) as any;

        expect(studentAnswerQuestion).toMatchObject(sampleWithNewData);
      });

      it('should return NewStudentAnswerQuestion for empty StudentAnswerQuestion initial value', () => {
        const formGroup = service.createStudentAnswerQuestionFormGroup();

        const studentAnswerQuestion = service.getStudentAnswerQuestion(formGroup) as any;

        expect(studentAnswerQuestion).toMatchObject({});
      });

      it('should return IStudentAnswerQuestion', () => {
        const formGroup = service.createStudentAnswerQuestionFormGroup(sampleWithRequiredData);

        const studentAnswerQuestion = service.getStudentAnswerQuestion(formGroup) as any;

        expect(studentAnswerQuestion).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IStudentAnswerQuestion should not enable id FormControl', () => {
        const formGroup = service.createStudentAnswerQuestionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewStudentAnswerQuestion should disable id FormControl', () => {
        const formGroup = service.createStudentAnswerQuestionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
