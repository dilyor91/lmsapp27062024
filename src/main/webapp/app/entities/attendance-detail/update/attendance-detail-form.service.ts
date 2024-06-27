import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAttendanceDetail, NewAttendanceDetail } from '../attendance-detail.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAttendanceDetail for edit and NewAttendanceDetailFormGroupInput for create.
 */
type AttendanceDetailFormGroupInput = IAttendanceDetail | PartialWithRequiredKeyOf<NewAttendanceDetail>;

type AttendanceDetailFormDefaults = Pick<NewAttendanceDetail, 'id'>;

type AttendanceDetailFormGroupContent = {
  id: FormControl<IAttendanceDetail['id'] | NewAttendanceDetail['id']>;
  attendanceEnum: FormControl<IAttendanceDetail['attendanceEnum']>;
  attendance: FormControl<IAttendanceDetail['attendance']>;
  student: FormControl<IAttendanceDetail['student']>;
};

export type AttendanceDetailFormGroup = FormGroup<AttendanceDetailFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AttendanceDetailFormService {
  createAttendanceDetailFormGroup(attendanceDetail: AttendanceDetailFormGroupInput = { id: null }): AttendanceDetailFormGroup {
    const attendanceDetailRawValue = {
      ...this.getFormDefaults(),
      ...attendanceDetail,
    };
    return new FormGroup<AttendanceDetailFormGroupContent>({
      id: new FormControl(
        { value: attendanceDetailRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      attendanceEnum: new FormControl(attendanceDetailRawValue.attendanceEnum),
      attendance: new FormControl(attendanceDetailRawValue.attendance),
      student: new FormControl(attendanceDetailRawValue.student),
    });
  }

  getAttendanceDetail(form: AttendanceDetailFormGroup): IAttendanceDetail | NewAttendanceDetail {
    return form.getRawValue() as IAttendanceDetail | NewAttendanceDetail;
  }

  resetForm(form: AttendanceDetailFormGroup, attendanceDetail: AttendanceDetailFormGroupInput): void {
    const attendanceDetailRawValue = { ...this.getFormDefaults(), ...attendanceDetail };
    form.reset(
      {
        ...attendanceDetailRawValue,
        id: { value: attendanceDetailRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AttendanceDetailFormDefaults {
    return {
      id: null,
    };
  }
}
