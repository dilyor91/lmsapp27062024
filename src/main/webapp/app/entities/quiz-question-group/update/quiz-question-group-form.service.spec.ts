import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../quiz-question-group.test-samples';

import { QuizQuestionGroupFormService } from './quiz-question-group-form.service';

describe('QuizQuestionGroup Form Service', () => {
  let service: QuizQuestionGroupFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizQuestionGroupFormService);
  });

  describe('Service methods', () => {
    describe('createQuizQuestionGroupFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createQuizQuestionGroupFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            questionCount: expect.any(Object),
            quiz: expect.any(Object),
            questionGroup: expect.any(Object),
          }),
        );
      });

      it('passing IQuizQuestionGroup should create a new form with FormGroup', () => {
        const formGroup = service.createQuizQuestionGroupFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            questionCount: expect.any(Object),
            quiz: expect.any(Object),
            questionGroup: expect.any(Object),
          }),
        );
      });
    });

    describe('getQuizQuestionGroup', () => {
      it('should return NewQuizQuestionGroup for default QuizQuestionGroup initial value', () => {
        const formGroup = service.createQuizQuestionGroupFormGroup(sampleWithNewData);

        const quizQuestionGroup = service.getQuizQuestionGroup(formGroup) as any;

        expect(quizQuestionGroup).toMatchObject(sampleWithNewData);
      });

      it('should return NewQuizQuestionGroup for empty QuizQuestionGroup initial value', () => {
        const formGroup = service.createQuizQuestionGroupFormGroup();

        const quizQuestionGroup = service.getQuizQuestionGroup(formGroup) as any;

        expect(quizQuestionGroup).toMatchObject({});
      });

      it('should return IQuizQuestionGroup', () => {
        const formGroup = service.createQuizQuestionGroupFormGroup(sampleWithRequiredData);

        const quizQuestionGroup = service.getQuizQuestionGroup(formGroup) as any;

        expect(quizQuestionGroup).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IQuizQuestionGroup should not enable id FormControl', () => {
        const formGroup = service.createQuizQuestionGroupFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewQuizQuestionGroup should disable id FormControl', () => {
        const formGroup = service.createQuizQuestionGroupFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
