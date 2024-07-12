import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAssignmentComment, NewAssignmentComment } from '../assignment-comment.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAssignmentComment for edit and NewAssignmentCommentFormGroupInput for create.
 */
type AssignmentCommentFormGroupInput = IAssignmentComment | PartialWithRequiredKeyOf<NewAssignmentComment>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAssignmentComment | NewAssignmentComment> = Omit<T, 'commentDate'> & {
  commentDate?: string | null;
};

type AssignmentCommentFormRawValue = FormValueOf<IAssignmentComment>;

type NewAssignmentCommentFormRawValue = FormValueOf<NewAssignmentComment>;

type AssignmentCommentFormDefaults = Pick<NewAssignmentComment, 'id' | 'commentDate'>;

type AssignmentCommentFormGroupContent = {
  id: FormControl<AssignmentCommentFormRawValue['id'] | NewAssignmentComment['id']>;
  comment: FormControl<AssignmentCommentFormRawValue['comment']>;
  commentDate: FormControl<AssignmentCommentFormRawValue['commentDate']>;
  submissionAssignment: FormControl<AssignmentCommentFormRawValue['submissionAssignment']>;
  assignment: FormControl<AssignmentCommentFormRawValue['assignment']>;
  student: FormControl<AssignmentCommentFormRawValue['student']>;
  teacher: FormControl<AssignmentCommentFormRawValue['teacher']>;
};

export type AssignmentCommentFormGroup = FormGroup<AssignmentCommentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AssignmentCommentFormService {
  createAssignmentCommentFormGroup(assignmentComment: AssignmentCommentFormGroupInput = { id: null }): AssignmentCommentFormGroup {
    const assignmentCommentRawValue = this.convertAssignmentCommentToAssignmentCommentRawValue({
      ...this.getFormDefaults(),
      ...assignmentComment,
    });
    return new FormGroup<AssignmentCommentFormGroupContent>({
      id: new FormControl(
        { value: assignmentCommentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      comment: new FormControl(assignmentCommentRawValue.comment, {
        validators: [Validators.required],
      }),
      commentDate: new FormControl(assignmentCommentRawValue.commentDate, {
        validators: [Validators.required],
      }),
      submissionAssignment: new FormControl(assignmentCommentRawValue.submissionAssignment),
      assignment: new FormControl(assignmentCommentRawValue.assignment),
      student: new FormControl(assignmentCommentRawValue.student),
      teacher: new FormControl(assignmentCommentRawValue.teacher),
    });
  }

  getAssignmentComment(form: AssignmentCommentFormGroup): IAssignmentComment | NewAssignmentComment {
    return this.convertAssignmentCommentRawValueToAssignmentComment(
      form.getRawValue() as AssignmentCommentFormRawValue | NewAssignmentCommentFormRawValue,
    );
  }

  resetForm(form: AssignmentCommentFormGroup, assignmentComment: AssignmentCommentFormGroupInput): void {
    const assignmentCommentRawValue = this.convertAssignmentCommentToAssignmentCommentRawValue({
      ...this.getFormDefaults(),
      ...assignmentComment,
    });
    form.reset(
      {
        ...assignmentCommentRawValue,
        id: { value: assignmentCommentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AssignmentCommentFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      commentDate: currentTime,
    };
  }

  private convertAssignmentCommentRawValueToAssignmentComment(
    rawAssignmentComment: AssignmentCommentFormRawValue | NewAssignmentCommentFormRawValue,
  ): IAssignmentComment | NewAssignmentComment {
    return {
      ...rawAssignmentComment,
      commentDate: dayjs(rawAssignmentComment.commentDate, DATE_TIME_FORMAT),
    };
  }

  private convertAssignmentCommentToAssignmentCommentRawValue(
    assignmentComment: IAssignmentComment | (Partial<NewAssignmentComment> & AssignmentCommentFormDefaults),
  ): AssignmentCommentFormRawValue | PartialWithRequiredKeyOf<NewAssignmentCommentFormRawValue> {
    return {
      ...assignmentComment,
      commentDate: assignmentComment.commentDate ? assignmentComment.commentDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
