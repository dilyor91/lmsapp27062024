import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IQuiz, NewQuiz } from '../quiz.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IQuiz for edit and NewQuizFormGroupInput for create.
 */
type QuizFormGroupInput = IQuiz | PartialWithRequiredKeyOf<NewQuiz>;

type QuizFormDefaults = Pick<NewQuiz, 'id' | 'published'>;

type QuizFormGroupContent = {
  id: FormControl<IQuiz['id'] | NewQuiz['id']>;
  quizName: FormControl<IQuiz['quizName']>;
  timeInMinute: FormControl<IQuiz['timeInMinute']>;
  published: FormControl<IQuiz['published']>;
  course: FormControl<IQuiz['course']>;
};

export type QuizFormGroup = FormGroup<QuizFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class QuizFormService {
  createQuizFormGroup(quiz: QuizFormGroupInput = { id: null }): QuizFormGroup {
    const quizRawValue = {
      ...this.getFormDefaults(),
      ...quiz,
    };
    return new FormGroup<QuizFormGroupContent>({
      id: new FormControl(
        { value: quizRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      quizName: new FormControl(quizRawValue.quizName, {
        validators: [Validators.required],
      }),
      timeInMinute: new FormControl(quizRawValue.timeInMinute, {
        validators: [Validators.required],
      }),
      published: new FormControl(quizRawValue.published),
      course: new FormControl(quizRawValue.course),
    });
  }

  getQuiz(form: QuizFormGroup): IQuiz | NewQuiz {
    return form.getRawValue() as IQuiz | NewQuiz;
  }

  resetForm(form: QuizFormGroup, quiz: QuizFormGroupInput): void {
    const quizRawValue = { ...this.getFormDefaults(), ...quiz };
    form.reset(
      {
        ...quizRawValue,
        id: { value: quizRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): QuizFormDefaults {
    return {
      id: null,
      published: false,
    };
  }
}
