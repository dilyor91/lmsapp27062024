import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../announcement-student-read.test-samples';

import { AnnouncementStudentReadFormService } from './announcement-student-read-form.service';

describe('AnnouncementStudentRead Form Service', () => {
  let service: AnnouncementStudentReadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnouncementStudentReadFormService);
  });

  describe('Service methods', () => {
    describe('createAnnouncementStudentReadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAnnouncementStudentReadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            read: expect.any(Object),
            readAt: expect.any(Object),
            announcement: expect.any(Object),
            student: expect.any(Object),
          }),
        );
      });

      it('passing IAnnouncementStudentRead should create a new form with FormGroup', () => {
        const formGroup = service.createAnnouncementStudentReadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            read: expect.any(Object),
            readAt: expect.any(Object),
            announcement: expect.any(Object),
            student: expect.any(Object),
          }),
        );
      });
    });

    describe('getAnnouncementStudentRead', () => {
      it('should return NewAnnouncementStudentRead for default AnnouncementStudentRead initial value', () => {
        const formGroup = service.createAnnouncementStudentReadFormGroup(sampleWithNewData);

        const announcementStudentRead = service.getAnnouncementStudentRead(formGroup) as any;

        expect(announcementStudentRead).toMatchObject(sampleWithNewData);
      });

      it('should return NewAnnouncementStudentRead for empty AnnouncementStudentRead initial value', () => {
        const formGroup = service.createAnnouncementStudentReadFormGroup();

        const announcementStudentRead = service.getAnnouncementStudentRead(formGroup) as any;

        expect(announcementStudentRead).toMatchObject({});
      });

      it('should return IAnnouncementStudentRead', () => {
        const formGroup = service.createAnnouncementStudentReadFormGroup(sampleWithRequiredData);

        const announcementStudentRead = service.getAnnouncementStudentRead(formGroup) as any;

        expect(announcementStudentRead).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAnnouncementStudentRead should not enable id FormControl', () => {
        const formGroup = service.createAnnouncementStudentReadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAnnouncementStudentRead should disable id FormControl', () => {
        const formGroup = service.createAnnouncementStudentReadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
