import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../calendar-todo.test-samples';

import { CalendarTodoFormService } from './calendar-todo-form.service';

describe('CalendarTodo Form Service', () => {
  let service: CalendarTodoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarTodoFormService);
  });

  describe('Service methods', () => {
    describe('createCalendarTodoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCalendarTodoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            date: expect.any(Object),
            time: expect.any(Object),
            details: expect.any(Object),
            user: expect.any(Object),
          }),
        );
      });

      it('passing ICalendarTodo should create a new form with FormGroup', () => {
        const formGroup = service.createCalendarTodoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            date: expect.any(Object),
            time: expect.any(Object),
            details: expect.any(Object),
            user: expect.any(Object),
          }),
        );
      });
    });

    describe('getCalendarTodo', () => {
      it('should return NewCalendarTodo for default CalendarTodo initial value', () => {
        const formGroup = service.createCalendarTodoFormGroup(sampleWithNewData);

        const calendarTodo = service.getCalendarTodo(formGroup) as any;

        expect(calendarTodo).toMatchObject(sampleWithNewData);
      });

      it('should return NewCalendarTodo for empty CalendarTodo initial value', () => {
        const formGroup = service.createCalendarTodoFormGroup();

        const calendarTodo = service.getCalendarTodo(formGroup) as any;

        expect(calendarTodo).toMatchObject({});
      });

      it('should return ICalendarTodo', () => {
        const formGroup = service.createCalendarTodoFormGroup(sampleWithRequiredData);

        const calendarTodo = service.getCalendarTodo(formGroup) as any;

        expect(calendarTodo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICalendarTodo should not enable id FormControl', () => {
        const formGroup = service.createCalendarTodoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCalendarTodo should disable id FormControl', () => {
        const formGroup = service.createCalendarTodoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
