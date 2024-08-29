import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

type AssignmentFormDefaults = Pick<NewAssignment, 'id' | 'published'>;

type AssignmentFormGroupContent = {
  id: FormControl<IAssignment['id'] | NewAssignment['id']>;
  name: FormControl<IAssignment['name']>;
  content: FormControl<IAssignment['content']>;
  points: FormControl<IAssignment['points']>;
  submissionType: FormControl<IAssignment['submissionType']>;
  allowedAttempts: FormControl<IAssignment['allowedAttempts']>;
  published: FormControl<IAssignment['published']>;
};

export type AssignmentFormGroup = FormGroup<AssignmentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AssignmentFormService {
  createAssignmentFormGroup(assignment: AssignmentFormGroupInput = { id: null }): AssignmentFormGroup {
    const assignmentRawValue = {
      ...this.getFormDefaults(),
      ...assignment,
    };
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
      published: new FormControl(assignmentRawValue.published),
    });
  }

  getAssignment(form: AssignmentFormGroup): IAssignment | NewAssignment {
    return form.getRawValue() as IAssignment | NewAssignment;
  }

  resetForm(form: AssignmentFormGroup, assignment: AssignmentFormGroupInput): void {
    const assignmentRawValue = { ...this.getFormDefaults(), ...assignment };
    form.reset(
      {
        ...assignmentRawValue,
        id: { value: assignmentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AssignmentFormDefaults {
    return {
      id: null,
      published: false,
    };
  }
}
