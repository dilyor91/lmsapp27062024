import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IStudentQuestion, NewStudentQuestion } from '../student-question.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStudentQuestion for edit and NewStudentQuestionFormGroupInput for create.
 */
type StudentQuestionFormGroupInput = IStudentQuestion | PartialWithRequiredKeyOf<NewStudentQuestion>;

type StudentQuestionFormDefaults = Pick<NewStudentQuestion, 'id'>;

type StudentQuestionFormGroupContent = {
  id: FormControl<IStudentQuestion['id'] | NewStudentQuestion['id']>;
  ordNum: FormControl<IStudentQuestion['ordNum']>;
  quizSession: FormControl<IStudentQuestion['quizSession']>;
  question: FormControl<IStudentQuestion['question']>;
};

export type StudentQuestionFormGroup = FormGroup<StudentQuestionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StudentQuestionFormService {
  createStudentQuestionFormGroup(studentQuestion: StudentQuestionFormGroupInput = { id: null }): StudentQuestionFormGroup {
    const studentQuestionRawValue = {
      ...this.getFormDefaults(),
      ...studentQuestion,
    };
    return new FormGroup<StudentQuestionFormGroupContent>({
      id: new FormControl(
        { value: studentQuestionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      ordNum: new FormControl(studentQuestionRawValue.ordNum),
      quizSession: new FormControl(studentQuestionRawValue.quizSession),
      question: new FormControl(studentQuestionRawValue.question),
    });
  }

  getStudentQuestion(form: StudentQuestionFormGroup): IStudentQuestion | NewStudentQuestion {
    return form.getRawValue() as IStudentQuestion | NewStudentQuestion;
  }

  resetForm(form: StudentQuestionFormGroup, studentQuestion: StudentQuestionFormGroupInput): void {
    const studentQuestionRawValue = { ...this.getFormDefaults(), ...studentQuestion };
    form.reset(
      {
        ...studentQuestionRawValue,
        id: { value: studentQuestionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): StudentQuestionFormDefaults {
    return {
      id: null,
    };
  }
}
