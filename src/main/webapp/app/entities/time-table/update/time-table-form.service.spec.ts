import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../time-table.test-samples';

import { TimeTableFormService } from './time-table-form.service';

describe('TimeTable Form Service', () => {
  let service: TimeTableFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeTableFormService);
  });

  describe('Service methods', () => {
    describe('createTimeTableFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTimeTableFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            weekNumber: expect.any(Object),
            weekDayNumber: expect.any(Object),
            pairNumber: expect.any(Object),
            actialDate: expect.any(Object),
            course: expect.any(Object),
            teacher: expect.any(Object),
            building: expect.any(Object),
            room: expect.any(Object),
            studyTerm: expect.any(Object),
          }),
        );
      });

      it('passing ITimeTable should create a new form with FormGroup', () => {
        const formGroup = service.createTimeTableFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            weekNumber: expect.any(Object),
            weekDayNumber: expect.any(Object),
            pairNumber: expect.any(Object),
            actialDate: expect.any(Object),
            course: expect.any(Object),
            teacher: expect.any(Object),
            building: expect.any(Object),
            room: expect.any(Object),
            studyTerm: expect.any(Object),
          }),
        );
      });
    });

    describe('getTimeTable', () => {
      it('should return NewTimeTable for default TimeTable initial value', () => {
        const formGroup = service.createTimeTableFormGroup(sampleWithNewData);

        const timeTable = service.getTimeTable(formGroup) as any;

        expect(timeTable).toMatchObject(sampleWithNewData);
      });

      it('should return NewTimeTable for empty TimeTable initial value', () => {
        const formGroup = service.createTimeTableFormGroup();

        const timeTable = service.getTimeTable(formGroup) as any;

        expect(timeTable).toMatchObject({});
      });

      it('should return ITimeTable', () => {
        const formGroup = service.createTimeTableFormGroup(sampleWithRequiredData);

        const timeTable = service.getTimeTable(formGroup) as any;

        expect(timeTable).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITimeTable should not enable id FormControl', () => {
        const formGroup = service.createTimeTableFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTimeTable should disable id FormControl', () => {
        const formGroup = service.createTimeTableFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
