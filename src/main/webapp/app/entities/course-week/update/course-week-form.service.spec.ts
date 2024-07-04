import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../course-week.test-samples';

import { CourseWeekFormService } from './course-week-form.service';

describe('CourseWeek Form Service', () => {
  let service: CourseWeekFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseWeekFormService);
  });

  describe('Service methods', () => {
    describe('createCourseWeekFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCourseWeekFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            published: expect.any(Object),
            weekDate: expect.any(Object),
            course: expect.any(Object),
          }),
        );
      });

      it('passing ICourseWeek should create a new form with FormGroup', () => {
        const formGroup = service.createCourseWeekFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            published: expect.any(Object),
            weekDate: expect.any(Object),
            course: expect.any(Object),
          }),
        );
      });
    });

    describe('getCourseWeek', () => {
      it('should return NewCourseWeek for default CourseWeek initial value', () => {
        const formGroup = service.createCourseWeekFormGroup(sampleWithNewData);

        const courseWeek = service.getCourseWeek(formGroup) as any;

        expect(courseWeek).toMatchObject(sampleWithNewData);
      });

      it('should return NewCourseWeek for empty CourseWeek initial value', () => {
        const formGroup = service.createCourseWeekFormGroup();

        const courseWeek = service.getCourseWeek(formGroup) as any;

        expect(courseWeek).toMatchObject({});
      });

      it('should return ICourseWeek', () => {
        const formGroup = service.createCourseWeekFormGroup(sampleWithRequiredData);

        const courseWeek = service.getCourseWeek(formGroup) as any;

        expect(courseWeek).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICourseWeek should not enable id FormControl', () => {
        const formGroup = service.createCourseWeekFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCourseWeek should disable id FormControl', () => {
        const formGroup = service.createCourseWeekFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
