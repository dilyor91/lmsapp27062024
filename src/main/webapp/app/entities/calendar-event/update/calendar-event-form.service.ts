import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICalendarEvent, NewCalendarEvent } from '../calendar-event.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICalendarEvent for edit and NewCalendarEventFormGroupInput for create.
 */
type CalendarEventFormGroupInput = ICalendarEvent | PartialWithRequiredKeyOf<NewCalendarEvent>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICalendarEvent | NewCalendarEvent> = Omit<T, 'date'> & {
  date?: string | null;
};

type CalendarEventFormRawValue = FormValueOf<ICalendarEvent>;

type NewCalendarEventFormRawValue = FormValueOf<NewCalendarEvent>;

type CalendarEventFormDefaults = Pick<NewCalendarEvent, 'id' | 'date'>;

type CalendarEventFormGroupContent = {
  id: FormControl<CalendarEventFormRawValue['id'] | NewCalendarEvent['id']>;
  title: FormControl<CalendarEventFormRawValue['title']>;
  content: FormControl<CalendarEventFormRawValue['content']>;
  date: FormControl<CalendarEventFormRawValue['date']>;
  startTime: FormControl<CalendarEventFormRawValue['startTime']>;
  endTime: FormControl<CalendarEventFormRawValue['endTime']>;
  location: FormControl<CalendarEventFormRawValue['location']>;
  address: FormControl<CalendarEventFormRawValue['address']>;
  eventFrequency: FormControl<CalendarEventFormRawValue['eventFrequency']>;
  user: FormControl<CalendarEventFormRawValue['user']>;
};

export type CalendarEventFormGroup = FormGroup<CalendarEventFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CalendarEventFormService {
  createCalendarEventFormGroup(calendarEvent: CalendarEventFormGroupInput = { id: null }): CalendarEventFormGroup {
    const calendarEventRawValue = this.convertCalendarEventToCalendarEventRawValue({
      ...this.getFormDefaults(),
      ...calendarEvent,
    });
    return new FormGroup<CalendarEventFormGroupContent>({
      id: new FormControl(
        { value: calendarEventRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      title: new FormControl(calendarEventRawValue.title),
      content: new FormControl(calendarEventRawValue.content),
      date: new FormControl(calendarEventRawValue.date),
      startTime: new FormControl(calendarEventRawValue.startTime),
      endTime: new FormControl(calendarEventRawValue.endTime),
      location: new FormControl(calendarEventRawValue.location),
      address: new FormControl(calendarEventRawValue.address),
      eventFrequency: new FormControl(calendarEventRawValue.eventFrequency),
      user: new FormControl(calendarEventRawValue.user),
    });
  }

  getCalendarEvent(form: CalendarEventFormGroup): ICalendarEvent | NewCalendarEvent {
    return this.convertCalendarEventRawValueToCalendarEvent(form.getRawValue() as CalendarEventFormRawValue | NewCalendarEventFormRawValue);
  }

  resetForm(form: CalendarEventFormGroup, calendarEvent: CalendarEventFormGroupInput): void {
    const calendarEventRawValue = this.convertCalendarEventToCalendarEventRawValue({ ...this.getFormDefaults(), ...calendarEvent });
    form.reset(
      {
        ...calendarEventRawValue,
        id: { value: calendarEventRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CalendarEventFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      date: currentTime,
    };
  }

  private convertCalendarEventRawValueToCalendarEvent(
    rawCalendarEvent: CalendarEventFormRawValue | NewCalendarEventFormRawValue,
  ): ICalendarEvent | NewCalendarEvent {
    return {
      ...rawCalendarEvent,
      date: dayjs(rawCalendarEvent.date, DATE_TIME_FORMAT),
    };
  }

  private convertCalendarEventToCalendarEventRawValue(
    calendarEvent: ICalendarEvent | (Partial<NewCalendarEvent> & CalendarEventFormDefaults),
  ): CalendarEventFormRawValue | PartialWithRequiredKeyOf<NewCalendarEventFormRawValue> {
    return {
      ...calendarEvent,
      date: calendarEvent.date ? calendarEvent.date.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
