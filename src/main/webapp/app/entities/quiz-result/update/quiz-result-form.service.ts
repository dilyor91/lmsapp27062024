import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IQuizResult, NewQuizResult } from '../quiz-result.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IQuizResult for edit and NewQuizResultFormGroupInput for create.
 */
type QuizResultFormGroupInput = IQuizResult | PartialWithRequiredKeyOf<NewQuizResult>;

type QuizResultFormDefaults = Pick<NewQuizResult, 'id'>;

type QuizResultFormGroupContent = {
  id: FormControl<IQuizResult['id'] | NewQuizResult['id']>;
  point: FormControl<IQuizResult['point']>;
  totalQuestionCnt: FormControl<IQuizResult['totalQuestionCnt']>;
  correctAnswerCnt: FormControl<IQuizResult['correctAnswerCnt']>;
  wrongAnswerCnt: FormControl<IQuizResult['wrongAnswerCnt']>;
  quiz: FormControl<IQuizResult['quiz']>;
  student: FormControl<IQuizResult['student']>;
  quizSession: FormControl<IQuizResult['quizSession']>;
};

export type QuizResultFormGroup = FormGroup<QuizResultFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class QuizResultFormService {
  createQuizResultFormGroup(quizResult: QuizResultFormGroupInput = { id: null }): QuizResultFormGroup {
    const quizResultRawValue = {
      ...this.getFormDefaults(),
      ...quizResult,
    };
    return new FormGroup<QuizResultFormGroupContent>({
      id: new FormControl(
        { value: quizResultRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      point: new FormControl(quizResultRawValue.point),
      totalQuestionCnt: new FormControl(quizResultRawValue.totalQuestionCnt),
      correctAnswerCnt: new FormControl(quizResultRawValue.correctAnswerCnt),
      wrongAnswerCnt: new FormControl(quizResultRawValue.wrongAnswerCnt),
      quiz: new FormControl(quizResultRawValue.quiz),
      student: new FormControl(quizResultRawValue.student),
      quizSession: new FormControl(quizResultRawValue.quizSession),
    });
  }

  getQuizResult(form: QuizResultFormGroup): IQuizResult | NewQuizResult {
    return form.getRawValue() as IQuizResult | NewQuizResult;
  }

  resetForm(form: QuizResultFormGroup, quizResult: QuizResultFormGroupInput): void {
    const quizResultRawValue = { ...this.getFormDefaults(), ...quizResult };
    form.reset(
      {
        ...quizResultRawValue,
        id: { value: quizResultRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): QuizResultFormDefaults {
    return {
      id: null,
    };
  }
}
