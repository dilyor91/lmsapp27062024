import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAnnouncement, NewAnnouncement } from '../announcement.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAnnouncement for edit and NewAnnouncementFormGroupInput for create.
 */
type AnnouncementFormGroupInput = IAnnouncement | PartialWithRequiredKeyOf<NewAnnouncement>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAnnouncement | NewAnnouncement> = Omit<T, 'availableFromDate' | 'availableUntilDate'> & {
  availableFromDate?: string | null;
  availableUntilDate?: string | null;
};

type AnnouncementFormRawValue = FormValueOf<IAnnouncement>;

type NewAnnouncementFormRawValue = FormValueOf<NewAnnouncement>;

type AnnouncementFormDefaults = Pick<NewAnnouncement, 'id' | 'availableFromDate' | 'availableUntilDate' | 'published'>;

type AnnouncementFormGroupContent = {
  id: FormControl<AnnouncementFormRawValue['id'] | NewAnnouncement['id']>;
  title: FormControl<AnnouncementFormRawValue['title']>;
  content: FormControl<AnnouncementFormRawValue['content']>;
  availableFromDate: FormControl<AnnouncementFormRawValue['availableFromDate']>;
  availableUntilDate: FormControl<AnnouncementFormRawValue['availableUntilDate']>;
  published: FormControl<AnnouncementFormRawValue['published']>;
  attachment: FormControl<AnnouncementFormRawValue['attachment']>;
  course: FormControl<AnnouncementFormRawValue['course']>;
};

export type AnnouncementFormGroup = FormGroup<AnnouncementFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AnnouncementFormService {
  createAnnouncementFormGroup(announcement: AnnouncementFormGroupInput = { id: null }): AnnouncementFormGroup {
    const announcementRawValue = this.convertAnnouncementToAnnouncementRawValue({
      ...this.getFormDefaults(),
      ...announcement,
    });
    return new FormGroup<AnnouncementFormGroupContent>({
      id: new FormControl(
        { value: announcementRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      title: new FormControl(announcementRawValue.title, {
        validators: [Validators.required],
      }),
      content: new FormControl(announcementRawValue.content, {
        validators: [Validators.required],
      }),
      availableFromDate: new FormControl(announcementRawValue.availableFromDate),
      availableUntilDate: new FormControl(announcementRawValue.availableUntilDate),
      published: new FormControl(announcementRawValue.published),
      attachment: new FormControl(announcementRawValue.attachment),
      course: new FormControl(announcementRawValue.course),
    });
  }

  getAnnouncement(form: AnnouncementFormGroup): IAnnouncement | NewAnnouncement {
    return this.convertAnnouncementRawValueToAnnouncement(form.getRawValue() as AnnouncementFormRawValue | NewAnnouncementFormRawValue);
  }

  resetForm(form: AnnouncementFormGroup, announcement: AnnouncementFormGroupInput): void {
    const announcementRawValue = this.convertAnnouncementToAnnouncementRawValue({ ...this.getFormDefaults(), ...announcement });
    form.reset(
      {
        ...announcementRawValue,
        id: { value: announcementRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AnnouncementFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      availableFromDate: currentTime,
      availableUntilDate: currentTime,
      published: false,
    };
  }

  private convertAnnouncementRawValueToAnnouncement(
    rawAnnouncement: AnnouncementFormRawValue | NewAnnouncementFormRawValue,
  ): IAnnouncement | NewAnnouncement {
    return {
      ...rawAnnouncement,
      availableFromDate: dayjs(rawAnnouncement.availableFromDate, DATE_TIME_FORMAT),
      availableUntilDate: dayjs(rawAnnouncement.availableUntilDate, DATE_TIME_FORMAT),
    };
  }

  private convertAnnouncementToAnnouncementRawValue(
    announcement: IAnnouncement | (Partial<NewAnnouncement> & AnnouncementFormDefaults),
  ): AnnouncementFormRawValue | PartialWithRequiredKeyOf<NewAnnouncementFormRawValue> {
    return {
      ...announcement,
      availableFromDate: announcement.availableFromDate ? announcement.availableFromDate.format(DATE_TIME_FORMAT) : undefined,
      availableUntilDate: announcement.availableUntilDate ? announcement.availableUntilDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
