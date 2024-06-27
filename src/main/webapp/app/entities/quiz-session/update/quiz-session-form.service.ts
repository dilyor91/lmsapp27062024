import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IQuizSession, NewQuizSession } from '../quiz-session.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IQuizSession for edit and NewQuizSessionFormGroupInput for create.
 */
type QuizSessionFormGroupInput = IQuizSession | PartialWithRequiredKeyOf<NewQuizSession>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IQuizSession | NewQuizSession> = Omit<T, 'startTime' | 'endTime'> & {
  startTime?: string | null;
  endTime?: string | null;
};

type QuizSessionFormRawValue = FormValueOf<IQuizSession>;

type NewQuizSessionFormRawValue = FormValueOf<NewQuizSession>;

type QuizSessionFormDefaults = Pick<NewQuizSession, 'id' | 'startTime' | 'endTime'>;

type QuizSessionFormGroupContent = {
  id: FormControl<QuizSessionFormRawValue['id'] | NewQuizSession['id']>;
  startTime: FormControl<QuizSessionFormRawValue['startTime']>;
  endTime: FormControl<QuizSessionFormRawValue['endTime']>;
  quizSessionEnum: FormControl<QuizSessionFormRawValue['quizSessionEnum']>;
  student: FormControl<QuizSessionFormRawValue['student']>;
  quiz: FormControl<QuizSessionFormRawValue['quiz']>;
};

export type QuizSessionFormGroup = FormGroup<QuizSessionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class QuizSessionFormService {
  createQuizSessionFormGroup(quizSession: QuizSessionFormGroupInput = { id: null }): QuizSessionFormGroup {
    const quizSessionRawValue = this.convertQuizSessionToQuizSessionRawValue({
      ...this.getFormDefaults(),
      ...quizSession,
    });
    return new FormGroup<QuizSessionFormGroupContent>({
      id: new FormControl(
        { value: quizSessionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      startTime: new FormControl(quizSessionRawValue.startTime),
      endTime: new FormControl(quizSessionRawValue.endTime),
      quizSessionEnum: new FormControl(quizSessionRawValue.quizSessionEnum),
      student: new FormControl(quizSessionRawValue.student),
      quiz: new FormControl(quizSessionRawValue.quiz),
    });
  }

  getQuizSession(form: QuizSessionFormGroup): IQuizSession | NewQuizSession {
    return this.convertQuizSessionRawValueToQuizSession(form.getRawValue() as QuizSessionFormRawValue | NewQuizSessionFormRawValue);
  }

  resetForm(form: QuizSessionFormGroup, quizSession: QuizSessionFormGroupInput): void {
    const quizSessionRawValue = this.convertQuizSessionToQuizSessionRawValue({ ...this.getFormDefaults(), ...quizSession });
    form.reset(
      {
        ...quizSessionRawValue,
        id: { value: quizSessionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): QuizSessionFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      startTime: currentTime,
      endTime: currentTime,
    };
  }

  private convertQuizSessionRawValueToQuizSession(
    rawQuizSession: QuizSessionFormRawValue | NewQuizSessionFormRawValue,
  ): IQuizSession | NewQuizSession {
    return {
      ...rawQuizSession,
      startTime: dayjs(rawQuizSession.startTime, DATE_TIME_FORMAT),
      endTime: dayjs(rawQuizSession.endTime, DATE_TIME_FORMAT),
    };
  }

  private convertQuizSessionToQuizSessionRawValue(
    quizSession: IQuizSession | (Partial<NewQuizSession> & QuizSessionFormDefaults),
  ): QuizSessionFormRawValue | PartialWithRequiredKeyOf<NewQuizSessionFormRawValue> {
    return {
      ...quizSession,
      startTime: quizSession.startTime ? quizSession.startTime.format(DATE_TIME_FORMAT) : undefined,
      endTime: quizSession.endTime ? quizSession.endTime.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
