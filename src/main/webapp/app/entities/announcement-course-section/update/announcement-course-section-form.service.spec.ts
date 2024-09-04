import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../announcement-course-section.test-samples';

import { AnnouncementCourseSectionFormService } from './announcement-course-section-form.service';

describe('AnnouncementCourseSection Form Service', () => {
  let service: AnnouncementCourseSectionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnouncementCourseSectionFormService);
  });

  describe('Service methods', () => {
    describe('createAnnouncementCourseSectionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAnnouncementCourseSectionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            announcement: expect.any(Object),
            course: expect.any(Object),
            courseSection: expect.any(Object),
          }),
        );
      });

      it('passing IAnnouncementCourseSection should create a new form with FormGroup', () => {
        const formGroup = service.createAnnouncementCourseSectionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            announcement: expect.any(Object),
            course: expect.any(Object),
            courseSection: expect.any(Object),
          }),
        );
      });
    });

    describe('getAnnouncementCourseSection', () => {
      it('should return NewAnnouncementCourseSection for default AnnouncementCourseSection initial value', () => {
        const formGroup = service.createAnnouncementCourseSectionFormGroup(sampleWithNewData);

        const announcementCourseSection = service.getAnnouncementCourseSection(formGroup) as any;

        expect(announcementCourseSection).toMatchObject(sampleWithNewData);
      });

      it('should return NewAnnouncementCourseSection for empty AnnouncementCourseSection initial value', () => {
        const formGroup = service.createAnnouncementCourseSectionFormGroup();

        const announcementCourseSection = service.getAnnouncementCourseSection(formGroup) as any;

        expect(announcementCourseSection).toMatchObject({});
      });

      it('should return IAnnouncementCourseSection', () => {
        const formGroup = service.createAnnouncementCourseSectionFormGroup(sampleWithRequiredData);

        const announcementCourseSection = service.getAnnouncementCourseSection(formGroup) as any;

        expect(announcementCourseSection).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAnnouncementCourseSection should not enable id FormControl', () => {
        const formGroup = service.createAnnouncementCourseSectionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAnnouncementCourseSection should disable id FormControl', () => {
        const formGroup = service.createAnnouncementCourseSectionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
