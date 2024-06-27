import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
type FormValueOf<T extends IAnnouncement | NewAnnouncement> = Omit<T, 'postAt'> & {
  postAt?: string | null;
};

type AnnouncementFormRawValue = FormValueOf<IAnnouncement>;

type NewAnnouncementFormRawValue = FormValueOf<NewAnnouncement>;

type AnnouncementFormDefaults = Pick<NewAnnouncement, 'id' | 'delayPost' | 'postAt' | 'published' | 'courseSections'>;

type AnnouncementFormGroupContent = {
  id: FormControl<AnnouncementFormRawValue['id'] | NewAnnouncement['id']>;
  title: FormControl<AnnouncementFormRawValue['title']>;
  content: FormControl<AnnouncementFormRawValue['content']>;
  attachmentId: FormControl<AnnouncementFormRawValue['attachmentId']>;
  delayPost: FormControl<AnnouncementFormRawValue['delayPost']>;
  postAt: FormControl<AnnouncementFormRawValue['postAt']>;
  published: FormControl<AnnouncementFormRawValue['published']>;
  course: FormControl<AnnouncementFormRawValue['course']>;
  courseSections: FormControl<AnnouncementFormRawValue['courseSections']>;
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
      attachmentId: new FormControl(announcementRawValue.attachmentId),
      delayPost: new FormControl(announcementRawValue.delayPost),
      postAt: new FormControl(announcementRawValue.postAt),
      published: new FormControl(announcementRawValue.published),
      course: new FormControl(announcementRawValue.course),
      courseSections: new FormControl(announcementRawValue.courseSections ?? []),
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
      delayPost: false,
      postAt: currentTime,
      published: false,
      courseSections: [],
    };
  }

  private convertAnnouncementRawValueToAnnouncement(
    rawAnnouncement: AnnouncementFormRawValue | NewAnnouncementFormRawValue,
  ): IAnnouncement | NewAnnouncement {
    return {
      ...rawAnnouncement,
      postAt: dayjs(rawAnnouncement.postAt, DATE_TIME_FORMAT),
    };
  }

  private convertAnnouncementToAnnouncementRawValue(
    announcement: IAnnouncement | (Partial<NewAnnouncement> & AnnouncementFormDefaults),
  ): AnnouncementFormRawValue | PartialWithRequiredKeyOf<NewAnnouncementFormRawValue> {
    return {
      ...announcement,
      postAt: announcement.postAt ? announcement.postAt.format(DATE_TIME_FORMAT) : undefined,
      courseSections: announcement.courseSections ?? [],
    };
  }
}
