import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../submission-assignment.test-samples';

import { SubmissionAssignmentFormService } from './submission-assignment-form.service';

describe('SubmissionAssignment Form Service', () => {
  let service: SubmissionAssignmentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmissionAssignmentFormService);
  });

  describe('Service methods', () => {
    describe('createSubmissionAssignmentFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSubmissionAssignmentFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            submissionDate: expect.any(Object),
            content: expect.any(Object),
            comment: expect.any(Object),
            attempsNumber: expect.any(Object),
            student: expect.any(Object),
            course: expect.any(Object),
            assignment: expect.any(Object),
            attachment: expect.any(Object),
          }),
        );
      });

      it('passing ISubmissionAssignment should create a new form with FormGroup', () => {
        const formGroup = service.createSubmissionAssignmentFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            submissionDate: expect.any(Object),
            content: expect.any(Object),
            comment: expect.any(Object),
            attempsNumber: expect.any(Object),
            student: expect.any(Object),
            course: expect.any(Object),
            assignment: expect.any(Object),
            attachment: expect.any(Object),
          }),
        );
      });
    });

    describe('getSubmissionAssignment', () => {
      it('should return NewSubmissionAssignment for default SubmissionAssignment initial value', () => {
        const formGroup = service.createSubmissionAssignmentFormGroup(sampleWithNewData);

        const submissionAssignment = service.getSubmissionAssignment(formGroup) as any;

        expect(submissionAssignment).toMatchObject(sampleWithNewData);
      });

      it('should return NewSubmissionAssignment for empty SubmissionAssignment initial value', () => {
        const formGroup = service.createSubmissionAssignmentFormGroup();

        const submissionAssignment = service.getSubmissionAssignment(formGroup) as any;

        expect(submissionAssignment).toMatchObject({});
      });

      it('should return ISubmissionAssignment', () => {
        const formGroup = service.createSubmissionAssignmentFormGroup(sampleWithRequiredData);

        const submissionAssignment = service.getSubmissionAssignment(formGroup) as any;

        expect(submissionAssignment).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISubmissionAssignment should not enable id FormControl', () => {
        const formGroup = service.createSubmissionAssignmentFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSubmissionAssignment should disable id FormControl', () => {
        const formGroup = service.createSubmissionAssignmentFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
