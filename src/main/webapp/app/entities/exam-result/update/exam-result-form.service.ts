import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IExamResult, NewExamResult } from '../exam-result.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IExamResult for edit and NewExamResultFormGroupInput for create.
 */
type ExamResultFormGroupInput = IExamResult | PartialWithRequiredKeyOf<NewExamResult>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IExamResult | NewExamResult> = Omit<T, 'gradedDate'> & {
  gradedDate?: string | null;
};

type ExamResultFormRawValue = FormValueOf<IExamResult>;

type NewExamResultFormRawValue = FormValueOf<NewExamResult>;

type ExamResultFormDefaults = Pick<NewExamResult, 'id' | 'gradedDate'>;

type ExamResultFormGroupContent = {
  id: FormControl<ExamResultFormRawValue['id'] | NewExamResult['id']>;
  point: FormControl<ExamResultFormRawValue['point']>;
  gradedDate: FormControl<ExamResultFormRawValue['gradedDate']>;
  student: FormControl<ExamResultFormRawValue['student']>;
  exam: FormControl<ExamResultFormRawValue['exam']>;
  course: FormControl<ExamResultFormRawValue['course']>;
};

export type ExamResultFormGroup = FormGroup<ExamResultFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ExamResultFormService {
  createExamResultFormGroup(examResult: ExamResultFormGroupInput = { id: null }): ExamResultFormGroup {
    const examResultRawValue = this.convertExamResultToExamResultRawValue({
      ...this.getFormDefaults(),
      ...examResult,
    });
    return new FormGroup<ExamResultFormGroupContent>({
      id: new FormControl(
        { value: examResultRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      point: new FormControl(examResultRawValue.point),
      gradedDate: new FormControl(examResultRawValue.gradedDate),
      student: new FormControl(examResultRawValue.student),
      exam: new FormControl(examResultRawValue.exam),
      course: new FormControl(examResultRawValue.course),
    });
  }

  getExamResult(form: ExamResultFormGroup): IExamResult | NewExamResult {
    return this.convertExamResultRawValueToExamResult(form.getRawValue() as ExamResultFormRawValue | NewExamResultFormRawValue);
  }

  resetForm(form: ExamResultFormGroup, examResult: ExamResultFormGroupInput): void {
    const examResultRawValue = this.convertExamResultToExamResultRawValue({ ...this.getFormDefaults(), ...examResult });
    form.reset(
      {
        ...examResultRawValue,
        id: { value: examResultRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ExamResultFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      gradedDate: currentTime,
    };
  }

  private convertExamResultRawValueToExamResult(
    rawExamResult: ExamResultFormRawValue | NewExamResultFormRawValue,
  ): IExamResult | NewExamResult {
    return {
      ...rawExamResult,
      gradedDate: dayjs(rawExamResult.gradedDate, DATE_TIME_FORMAT),
    };
  }

  private convertExamResultToExamResultRawValue(
    examResult: IExamResult | (Partial<NewExamResult> & ExamResultFormDefaults),
  ): ExamResultFormRawValue | PartialWithRequiredKeyOf<NewExamResultFormRawValue> {
    return {
      ...examResult,
      gradedDate: examResult.gradedDate ? examResult.gradedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
