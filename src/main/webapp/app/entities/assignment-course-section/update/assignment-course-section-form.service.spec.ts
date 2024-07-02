import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../assignment-course-section.test-samples';

import { AssignmentCourseSectionFormService } from './assignment-course-section-form.service';

describe('AssignmentCourseSection Form Service', () => {
  let service: AssignmentCourseSectionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentCourseSectionFormService);
  });

  describe('Service methods', () => {
    describe('createAssignmentCourseSectionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAssignmentCourseSectionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
            assignment: expect.any(Object),
            course: expect.any(Object),
            courseSection: expect.any(Object),
          }),
        );
      });

      it('passing IAssignmentCourseSection should create a new form with FormGroup', () => {
        const formGroup = service.createAssignmentCourseSectionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
            assignment: expect.any(Object),
            course: expect.any(Object),
            courseSection: expect.any(Object),
          }),
        );
      });
    });

    describe('getAssignmentCourseSection', () => {
      it('should return NewAssignmentCourseSection for default AssignmentCourseSection initial value', () => {
        const formGroup = service.createAssignmentCourseSectionFormGroup(sampleWithNewData);

        const assignmentCourseSection = service.getAssignmentCourseSection(formGroup) as any;

        expect(assignmentCourseSection).toMatchObject(sampleWithNewData);
      });

      it('should return NewAssignmentCourseSection for empty AssignmentCourseSection initial value', () => {
        const formGroup = service.createAssignmentCourseSectionFormGroup();

        const assignmentCourseSection = service.getAssignmentCourseSection(formGroup) as any;

        expect(assignmentCourseSection).toMatchObject({});
      });

      it('should return IAssignmentCourseSection', () => {
        const formGroup = service.createAssignmentCourseSectionFormGroup(sampleWithRequiredData);

        const assignmentCourseSection = service.getAssignmentCourseSection(formGroup) as any;

        expect(assignmentCourseSection).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAssignmentCourseSection should not enable id FormControl', () => {
        const formGroup = service.createAssignmentCourseSectionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAssignmentCourseSection should disable id FormControl', () => {
        const formGroup = service.createAssignmentCourseSectionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
