import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../quiz-session.test-samples';

import { QuizSessionFormService } from './quiz-session-form.service';

describe('QuizSession Form Service', () => {
  let service: QuizSessionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizSessionFormService);
  });

  describe('Service methods', () => {
    describe('createQuizSessionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createQuizSessionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            startTime: expect.any(Object),
            endTime: expect.any(Object),
            quizSessionEnum: expect.any(Object),
            student: expect.any(Object),
            quiz: expect.any(Object),
          }),
        );
      });

      it('passing IQuizSession should create a new form with FormGroup', () => {
        const formGroup = service.createQuizSessionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            startTime: expect.any(Object),
            endTime: expect.any(Object),
            quizSessionEnum: expect.any(Object),
            student: expect.any(Object),
            quiz: expect.any(Object),
          }),
        );
      });
    });

    describe('getQuizSession', () => {
      it('should return NewQuizSession for default QuizSession initial value', () => {
        const formGroup = service.createQuizSessionFormGroup(sampleWithNewData);

        const quizSession = service.getQuizSession(formGroup) as any;

        expect(quizSession).toMatchObject(sampleWithNewData);
      });

      it('should return NewQuizSession for empty QuizSession initial value', () => {
        const formGroup = service.createQuizSessionFormGroup();

        const quizSession = service.getQuizSession(formGroup) as any;

        expect(quizSession).toMatchObject({});
      });

      it('should return IQuizSession', () => {
        const formGroup = service.createQuizSessionFormGroup(sampleWithRequiredData);

        const quizSession = service.getQuizSession(formGroup) as any;

        expect(quizSession).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IQuizSession should not enable id FormControl', () => {
        const formGroup = service.createQuizSessionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewQuizSession should disable id FormControl', () => {
        const formGroup = service.createQuizSessionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
