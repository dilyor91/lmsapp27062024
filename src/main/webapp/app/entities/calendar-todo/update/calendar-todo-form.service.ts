import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICalendarTodo, NewCalendarTodo } from '../calendar-todo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICalendarTodo for edit and NewCalendarTodoFormGroupInput for create.
 */
type CalendarTodoFormGroupInput = ICalendarTodo | PartialWithRequiredKeyOf<NewCalendarTodo>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICalendarTodo | NewCalendarTodo> = Omit<T, 'date'> & {
  date?: string | null;
};

type CalendarTodoFormRawValue = FormValueOf<ICalendarTodo>;

type NewCalendarTodoFormRawValue = FormValueOf<NewCalendarTodo>;

type CalendarTodoFormDefaults = Pick<NewCalendarTodo, 'id' | 'date'>;

type CalendarTodoFormGroupContent = {
  id: FormControl<CalendarTodoFormRawValue['id'] | NewCalendarTodo['id']>;
  title: FormControl<CalendarTodoFormRawValue['title']>;
  date: FormControl<CalendarTodoFormRawValue['date']>;
  time: FormControl<CalendarTodoFormRawValue['time']>;
  details: FormControl<CalendarTodoFormRawValue['details']>;
  user: FormControl<CalendarTodoFormRawValue['user']>;
};

export type CalendarTodoFormGroup = FormGroup<CalendarTodoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CalendarTodoFormService {
  createCalendarTodoFormGroup(calendarTodo: CalendarTodoFormGroupInput = { id: null }): CalendarTodoFormGroup {
    const calendarTodoRawValue = this.convertCalendarTodoToCalendarTodoRawValue({
      ...this.getFormDefaults(),
      ...calendarTodo,
    });
    return new FormGroup<CalendarTodoFormGroupContent>({
      id: new FormControl(
        { value: calendarTodoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      title: new FormControl(calendarTodoRawValue.title),
      date: new FormControl(calendarTodoRawValue.date),
      time: new FormControl(calendarTodoRawValue.time),
      details: new FormControl(calendarTodoRawValue.details),
      user: new FormControl(calendarTodoRawValue.user),
    });
  }

  getCalendarTodo(form: CalendarTodoFormGroup): ICalendarTodo | NewCalendarTodo {
    return this.convertCalendarTodoRawValueToCalendarTodo(form.getRawValue() as CalendarTodoFormRawValue | NewCalendarTodoFormRawValue);
  }

  resetForm(form: CalendarTodoFormGroup, calendarTodo: CalendarTodoFormGroupInput): void {
    const calendarTodoRawValue = this.convertCalendarTodoToCalendarTodoRawValue({ ...this.getFormDefaults(), ...calendarTodo });
    form.reset(
      {
        ...calendarTodoRawValue,
        id: { value: calendarTodoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CalendarTodoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      date: currentTime,
    };
  }

  private convertCalendarTodoRawValueToCalendarTodo(
    rawCalendarTodo: CalendarTodoFormRawValue | NewCalendarTodoFormRawValue,
  ): ICalendarTodo | NewCalendarTodo {
    return {
      ...rawCalendarTodo,
      date: dayjs(rawCalendarTodo.date, DATE_TIME_FORMAT),
    };
  }

  private convertCalendarTodoToCalendarTodoRawValue(
    calendarTodo: ICalendarTodo | (Partial<NewCalendarTodo> & CalendarTodoFormDefaults),
  ): CalendarTodoFormRawValue | PartialWithRequiredKeyOf<NewCalendarTodoFormRawValue> {
    return {
      ...calendarTodo,
      date: calendarTodo.date ? calendarTodo.date.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
