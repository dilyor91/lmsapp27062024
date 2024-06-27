import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IQuizQuestionGroup, NewQuizQuestionGroup } from '../quiz-question-group.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IQuizQuestionGroup for edit and NewQuizQuestionGroupFormGroupInput for create.
 */
type QuizQuestionGroupFormGroupInput = IQuizQuestionGroup | PartialWithRequiredKeyOf<NewQuizQuestionGroup>;

type QuizQuestionGroupFormDefaults = Pick<NewQuizQuestionGroup, 'id'>;

type QuizQuestionGroupFormGroupContent = {
  id: FormControl<IQuizQuestionGroup['id'] | NewQuizQuestionGroup['id']>;
  questionCount: FormControl<IQuizQuestionGroup['questionCount']>;
  quiz: FormControl<IQuizQuestionGroup['quiz']>;
  questionGroup: FormControl<IQuizQuestionGroup['questionGroup']>;
};

export type QuizQuestionGroupFormGroup = FormGroup<QuizQuestionGroupFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class QuizQuestionGroupFormService {
  createQuizQuestionGroupFormGroup(quizQuestionGroup: QuizQuestionGroupFormGroupInput = { id: null }): QuizQuestionGroupFormGroup {
    const quizQuestionGroupRawValue = {
      ...this.getFormDefaults(),
      ...quizQuestionGroup,
    };
    return new FormGroup<QuizQuestionGroupFormGroupContent>({
      id: new FormControl(
        { value: quizQuestionGroupRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      questionCount: new FormControl(quizQuestionGroupRawValue.questionCount),
      quiz: new FormControl(quizQuestionGroupRawValue.quiz),
      questionGroup: new FormControl(quizQuestionGroupRawValue.questionGroup),
    });
  }

  getQuizQuestionGroup(form: QuizQuestionGroupFormGroup): IQuizQuestionGroup | NewQuizQuestionGroup {
    return form.getRawValue() as IQuizQuestionGroup | NewQuizQuestionGroup;
  }

  resetForm(form: QuizQuestionGroupFormGroup, quizQuestionGroup: QuizQuestionGroupFormGroupInput): void {
    const quizQuestionGroupRawValue = { ...this.getFormDefaults(), ...quizQuestionGroup };
    form.reset(
      {
        ...quizQuestionGroupRawValue,
        id: { value: quizQuestionGroupRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): QuizQuestionGroupFormDefaults {
    return {
      id: null,
    };
  }
}
