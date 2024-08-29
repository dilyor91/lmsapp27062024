import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICourseWeekInfo, NewCourseWeekInfo } from '../course-week-info.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICourseWeekInfo for edit and NewCourseWeekInfoFormGroupInput for create.
 */
type CourseWeekInfoFormGroupInput = ICourseWeekInfo | PartialWithRequiredKeyOf<NewCourseWeekInfo>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICourseWeekInfo | NewCourseWeekInfo> = Omit<T, 'startDate'> & {
  startDate?: string | null;
};

type CourseWeekInfoFormRawValue = FormValueOf<ICourseWeekInfo>;

type NewCourseWeekInfoFormRawValue = FormValueOf<NewCourseWeekInfo>;

type CourseWeekInfoFormDefaults = Pick<NewCourseWeekInfo, 'id' | 'startDate'>;

type CourseWeekInfoFormGroupContent = {
  id: FormControl<CourseWeekInfoFormRawValue['id'] | NewCourseWeekInfo['id']>;
  totalWeek: FormControl<CourseWeekInfoFormRawValue['totalWeek']>;
  lessonPerWeek: FormControl<CourseWeekInfoFormRawValue['lessonPerWeek']>;
  startDate: FormControl<CourseWeekInfoFormRawValue['startDate']>;
  weekDayCount: FormControl<CourseWeekInfoFormRawValue['weekDayCount']>;
  course: FormControl<CourseWeekInfoFormRawValue['course']>;
};

export type CourseWeekInfoFormGroup = FormGroup<CourseWeekInfoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CourseWeekInfoFormService {
  createCourseWeekInfoFormGroup(courseWeekInfo: CourseWeekInfoFormGroupInput = { id: null }): CourseWeekInfoFormGroup {
    const courseWeekInfoRawValue = this.convertCourseWeekInfoToCourseWeekInfoRawValue({
      ...this.getFormDefaults(),
      ...courseWeekInfo,
    });
    return new FormGroup<CourseWeekInfoFormGroupContent>({
      id: new FormControl(
        { value: courseWeekInfoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      totalWeek: new FormControl(courseWeekInfoRawValue.totalWeek),
      lessonPerWeek: new FormControl(courseWeekInfoRawValue.lessonPerWeek),
      startDate: new FormControl(courseWeekInfoRawValue.startDate),
      weekDayCount: new FormControl(courseWeekInfoRawValue.weekDayCount),
      course: new FormControl(courseWeekInfoRawValue.course),
    });
  }

  getCourseWeekInfo(form: CourseWeekInfoFormGroup): ICourseWeekInfo | NewCourseWeekInfo {
    return this.convertCourseWeekInfoRawValueToCourseWeekInfo(
      form.getRawValue() as CourseWeekInfoFormRawValue | NewCourseWeekInfoFormRawValue,
    );
  }

  resetForm(form: CourseWeekInfoFormGroup, courseWeekInfo: CourseWeekInfoFormGroupInput): void {
    const courseWeekInfoRawValue = this.convertCourseWeekInfoToCourseWeekInfoRawValue({ ...this.getFormDefaults(), ...courseWeekInfo });
    form.reset(
      {
        ...courseWeekInfoRawValue,
        id: { value: courseWeekInfoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CourseWeekInfoFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      startDate: currentTime,
    };
  }

  private convertCourseWeekInfoRawValueToCourseWeekInfo(
    rawCourseWeekInfo: CourseWeekInfoFormRawValue | NewCourseWeekInfoFormRawValue,
  ): ICourseWeekInfo | NewCourseWeekInfo {
    return {
      ...rawCourseWeekInfo,
      startDate: dayjs(rawCourseWeekInfo.startDate, DATE_TIME_FORMAT),
    };
  }

  private convertCourseWeekInfoToCourseWeekInfoRawValue(
    courseWeekInfo: ICourseWeekInfo | (Partial<NewCourseWeekInfo> & CourseWeekInfoFormDefaults),
  ): CourseWeekInfoFormRawValue | PartialWithRequiredKeyOf<NewCourseWeekInfoFormRawValue> {
    return {
      ...courseWeekInfo,
      startDate: courseWeekInfo.startDate ? courseWeekInfo.startDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
