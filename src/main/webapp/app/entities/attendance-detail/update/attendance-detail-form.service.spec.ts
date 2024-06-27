import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../attendance-detail.test-samples';

import { AttendanceDetailFormService } from './attendance-detail-form.service';

describe('AttendanceDetail Form Service', () => {
  let service: AttendanceDetailFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceDetailFormService);
  });

  describe('Service methods', () => {
    describe('createAttendanceDetailFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAttendanceDetailFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            attendanceEnum: expect.any(Object),
            attendance: expect.any(Object),
            student: expect.any(Object),
          }),
        );
      });

      it('passing IAttendanceDetail should create a new form with FormGroup', () => {
        const formGroup = service.createAttendanceDetailFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            attendanceEnum: expect.any(Object),
            attendance: expect.any(Object),
            student: expect.any(Object),
          }),
        );
      });
    });

    describe('getAttendanceDetail', () => {
      it('should return NewAttendanceDetail for default AttendanceDetail initial value', () => {
        const formGroup = service.createAttendanceDetailFormGroup(sampleWithNewData);

        const attendanceDetail = service.getAttendanceDetail(formGroup) as any;

        expect(attendanceDetail).toMatchObject(sampleWithNewData);
      });

      it('should return NewAttendanceDetail for empty AttendanceDetail initial value', () => {
        const formGroup = service.createAttendanceDetailFormGroup();

        const attendanceDetail = service.getAttendanceDetail(formGroup) as any;

        expect(attendanceDetail).toMatchObject({});
      });

      it('should return IAttendanceDetail', () => {
        const formGroup = service.createAttendanceDetailFormGroup(sampleWithRequiredData);

        const attendanceDetail = service.getAttendanceDetail(formGroup) as any;

        expect(attendanceDetail).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAttendanceDetail should not enable id FormControl', () => {
        const formGroup = service.createAttendanceDetailFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAttendanceDetail should disable id FormControl', () => {
        const formGroup = service.createAttendanceDetailFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
