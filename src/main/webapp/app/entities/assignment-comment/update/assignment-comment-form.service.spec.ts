import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../assignment-comment.test-samples';

import { AssignmentCommentFormService } from './assignment-comment-form.service';

describe('AssignmentComment Form Service', () => {
  let service: AssignmentCommentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentCommentFormService);
  });

  describe('Service methods', () => {
    describe('createAssignmentCommentFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAssignmentCommentFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            comment: expect.any(Object),
            commentDate: expect.any(Object),
            submissionAssignment: expect.any(Object),
            assignment: expect.any(Object),
            student: expect.any(Object),
            teacher: expect.any(Object),
          }),
        );
      });

      it('passing IAssignmentComment should create a new form with FormGroup', () => {
        const formGroup = service.createAssignmentCommentFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            comment: expect.any(Object),
            commentDate: expect.any(Object),
            submissionAssignment: expect.any(Object),
            assignment: expect.any(Object),
            student: expect.any(Object),
            teacher: expect.any(Object),
          }),
        );
      });
    });

    describe('getAssignmentComment', () => {
      it('should return NewAssignmentComment for default AssignmentComment initial value', () => {
        const formGroup = service.createAssignmentCommentFormGroup(sampleWithNewData);

        const assignmentComment = service.getAssignmentComment(formGroup) as any;

        expect(assignmentComment).toMatchObject(sampleWithNewData);
      });

      it('should return NewAssignmentComment for empty AssignmentComment initial value', () => {
        const formGroup = service.createAssignmentCommentFormGroup();

        const assignmentComment = service.getAssignmentComment(formGroup) as any;

        expect(assignmentComment).toMatchObject({});
      });

      it('should return IAssignmentComment', () => {
        const formGroup = service.createAssignmentCommentFormGroup(sampleWithRequiredData);

        const assignmentComment = service.getAssignmentComment(formGroup) as any;

        expect(assignmentComment).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAssignmentComment should not enable id FormControl', () => {
        const formGroup = service.createAssignmentCommentFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAssignmentComment should disable id FormControl', () => {
        const formGroup = service.createAssignmentCommentFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
