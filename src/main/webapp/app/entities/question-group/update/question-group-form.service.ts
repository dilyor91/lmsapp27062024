import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IQuestionGroup, NewQuestionGroup } from '../question-group.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IQuestionGroup for edit and NewQuestionGroupFormGroupInput for create.
 */
type QuestionGroupFormGroupInput = IQuestionGroup | PartialWithRequiredKeyOf<NewQuestionGroup>;

type QuestionGroupFormDefaults = Pick<NewQuestionGroup, 'id'>;

type QuestionGroupFormGroupContent = {
  id: FormControl<IQuestionGroup['id'] | NewQuestionGroup['id']>;
  name: FormControl<IQuestionGroup['name']>;
  course: FormControl<IQuestionGroup['course']>;
};

export type QuestionGroupFormGroup = FormGroup<QuestionGroupFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class QuestionGroupFormService {
  createQuestionGroupFormGroup(questionGroup: QuestionGroupFormGroupInput = { id: null }): QuestionGroupFormGroup {
    const questionGroupRawValue = {
      ...this.getFormDefaults(),
      ...questionGroup,
    };
    return new FormGroup<QuestionGroupFormGroupContent>({
      id: new FormControl(
        { value: questionGroupRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(questionGroupRawValue.name, {
        validators: [Validators.required],
      }),
      course: new FormControl(questionGroupRawValue.course),
    });
  }

  getQuestionGroup(form: QuestionGroupFormGroup): IQuestionGroup | NewQuestionGroup {
    return form.getRawValue() as IQuestionGroup | NewQuestionGroup;
  }

  resetForm(form: QuestionGroupFormGroup, questionGroup: QuestionGroupFormGroupInput): void {
    const questionGroupRawValue = { ...this.getFormDefaults(), ...questionGroup };
    form.reset(
      {
        ...questionGroupRawValue,
        id: { value: questionGroupRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): QuestionGroupFormDefaults {
    return {
      id: null,
    };
  }
}
