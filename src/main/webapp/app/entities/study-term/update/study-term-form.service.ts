import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IStudyTerm, NewStudyTerm } from '../study-term.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStudyTerm for edit and NewStudyTermFormGroupInput for create.
 */
type StudyTermFormGroupInput = IStudyTerm | PartialWithRequiredKeyOf<NewStudyTerm>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IStudyTerm | NewStudyTerm> = Omit<T, 'startDate' | 'endDate'> & {
  startDate?: string | null;
  endDate?: string | null;
};

type StudyTermFormRawValue = FormValueOf<IStudyTerm>;

type NewStudyTermFormRawValue = FormValueOf<NewStudyTerm>;

type StudyTermFormDefaults = Pick<NewStudyTerm, 'id' | 'startDate' | 'endDate' | 'status'>;

type StudyTermFormGroupContent = {
  id: FormControl<StudyTermFormRawValue['id'] | NewStudyTerm['id']>;
  termName: FormControl<StudyTermFormRawValue['termName']>;
  startDate: FormControl<StudyTermFormRawValue['startDate']>;
  endDate: FormControl<StudyTermFormRawValue['endDate']>;
  status: FormControl<StudyTermFormRawValue['status']>;
  studyAcademicYear: FormControl<StudyTermFormRawValue['studyAcademicYear']>;
};

export type StudyTermFormGroup = FormGroup<StudyTermFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StudyTermFormService {
  createStudyTermFormGroup(studyTerm: StudyTermFormGroupInput = { id: null }): StudyTermFormGroup {
    const studyTermRawValue = this.convertStudyTermToStudyTermRawValue({
      ...this.getFormDefaults(),
      ...studyTerm,
    });
    return new FormGroup<StudyTermFormGroupContent>({
      id: new FormControl(
        { value: studyTermRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      termName: new FormControl(studyTermRawValue.termName, {
        validators: [Validators.required],
      }),
      startDate: new FormControl(studyTermRawValue.startDate, {
        validators: [Validators.required],
      }),
      endDate: new FormControl(studyTermRawValue.endDate, {
        validators: [Validators.required],
      }),
      status: new FormControl(studyTermRawValue.status, {
        validators: [Validators.required],
      }),
      studyAcademicYear: new FormControl(studyTermRawValue.studyAcademicYear),
    });
  }

  getStudyTerm(form: StudyTermFormGroup): IStudyTerm | NewStudyTerm {
    return this.convertStudyTermRawValueToStudyTerm(form.getRawValue() as StudyTermFormRawValue | NewStudyTermFormRawValue);
  }

  resetForm(form: StudyTermFormGroup, studyTerm: StudyTermFormGroupInput): void {
    const studyTermRawValue = this.convertStudyTermToStudyTermRawValue({ ...this.getFormDefaults(), ...studyTerm });
    form.reset(
      {
        ...studyTermRawValue,
        id: { value: studyTermRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): StudyTermFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      startDate: currentTime,
      endDate: currentTime,
      status: false,
    };
  }

  private convertStudyTermRawValueToStudyTerm(rawStudyTerm: StudyTermFormRawValue | NewStudyTermFormRawValue): IStudyTerm | NewStudyTerm {
    return {
      ...rawStudyTerm,
      startDate: dayjs(rawStudyTerm.startDate, DATE_TIME_FORMAT),
      endDate: dayjs(rawStudyTerm.endDate, DATE_TIME_FORMAT),
    };
  }

  private convertStudyTermToStudyTermRawValue(
    studyTerm: IStudyTerm | (Partial<NewStudyTerm> & StudyTermFormDefaults),
  ): StudyTermFormRawValue | PartialWithRequiredKeyOf<NewStudyTermFormRawValue> {
    return {
      ...studyTerm,
      startDate: studyTerm.startDate ? studyTerm.startDate.format(DATE_TIME_FORMAT) : undefined,
      endDate: studyTerm.endDate ? studyTerm.endDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
