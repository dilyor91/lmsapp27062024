import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAssignment, NewAssignment } from '../assignment.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAssignment for edit and NewAssignmentFormGroupInput for create.
 */
type AssignmentFormGroupInput = IAssignment | PartialWithRequiredKeyOf<NewAssignment>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAssignment | NewAssignment> = Omit<T, 'startDate' | 'endDate' | 'dueDate'> & {
  startDate?: string | null;
  endDate?: string | null;
  dueDate?: string | null;
};

type AssignmentFormRawValue = FormValueOf<IAssignment>;

type NewAssignmentFormRawValue = FormValueOf<NewAssignment>;

type AssignmentFormDefaults = Pick<NewAssignment, 'id' | 'startDate' | 'endDate' | 'dueDate' | 'published' | 'courseSections'>;

type AssignmentFormGroupContent = {
  id: FormControl<AssignmentFormRawValue['id'] | NewAssignment['id']>;
  name: FormControl<AssignmentFormRawValue['name']>;
  content: FormControl<AssignmentFormRawValue['content']>;
  points: FormControl<AssignmentFormRawValue['points']>;
  submissionType: FormControl<AssignmentFormRawValue['submissionType']>;
  allowedAttempts: FormControl<AssignmentFormRawValue['allowedAttempts']>;
  startDate: FormControl<AssignmentFormRawValue['startDate']>;
  endDate: FormControl<AssignmentFormRawValue['endDate']>;
  dueDate: FormControl<AssignmentFormRawValue['dueDate']>;
  published: FormControl<AssignmentFormRawValue['published']>;
  course: FormControl<AssignmentFormRawValue['course']>;
  courseSections: FormControl<AssignmentFormRawValue['courseSections']>;
};

export type AssignmentFormGroup = FormGroup<AssignmentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AssignmentFormService {
  createAssignmentFormGroup(assignment: AssignmentFormGroupInput = { id: null }): AssignmentFormGroup {
    const assignmentRawValue = this.convertAssignmentToAssignmentRawValue({
      ...this.getFormDefaults(),
      ...assignment,
    });
    return new FormGroup<AssignmentFormGroupContent>({
      id: new FormControl(
        { value: assignmentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(assignmentRawValue.name, {
        validators: [Validators.required],
      }),
      content: new FormControl(assignmentRawValue.content),
      points: new FormControl(assignmentRawValue.points),
      submissionType: new FormControl(assignmentRawValue.submissionType),
      allowedAttempts: new FormControl(assignmentRawValue.allowedAttempts),
      startDate: new FormControl(assignmentRawValue.startDate),
      endDate: new FormControl(assignmentRawValue.endDate),
      dueDate: new FormControl(assignmentRawValue.dueDate),
      published: new FormControl(assignmentRawValue.published),
      course: new FormControl(assignmentRawValue.course),
      courseSections: new FormControl(assignmentRawValue.courseSections ?? []),
    });
  }

  getAssignment(form: AssignmentFormGroup): IAssignment | NewAssignment {
    return this.convertAssignmentRawValueToAssignment(form.getRawValue() as AssignmentFormRawValue | NewAssignmentFormRawValue);
  }

  resetForm(form: AssignmentFormGroup, assignment: AssignmentFormGroupInput): void {
    const assignmentRawValue = this.convertAssignmentToAssignmentRawValue({ ...this.getFormDefaults(), ...assignment });
    form.reset(
      {
        ...assignmentRawValue,
        id: { value: assignmentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AssignmentFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      startDate: currentTime,
      endDate: currentTime,
      dueDate: currentTime,
      published: false,
      courseSections: [],
    };
  }

  private convertAssignmentRawValueToAssignment(
    rawAssignment: AssignmentFormRawValue | NewAssignmentFormRawValue,
  ): IAssignment | NewAssignment {
    return {
      ...rawAssignment,
      startDate: dayjs(rawAssignment.startDate, DATE_TIME_FORMAT),
      endDate: dayjs(rawAssignment.endDate, DATE_TIME_FORMAT),
      dueDate: dayjs(rawAssignment.dueDate, DATE_TIME_FORMAT),
    };
  }

  private convertAssignmentToAssignmentRawValue(
    assignment: IAssignment | (Partial<NewAssignment> & AssignmentFormDefaults),
  ): AssignmentFormRawValue | PartialWithRequiredKeyOf<NewAssignmentFormRawValue> {
    return {
      ...assignment,
      startDate: assignment.startDate ? assignment.startDate.format(DATE_TIME_FORMAT) : undefined,
      endDate: assignment.endDate ? assignment.endDate.format(DATE_TIME_FORMAT) : undefined,
      dueDate: assignment.dueDate ? assignment.dueDate.format(DATE_TIME_FORMAT) : undefined,
      courseSections: assignment.courseSections ?? [],
    };
  }
}
