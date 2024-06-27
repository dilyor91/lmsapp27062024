import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../quiz-course-section.test-samples';

import { QuizCourseSectionFormService } from './quiz-course-section-form.service';

describe('QuizCourseSection Form Service', () => {
  let service: QuizCourseSectionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizCourseSectionFormService);
  });

  describe('Service methods', () => {
    describe('createQuizCourseSectionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createQuizCourseSectionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
            course: expect.any(Object),
            courseSection: expect.any(Object),
            quiz: expect.any(Object),
          }),
        );
      });

      it('passing IQuizCourseSection should create a new form with FormGroup', () => {
        const formGroup = service.createQuizCourseSectionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
            course: expect.any(Object),
            courseSection: expect.any(Object),
            quiz: expect.any(Object),
          }),
        );
      });
    });

    describe('getQuizCourseSection', () => {
      it('should return NewQuizCourseSection for default QuizCourseSection initial value', () => {
        const formGroup = service.createQuizCourseSectionFormGroup(sampleWithNewData);

        const quizCourseSection = service.getQuizCourseSection(formGroup) as any;

        expect(quizCourseSection).toMatchObject(sampleWithNewData);
      });

      it('should return NewQuizCourseSection for empty QuizCourseSection initial value', () => {
        const formGroup = service.createQuizCourseSectionFormGroup();

        const quizCourseSection = service.getQuizCourseSection(formGroup) as any;

        expect(quizCourseSection).toMatchObject({});
      });

      it('should return IQuizCourseSection', () => {
        const formGroup = service.createQuizCourseSectionFormGroup(sampleWithRequiredData);

        const quizCourseSection = service.getQuizCourseSection(formGroup) as any;

        expect(quizCourseSection).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IQuizCourseSection should not enable id FormControl', () => {
        const formGroup = service.createQuizCourseSectionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewQuizCourseSection should disable id FormControl', () => {
        const formGroup = service.createQuizCourseSectionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
