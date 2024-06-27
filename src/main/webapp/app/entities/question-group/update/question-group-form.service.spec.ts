import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../question-group.test-samples';

import { QuestionGroupFormService } from './question-group-form.service';

describe('QuestionGroup Form Service', () => {
  let service: QuestionGroupFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionGroupFormService);
  });

  describe('Service methods', () => {
    describe('createQuestionGroupFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createQuestionGroupFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            course: expect.any(Object),
          }),
        );
      });

      it('passing IQuestionGroup should create a new form with FormGroup', () => {
        const formGroup = service.createQuestionGroupFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            course: expect.any(Object),
          }),
        );
      });
    });

    describe('getQuestionGroup', () => {
      it('should return NewQuestionGroup for default QuestionGroup initial value', () => {
        const formGroup = service.createQuestionGroupFormGroup(sampleWithNewData);

        const questionGroup = service.getQuestionGroup(formGroup) as any;

        expect(questionGroup).toMatchObject(sampleWithNewData);
      });

      it('should return NewQuestionGroup for empty QuestionGroup initial value', () => {
        const formGroup = service.createQuestionGroupFormGroup();

        const questionGroup = service.getQuestionGroup(formGroup) as any;

        expect(questionGroup).toMatchObject({});
      });

      it('should return IQuestionGroup', () => {
        const formGroup = service.createQuestionGroupFormGroup(sampleWithRequiredData);

        const questionGroup = service.getQuestionGroup(formGroup) as any;

        expect(questionGroup).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IQuestionGroup should not enable id FormControl', () => {
        const formGroup = service.createQuestionGroupFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewQuestionGroup should disable id FormControl', () => {
        const formGroup = service.createQuestionGroupFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
