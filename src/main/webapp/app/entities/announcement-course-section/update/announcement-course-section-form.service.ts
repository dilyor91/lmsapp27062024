import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IAnnouncementCourseSection, NewAnnouncementCourseSection } from '../announcement-course-section.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAnnouncementCourseSection for edit and NewAnnouncementCourseSectionFormGroupInput for create.
 */
type AnnouncementCourseSectionFormGroupInput = IAnnouncementCourseSection | PartialWithRequiredKeyOf<NewAnnouncementCourseSection>;

type AnnouncementCourseSectionFormDefaults = Pick<NewAnnouncementCourseSection, 'id'>;

type AnnouncementCourseSectionFormGroupContent = {
  id: FormControl<IAnnouncementCourseSection['id'] | NewAnnouncementCourseSection['id']>;
  announcement: FormControl<IAnnouncementCourseSection['announcement']>;
  course: FormControl<IAnnouncementCourseSection['course']>;
  courseSection: FormControl<IAnnouncementCourseSection['courseSection']>;
};

export type AnnouncementCourseSectionFormGroup = FormGroup<AnnouncementCourseSectionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AnnouncementCourseSectionFormService {
  createAnnouncementCourseSectionFormGroup(
    announcementCourseSection: AnnouncementCourseSectionFormGroupInput = { id: null },
  ): AnnouncementCourseSectionFormGroup {
    const announcementCourseSectionRawValue = {
      ...this.getFormDefaults(),
      ...announcementCourseSection,
    };
    return new FormGroup<AnnouncementCourseSectionFormGroupContent>({
      id: new FormControl(
        { value: announcementCourseSectionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      announcement: new FormControl(announcementCourseSectionRawValue.announcement),
      course: new FormControl(announcementCourseSectionRawValue.course),
      courseSection: new FormControl(announcementCourseSectionRawValue.courseSection),
    });
  }

  getAnnouncementCourseSection(form: AnnouncementCourseSectionFormGroup): IAnnouncementCourseSection | NewAnnouncementCourseSection {
    return form.getRawValue() as IAnnouncementCourseSection | NewAnnouncementCourseSection;
  }

  resetForm(form: AnnouncementCourseSectionFormGroup, announcementCourseSection: AnnouncementCourseSectionFormGroupInput): void {
    const announcementCourseSectionRawValue = { ...this.getFormDefaults(), ...announcementCourseSection };
    form.reset(
      {
        ...announcementCourseSectionRawValue,
        id: { value: announcementCourseSectionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AnnouncementCourseSectionFormDefaults {
    return {
      id: null,
    };
  }
}
