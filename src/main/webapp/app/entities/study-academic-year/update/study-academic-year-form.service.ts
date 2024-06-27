import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IStudyAcademicYear, NewStudyAcademicYear } from '../study-academic-year.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStudyAcademicYear for edit and NewStudyAcademicYearFormGroupInput for create.
 */
type StudyAcademicYearFormGroupInput = IStudyAcademicYear | PartialWithRequiredKeyOf<NewStudyAcademicYear>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IStudyAcademicYear | NewStudyAcademicYear> = Omit<T, 'fromDate' | 'endDate'> & {
  fromDate?: string | null;
  endDate?: string | null;
};

type StudyAcademicYearFormRawValue = FormValueOf<IStudyAcademicYear>;

type NewStudyAcademicYearFormRawValue = FormValueOf<NewStudyAcademicYear>;

type StudyAcademicYearFormDefaults = Pick<NewStudyAcademicYear, 'id' | 'fromDate' | 'endDate'>;

type StudyAcademicYearFormGroupContent = {
  id: FormControl<StudyAcademicYearFormRawValue['id'] | NewStudyAcademicYear['id']>;
  fromDate: FormControl<StudyAcademicYearFormRawValue['fromDate']>;
  endDate: FormControl<StudyAcademicYearFormRawValue['endDate']>;
};

export type StudyAcademicYearFormGroup = FormGroup<StudyAcademicYearFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StudyAcademicYearFormService {
  createStudyAcademicYearFormGroup(studyAcademicYear: StudyAcademicYearFormGroupInput = { id: null }): StudyAcademicYearFormGroup {
    const studyAcademicYearRawValue = this.convertStudyAcademicYearToStudyAcademicYearRawValue({
      ...this.getFormDefaults(),
      ...studyAcademicYear,
    });
    return new FormGroup<StudyAcademicYearFormGroupContent>({
      id: new FormControl(
        { value: studyAcademicYearRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      fromDate: new FormControl(studyAcademicYearRawValue.fromDate),
      endDate: new FormControl(studyAcademicYearRawValue.endDate),
    });
  }

  getStudyAcademicYear(form: StudyAcademicYearFormGroup): IStudyAcademicYear | NewStudyAcademicYear {
    return this.convertStudyAcademicYearRawValueToStudyAcademicYear(
      form.getRawValue() as StudyAcademicYearFormRawValue | NewStudyAcademicYearFormRawValue,
    );
  }

  resetForm(form: StudyAcademicYearFormGroup, studyAcademicYear: StudyAcademicYearFormGroupInput): void {
    const studyAcademicYearRawValue = this.convertStudyAcademicYearToStudyAcademicYearRawValue({
      ...this.getFormDefaults(),
      ...studyAcademicYear,
    });
    form.reset(
      {
        ...studyAcademicYearRawValue,
        id: { value: studyAcademicYearRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): StudyAcademicYearFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      fromDate: currentTime,
      endDate: currentTime,
    };
  }

  private convertStudyAcademicYearRawValueToStudyAcademicYear(
    rawStudyAcademicYear: StudyAcademicYearFormRawValue | NewStudyAcademicYearFormRawValue,
  ): IStudyAcademicYear | NewStudyAcademicYear {
    return {
      ...rawStudyAcademicYear,
      fromDate: dayjs(rawStudyAcademicYear.fromDate, DATE_TIME_FORMAT),
      endDate: dayjs(rawStudyAcademicYear.endDate, DATE_TIME_FORMAT),
    };
  }

  private convertStudyAcademicYearToStudyAcademicYearRawValue(
    studyAcademicYear: IStudyAcademicYear | (Partial<NewStudyAcademicYear> & StudyAcademicYearFormDefaults),
  ): StudyAcademicYearFormRawValue | PartialWithRequiredKeyOf<NewStudyAcademicYearFormRawValue> {
    return {
      ...studyAcademicYear,
      fromDate: studyAcademicYear.fromDate ? studyAcademicYear.fromDate.format(DATE_TIME_FORMAT) : undefined,
      endDate: studyAcademicYear.endDate ? studyAcademicYear.endDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
