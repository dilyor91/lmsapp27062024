import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IEnrollment, NewEnrollment } from '../enrollment.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEnrollment for edit and NewEnrollmentFormGroupInput for create.
 */
type EnrollmentFormGroupInput = IEnrollment | PartialWithRequiredKeyOf<NewEnrollment>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IEnrollment | NewEnrollment> = Omit<T, 'lastActivityAt' | 'enrollmentDate'> & {
  lastActivityAt?: string | null;
  enrollmentDate?: string | null;
};

type EnrollmentFormRawValue = FormValueOf<IEnrollment>;

type NewEnrollmentFormRawValue = FormValueOf<NewEnrollment>;

type EnrollmentFormDefaults = Pick<NewEnrollment, 'id' | 'lastActivityAt' | 'enrollmentDate'>;

type EnrollmentFormGroupContent = {
  id: FormControl<EnrollmentFormRawValue['id'] | NewEnrollment['id']>;
  enrollmentStatus: FormControl<EnrollmentFormRawValue['enrollmentStatus']>;
  lastActivityAt: FormControl<EnrollmentFormRawValue['lastActivityAt']>;
  enrollmentDate: FormControl<EnrollmentFormRawValue['enrollmentDate']>;
  student: FormControl<EnrollmentFormRawValue['student']>;
  courseSection: FormControl<EnrollmentFormRawValue['courseSection']>;
  course: FormControl<EnrollmentFormRawValue['course']>;
};

export type EnrollmentFormGroup = FormGroup<EnrollmentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EnrollmentFormService {
  createEnrollmentFormGroup(enrollment: EnrollmentFormGroupInput = { id: null }): EnrollmentFormGroup {
    const enrollmentRawValue = this.convertEnrollmentToEnrollmentRawValue({
      ...this.getFormDefaults(),
      ...enrollment,
    });
    return new FormGroup<EnrollmentFormGroupContent>({
      id: new FormControl(
        { value: enrollmentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      enrollmentStatus: new FormControl(enrollmentRawValue.enrollmentStatus, {
        validators: [Validators.required],
      }),
      lastActivityAt: new FormControl(enrollmentRawValue.lastActivityAt),
      enrollmentDate: new FormControl(enrollmentRawValue.enrollmentDate),
      student: new FormControl(enrollmentRawValue.student),
      courseSection: new FormControl(enrollmentRawValue.courseSection),
      course: new FormControl(enrollmentRawValue.course),
    });
  }

  getEnrollment(form: EnrollmentFormGroup): IEnrollment | NewEnrollment {
    return this.convertEnrollmentRawValueToEnrollment(form.getRawValue() as EnrollmentFormRawValue | NewEnrollmentFormRawValue);
  }

  resetForm(form: EnrollmentFormGroup, enrollment: EnrollmentFormGroupInput): void {
    const enrollmentRawValue = this.convertEnrollmentToEnrollmentRawValue({ ...this.getFormDefaults(), ...enrollment });
    form.reset(
      {
        ...enrollmentRawValue,
        id: { value: enrollmentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): EnrollmentFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastActivityAt: currentTime,
      enrollmentDate: currentTime,
    };
  }

  private convertEnrollmentRawValueToEnrollment(
    rawEnrollment: EnrollmentFormRawValue | NewEnrollmentFormRawValue,
  ): IEnrollment | NewEnrollment {
    return {
      ...rawEnrollment,
      lastActivityAt: dayjs(rawEnrollment.lastActivityAt, DATE_TIME_FORMAT),
      enrollmentDate: dayjs(rawEnrollment.enrollmentDate, DATE_TIME_FORMAT),
    };
  }

  private convertEnrollmentToEnrollmentRawValue(
    enrollment: IEnrollment | (Partial<NewEnrollment> & EnrollmentFormDefaults),
  ): EnrollmentFormRawValue | PartialWithRequiredKeyOf<NewEnrollmentFormRawValue> {
    return {
      ...enrollment,
      lastActivityAt: enrollment.lastActivityAt ? enrollment.lastActivityAt.format(DATE_TIME_FORMAT) : undefined,
      enrollmentDate: enrollment.enrollmentDate ? enrollment.enrollmentDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
