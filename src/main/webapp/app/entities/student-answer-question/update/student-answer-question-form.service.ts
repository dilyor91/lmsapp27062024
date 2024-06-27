import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IStudentAnswerQuestion, NewStudentAnswerQuestion } from '../student-answer-question.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStudentAnswerQuestion for edit and NewStudentAnswerQuestionFormGroupInput for create.
 */
type StudentAnswerQuestionFormGroupInput = IStudentAnswerQuestion | PartialWithRequiredKeyOf<NewStudentAnswerQuestion>;

type StudentAnswerQuestionFormDefaults = Pick<NewStudentAnswerQuestion, 'id' | 'isCorrect'>;

type StudentAnswerQuestionFormGroupContent = {
  id: FormControl<IStudentAnswerQuestion['id'] | NewStudentAnswerQuestion['id']>;
  isCorrect: FormControl<IStudentAnswerQuestion['isCorrect']>;
  question: FormControl<IStudentAnswerQuestion['question']>;
  option: FormControl<IStudentAnswerQuestion['option']>;
  quizSession: FormControl<IStudentAnswerQuestion['quizSession']>;
};

export type StudentAnswerQuestionFormGroup = FormGroup<StudentAnswerQuestionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StudentAnswerQuestionFormService {
  createStudentAnswerQuestionFormGroup(
    studentAnswerQuestion: StudentAnswerQuestionFormGroupInput = { id: null },
  ): StudentAnswerQuestionFormGroup {
    const studentAnswerQuestionRawValue = {
      ...this.getFormDefaults(),
      ...studentAnswerQuestion,
    };
    return new FormGroup<StudentAnswerQuestionFormGroupContent>({
      id: new FormControl(
        { value: studentAnswerQuestionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      isCorrect: new FormControl(studentAnswerQuestionRawValue.isCorrect),
      question: new FormControl(studentAnswerQuestionRawValue.question),
      option: new FormControl(studentAnswerQuestionRawValue.option),
      quizSession: new FormControl(studentAnswerQuestionRawValue.quizSession),
    });
  }

  getStudentAnswerQuestion(form: StudentAnswerQuestionFormGroup): IStudentAnswerQuestion | NewStudentAnswerQuestion {
    return form.getRawValue() as IStudentAnswerQuestion | NewStudentAnswerQuestion;
  }

  resetForm(form: StudentAnswerQuestionFormGroup, studentAnswerQuestion: StudentAnswerQuestionFormGroupInput): void {
    const studentAnswerQuestionRawValue = { ...this.getFormDefaults(), ...studentAnswerQuestion };
    form.reset(
      {
        ...studentAnswerQuestionRawValue,
        id: { value: studentAnswerQuestionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): StudentAnswerQuestionFormDefaults {
    return {
      id: null,
      isCorrect: false,
    };
  }
}
