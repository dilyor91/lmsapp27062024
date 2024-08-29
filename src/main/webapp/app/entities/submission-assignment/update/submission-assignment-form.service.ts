import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISubmissionAssignment, NewSubmissionAssignment } from '../submission-assignment.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISubmissionAssignment for edit and NewSubmissionAssignmentFormGroupInput for create.
 */
type SubmissionAssignmentFormGroupInput = ISubmissionAssignment | PartialWithRequiredKeyOf<NewSubmissionAssignment>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ISubmissionAssignment | NewSubmissionAssignment> = Omit<T, 'submissionDate'> & {
  submissionDate?: string | null;
};

type SubmissionAssignmentFormRawValue = FormValueOf<ISubmissionAssignment>;

type NewSubmissionAssignmentFormRawValue = FormValueOf<NewSubmissionAssignment>;

type SubmissionAssignmentFormDefaults = Pick<NewSubmissionAssignment, 'id' | 'submissionDate'>;

type SubmissionAssignmentFormGroupContent = {
  id: FormControl<SubmissionAssignmentFormRawValue['id'] | NewSubmissionAssignment['id']>;
  submissionDate: FormControl<SubmissionAssignmentFormRawValue['submissionDate']>;
  content: FormControl<SubmissionAssignmentFormRawValue['content']>;
  comment: FormControl<SubmissionAssignmentFormRawValue['comment']>;
  attempsNumber: FormControl<SubmissionAssignmentFormRawValue['attempsNumber']>;
  student: FormControl<SubmissionAssignmentFormRawValue['student']>;
  course: FormControl<SubmissionAssignmentFormRawValue['course']>;
  assignment: FormControl<SubmissionAssignmentFormRawValue['assignment']>;
  attachment: FormControl<SubmissionAssignmentFormRawValue['attachment']>;
};

export type SubmissionAssignmentFormGroup = FormGroup<SubmissionAssignmentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SubmissionAssignmentFormService {
  createSubmissionAssignmentFormGroup(
    submissionAssignment: SubmissionAssignmentFormGroupInput = { id: null },
  ): SubmissionAssignmentFormGroup {
    const submissionAssignmentRawValue = this.convertSubmissionAssignmentToSubmissionAssignmentRawValue({
      ...this.getFormDefaults(),
      ...submissionAssignment,
    });
    return new FormGroup<SubmissionAssignmentFormGroupContent>({
      id: new FormControl(
        { value: submissionAssignmentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      submissionDate: new FormControl(submissionAssignmentRawValue.submissionDate),
      content: new FormControl(submissionAssignmentRawValue.content),
      comment: new FormControl(submissionAssignmentRawValue.comment),
      attempsNumber: new FormControl(submissionAssignmentRawValue.attempsNumber),
      student: new FormControl(submissionAssignmentRawValue.student),
      course: new FormControl(submissionAssignmentRawValue.course),
      assignment: new FormControl(submissionAssignmentRawValue.assignment),
      attachment: new FormControl(submissionAssignmentRawValue.attachment),
    });
  }

  getSubmissionAssignment(form: SubmissionAssignmentFormGroup): ISubmissionAssignment | NewSubmissionAssignment {
    return this.convertSubmissionAssignmentRawValueToSubmissionAssignment(
      form.getRawValue() as SubmissionAssignmentFormRawValue | NewSubmissionAssignmentFormRawValue,
    );
  }

  resetForm(form: SubmissionAssignmentFormGroup, submissionAssignment: SubmissionAssignmentFormGroupInput): void {
    const submissionAssignmentRawValue = this.convertSubmissionAssignmentToSubmissionAssignmentRawValue({
      ...this.getFormDefaults(),
      ...submissionAssignment,
    });
    form.reset(
      {
        ...submissionAssignmentRawValue,
        id: { value: submissionAssignmentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SubmissionAssignmentFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      submissionDate: currentTime,
    };
  }

  private convertSubmissionAssignmentRawValueToSubmissionAssignment(
    rawSubmissionAssignment: SubmissionAssignmentFormRawValue | NewSubmissionAssignmentFormRawValue,
  ): ISubmissionAssignment | NewSubmissionAssignment {
    return {
      ...rawSubmissionAssignment,
      submissionDate: dayjs(rawSubmissionAssignment.submissionDate, DATE_TIME_FORMAT),
    };
  }

  private convertSubmissionAssignmentToSubmissionAssignmentRawValue(
    submissionAssignment: ISubmissionAssignment | (Partial<NewSubmissionAssignment> & SubmissionAssignmentFormDefaults),
  ): SubmissionAssignmentFormRawValue | PartialWithRequiredKeyOf<NewSubmissionAssignmentFormRawValue> {
    return {
      ...submissionAssignment,
      submissionDate: submissionAssignment.submissionDate ? submissionAssignment.submissionDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
