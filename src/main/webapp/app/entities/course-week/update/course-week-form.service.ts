import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICourseWeek, NewCourseWeek } from '../course-week.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICourseWeek for edit and NewCourseWeekFormGroupInput for create.
 */
type CourseWeekFormGroupInput = ICourseWeek | PartialWithRequiredKeyOf<NewCourseWeek>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICourseWeek | NewCourseWeek> = Omit<T, 'weekDate'> & {
  weekDate?: string | null;
};

type CourseWeekFormRawValue = FormValueOf<ICourseWeek>;

type NewCourseWeekFormRawValue = FormValueOf<NewCourseWeek>;

type CourseWeekFormDefaults = Pick<NewCourseWeek, 'id' | 'published' | 'weekDate'>;

type CourseWeekFormGroupContent = {
  id: FormControl<CourseWeekFormRawValue['id'] | NewCourseWeek['id']>;
  name: FormControl<CourseWeekFormRawValue['name']>;
  published: FormControl<CourseWeekFormRawValue['published']>;
  weekDate: FormControl<CourseWeekFormRawValue['weekDate']>;
  course: FormControl<CourseWeekFormRawValue['course']>;
};

export type CourseWeekFormGroup = FormGroup<CourseWeekFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CourseWeekFormService {
  createCourseWeekFormGroup(courseWeek: CourseWeekFormGroupInput = { id: null }): CourseWeekFormGroup {
    const courseWeekRawValue = this.convertCourseWeekToCourseWeekRawValue({
      ...this.getFormDefaults(),
      ...courseWeek,
    });
    return new FormGroup<CourseWeekFormGroupContent>({
      id: new FormControl(
        { value: courseWeekRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(courseWeekRawValue.name),
      published: new FormControl(courseWeekRawValue.published),
      weekDate: new FormControl(courseWeekRawValue.weekDate),
      course: new FormControl(courseWeekRawValue.course),
    });
  }

  getCourseWeek(form: CourseWeekFormGroup): ICourseWeek | NewCourseWeek {
    return this.convertCourseWeekRawValueToCourseWeek(form.getRawValue() as CourseWeekFormRawValue | NewCourseWeekFormRawValue);
  }

  resetForm(form: CourseWeekFormGroup, courseWeek: CourseWeekFormGroupInput): void {
    const courseWeekRawValue = this.convertCourseWeekToCourseWeekRawValue({ ...this.getFormDefaults(), ...courseWeek });
    form.reset(
      {
        ...courseWeekRawValue,
        id: { value: courseWeekRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CourseWeekFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      published: false,
      weekDate: currentTime,
    };
  }

  private convertCourseWeekRawValueToCourseWeek(
    rawCourseWeek: CourseWeekFormRawValue | NewCourseWeekFormRawValue,
  ): ICourseWeek | NewCourseWeek {
    return {
      ...rawCourseWeek,
      weekDate: dayjs(rawCourseWeek.weekDate, DATE_TIME_FORMAT),
    };
  }

  private convertCourseWeekToCourseWeekRawValue(
    courseWeek: ICourseWeek | (Partial<NewCourseWeek> & CourseWeekFormDefaults),
  ): CourseWeekFormRawValue | PartialWithRequiredKeyOf<NewCourseWeekFormRawValue> {
    return {
      ...courseWeek,
      weekDate: courseWeek.weekDate ? courseWeek.weekDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
