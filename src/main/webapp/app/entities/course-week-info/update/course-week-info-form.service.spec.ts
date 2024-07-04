import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../course-week-info.test-samples';

import { CourseWeekInfoFormService } from './course-week-info-form.service';

describe('CourseWeekInfo Form Service', () => {
  let service: CourseWeekInfoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseWeekInfoFormService);
  });

  describe('Service methods', () => {
    describe('createCourseWeekInfoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCourseWeekInfoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            totalWeek: expect.any(Object),
            lessonPerWeek: expect.any(Object),
            startDate: expect.any(Object),
            weekDayCount: expect.any(Object),
            course: expect.any(Object),
          }),
        );
      });

      it('passing ICourseWeekInfo should create a new form with FormGroup', () => {
        const formGroup = service.createCourseWeekInfoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            totalWeek: expect.any(Object),
            lessonPerWeek: expect.any(Object),
            startDate: expect.any(Object),
            weekDayCount: expect.any(Object),
            course: expect.any(Object),
          }),
        );
      });
    });

    describe('getCourseWeekInfo', () => {
      it('should return NewCourseWeekInfo for default CourseWeekInfo initial value', () => {
        const formGroup = service.createCourseWeekInfoFormGroup(sampleWithNewData);

        const courseWeekInfo = service.getCourseWeekInfo(formGroup) as any;

        expect(courseWeekInfo).toMatchObject(sampleWithNewData);
      });

      it('should return NewCourseWeekInfo for empty CourseWeekInfo initial value', () => {
        const formGroup = service.createCourseWeekInfoFormGroup();

        const courseWeekInfo = service.getCourseWeekInfo(formGroup) as any;

        expect(courseWeekInfo).toMatchObject({});
      });

      it('should return ICourseWeekInfo', () => {
        const formGroup = service.createCourseWeekInfoFormGroup(sampleWithRequiredData);

        const courseWeekInfo = service.getCourseWeekInfo(formGroup) as any;

        expect(courseWeekInfo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICourseWeekInfo should not enable id FormControl', () => {
        const formGroup = service.createCourseWeekInfoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCourseWeekInfo should disable id FormControl', () => {
        const formGroup = service.createCourseWeekInfoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
