import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITimeTable, NewTimeTable } from '../time-table.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITimeTable for edit and NewTimeTableFormGroupInput for create.
 */
type TimeTableFormGroupInput = ITimeTable | PartialWithRequiredKeyOf<NewTimeTable>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITimeTable | NewTimeTable> = Omit<T, 'actialDate'> & {
  actialDate?: string | null;
};

type TimeTableFormRawValue = FormValueOf<ITimeTable>;

type NewTimeTableFormRawValue = FormValueOf<NewTimeTable>;

type TimeTableFormDefaults = Pick<NewTimeTable, 'id' | 'actialDate'>;

type TimeTableFormGroupContent = {
  id: FormControl<TimeTableFormRawValue['id'] | NewTimeTable['id']>;
  weekNumber: FormControl<TimeTableFormRawValue['weekNumber']>;
  weekDayNumber: FormControl<TimeTableFormRawValue['weekDayNumber']>;
  pairNumber: FormControl<TimeTableFormRawValue['pairNumber']>;
  actialDate: FormControl<TimeTableFormRawValue['actialDate']>;
  course: FormControl<TimeTableFormRawValue['course']>;
  teacher: FormControl<TimeTableFormRawValue['teacher']>;
  building: FormControl<TimeTableFormRawValue['building']>;
  room: FormControl<TimeTableFormRawValue['room']>;
  studyTerm: FormControl<TimeTableFormRawValue['studyTerm']>;
};

export type TimeTableFormGroup = FormGroup<TimeTableFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TimeTableFormService {
  createTimeTableFormGroup(timeTable: TimeTableFormGroupInput = { id: null }): TimeTableFormGroup {
    const timeTableRawValue = this.convertTimeTableToTimeTableRawValue({
      ...this.getFormDefaults(),
      ...timeTable,
    });
    return new FormGroup<TimeTableFormGroupContent>({
      id: new FormControl(
        { value: timeTableRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      weekNumber: new FormControl(timeTableRawValue.weekNumber),
      weekDayNumber: new FormControl(timeTableRawValue.weekDayNumber),
      pairNumber: new FormControl(timeTableRawValue.pairNumber),
      actialDate: new FormControl(timeTableRawValue.actialDate),
      course: new FormControl(timeTableRawValue.course),
      teacher: new FormControl(timeTableRawValue.teacher),
      building: new FormControl(timeTableRawValue.building),
      room: new FormControl(timeTableRawValue.room),
      studyTerm: new FormControl(timeTableRawValue.studyTerm),
    });
  }

  getTimeTable(form: TimeTableFormGroup): ITimeTable | NewTimeTable {
    return this.convertTimeTableRawValueToTimeTable(form.getRawValue() as TimeTableFormRawValue | NewTimeTableFormRawValue);
  }

  resetForm(form: TimeTableFormGroup, timeTable: TimeTableFormGroupInput): void {
    const timeTableRawValue = this.convertTimeTableToTimeTableRawValue({ ...this.getFormDefaults(), ...timeTable });
    form.reset(
      {
        ...timeTableRawValue,
        id: { value: timeTableRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TimeTableFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      actialDate: currentTime,
    };
  }

  private convertTimeTableRawValueToTimeTable(rawTimeTable: TimeTableFormRawValue | NewTimeTableFormRawValue): ITimeTable | NewTimeTable {
    return {
      ...rawTimeTable,
      actialDate: dayjs(rawTimeTable.actialDate, DATE_TIME_FORMAT),
    };
  }

  private convertTimeTableToTimeTableRawValue(
    timeTable: ITimeTable | (Partial<NewTimeTable> & TimeTableFormDefaults),
  ): TimeTableFormRawValue | PartialWithRequiredKeyOf<NewTimeTableFormRawValue> {
    return {
      ...timeTable,
      actialDate: timeTable.actialDate ? timeTable.actialDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
