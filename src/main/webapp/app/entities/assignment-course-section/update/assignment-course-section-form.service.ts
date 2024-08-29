import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAssignmentCourseSection, NewAssignmentCourseSection } from '../assignment-course-section.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAssignmentCourseSection for edit and NewAssignmentCourseSectionFormGroupInput for create.
 */
type AssignmentCourseSectionFormGroupInput = IAssignmentCourseSection | PartialWithRequiredKeyOf<NewAssignmentCourseSection>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAssignmentCourseSection | NewAssignmentCourseSection> = Omit<T, 'startDate' | 'endDate'> & {
  startDate?: string | null;
  endDate?: string | null;
};

type AssignmentCourseSectionFormRawValue = FormValueOf<IAssignmentCourseSection>;

type NewAssignmentCourseSectionFormRawValue = FormValueOf<NewAssignmentCourseSection>;

type AssignmentCourseSectionFormDefaults = Pick<NewAssignmentCourseSection, 'id' | 'startDate' | 'endDate'>;

type AssignmentCourseSectionFormGroupContent = {
  id: FormControl<AssignmentCourseSectionFormRawValue['id'] | NewAssignmentCourseSection['id']>;
  startDate: FormControl<AssignmentCourseSectionFormRawValue['startDate']>;
  endDate: FormControl<AssignmentCourseSectionFormRawValue['endDate']>;
  assignment: FormControl<AssignmentCourseSectionFormRawValue['assignment']>;
  course: FormControl<AssignmentCourseSectionFormRawValue['course']>;
  courseSection: FormControl<AssignmentCourseSectionFormRawValue['courseSection']>;
};

export type AssignmentCourseSectionFormGroup = FormGroup<AssignmentCourseSectionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AssignmentCourseSectionFormService {
  createAssignmentCourseSectionFormGroup(
    assignmentCourseSection: AssignmentCourseSectionFormGroupInput = { id: null },
  ): AssignmentCourseSectionFormGroup {
    const assignmentCourseSectionRawValue = this.convertAssignmentCourseSectionToAssignmentCourseSectionRawValue({
      ...this.getFormDefaults(),
      ...assignmentCourseSection,
    });
    return new FormGroup<AssignmentCourseSectionFormGroupContent>({
      id: new FormControl(
        { value: assignmentCourseSectionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      startDate: new FormControl(assignmentCourseSectionRawValue.startDate),
      endDate: new FormControl(assignmentCourseSectionRawValue.endDate),
      assignment: new FormControl(assignmentCourseSectionRawValue.assignment),
      course: new FormControl(assignmentCourseSectionRawValue.course),
      courseSection: new FormControl(assignmentCourseSectionRawValue.courseSection),
    });
  }

  getAssignmentCourseSection(form: AssignmentCourseSectionFormGroup): IAssignmentCourseSection | NewAssignmentCourseSection {
    return this.convertAssignmentCourseSectionRawValueToAssignmentCourseSection(
      form.getRawValue() as AssignmentCourseSectionFormRawValue | NewAssignmentCourseSectionFormRawValue,
    );
  }

  resetForm(form: AssignmentCourseSectionFormGroup, assignmentCourseSection: AssignmentCourseSectionFormGroupInput): void {
    const assignmentCourseSectionRawValue = this.convertAssignmentCourseSectionToAssignmentCourseSectionRawValue({
      ...this.getFormDefaults(),
      ...assignmentCourseSection,
    });
    form.reset(
      {
        ...assignmentCourseSectionRawValue,
        id: { value: assignmentCourseSectionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AssignmentCourseSectionFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      startDate: currentTime,
      endDate: currentTime,
    };
  }

  private convertAssignmentCourseSectionRawValueToAssignmentCourseSection(
    rawAssignmentCourseSection: AssignmentCourseSectionFormRawValue | NewAssignmentCourseSectionFormRawValue,
  ): IAssignmentCourseSection | NewAssignmentCourseSection {
    return {
      ...rawAssignmentCourseSection,
      startDate: dayjs(rawAssignmentCourseSection.startDate, DATE_TIME_FORMAT),
      endDate: dayjs(rawAssignmentCourseSection.endDate, DATE_TIME_FORMAT),
    };
  }

  private convertAssignmentCourseSectionToAssignmentCourseSectionRawValue(
    assignmentCourseSection: IAssignmentCourseSection | (Partial<NewAssignmentCourseSection> & AssignmentCourseSectionFormDefaults),
  ): AssignmentCourseSectionFormRawValue | PartialWithRequiredKeyOf<NewAssignmentCourseSectionFormRawValue> {
    return {
      ...assignmentCourseSection,
      startDate: assignmentCourseSection.startDate ? assignmentCourseSection.startDate.format(DATE_TIME_FORMAT) : undefined,
      endDate: assignmentCourseSection.endDate ? assignmentCourseSection.endDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
