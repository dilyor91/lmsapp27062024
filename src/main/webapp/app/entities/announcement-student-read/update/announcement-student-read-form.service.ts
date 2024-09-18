import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAnnouncementStudentRead, NewAnnouncementStudentRead } from '../announcement-student-read.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAnnouncementStudentRead for edit and NewAnnouncementStudentReadFormGroupInput for create.
 */
type AnnouncementStudentReadFormGroupInput = IAnnouncementStudentRead | PartialWithRequiredKeyOf<NewAnnouncementStudentRead>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAnnouncementStudentRead | NewAnnouncementStudentRead> = Omit<T, 'readAt'> & {
  readAt?: string | null;
};

type AnnouncementStudentReadFormRawValue = FormValueOf<IAnnouncementStudentRead>;

type NewAnnouncementStudentReadFormRawValue = FormValueOf<NewAnnouncementStudentRead>;

type AnnouncementStudentReadFormDefaults = Pick<NewAnnouncementStudentRead, 'id' | 'read' | 'readAt'>;

type AnnouncementStudentReadFormGroupContent = {
  id: FormControl<AnnouncementStudentReadFormRawValue['id'] | NewAnnouncementStudentRead['id']>;
  read: FormControl<AnnouncementStudentReadFormRawValue['read']>;
  readAt: FormControl<AnnouncementStudentReadFormRawValue['readAt']>;
  announcement: FormControl<AnnouncementStudentReadFormRawValue['announcement']>;
  student: FormControl<AnnouncementStudentReadFormRawValue['student']>;
};

export type AnnouncementStudentReadFormGroup = FormGroup<AnnouncementStudentReadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AnnouncementStudentReadFormService {
  createAnnouncementStudentReadFormGroup(
    announcementStudentRead: AnnouncementStudentReadFormGroupInput = { id: null },
  ): AnnouncementStudentReadFormGroup {
    const announcementStudentReadRawValue = this.convertAnnouncementStudentReadToAnnouncementStudentReadRawValue({
      ...this.getFormDefaults(),
      ...announcementStudentRead,
    });
    return new FormGroup<AnnouncementStudentReadFormGroupContent>({
      id: new FormControl(
        { value: announcementStudentReadRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      read: new FormControl(announcementStudentReadRawValue.read),
      readAt: new FormControl(announcementStudentReadRawValue.readAt),
      announcement: new FormControl(announcementStudentReadRawValue.announcement),
      student: new FormControl(announcementStudentReadRawValue.student),
    });
  }

  getAnnouncementStudentRead(form: AnnouncementStudentReadFormGroup): IAnnouncementStudentRead | NewAnnouncementStudentRead {
    return this.convertAnnouncementStudentReadRawValueToAnnouncementStudentRead(
      form.getRawValue() as AnnouncementStudentReadFormRawValue | NewAnnouncementStudentReadFormRawValue,
    );
  }

  resetForm(form: AnnouncementStudentReadFormGroup, announcementStudentRead: AnnouncementStudentReadFormGroupInput): void {
    const announcementStudentReadRawValue = this.convertAnnouncementStudentReadToAnnouncementStudentReadRawValue({
      ...this.getFormDefaults(),
      ...announcementStudentRead,
    });
    form.reset(
      {
        ...announcementStudentReadRawValue,
        id: { value: announcementStudentReadRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AnnouncementStudentReadFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      read: false,
      readAt: currentTime,
    };
  }

  private convertAnnouncementStudentReadRawValueToAnnouncementStudentRead(
    rawAnnouncementStudentRead: AnnouncementStudentReadFormRawValue | NewAnnouncementStudentReadFormRawValue,
  ): IAnnouncementStudentRead | NewAnnouncementStudentRead {
    return {
      ...rawAnnouncementStudentRead,
      readAt: dayjs(rawAnnouncementStudentRead.readAt, DATE_TIME_FORMAT),
    };
  }

  private convertAnnouncementStudentReadToAnnouncementStudentReadRawValue(
    announcementStudentRead: IAnnouncementStudentRead | (Partial<NewAnnouncementStudentRead> & AnnouncementStudentReadFormDefaults),
  ): AnnouncementStudentReadFormRawValue | PartialWithRequiredKeyOf<NewAnnouncementStudentReadFormRawValue> {
    return {
      ...announcementStudentRead,
      readAt: announcementStudentRead.readAt ? announcementStudentRead.readAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
