import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IGrade, NewGrade } from '../grade.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGrade for edit and NewGradeFormGroupInput for create.
 */
type GradeFormGroupInput = IGrade | PartialWithRequiredKeyOf<NewGrade>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IGrade | NewGrade> = Omit<T, 'gradedDate'> & {
  gradedDate?: string | null;
};

type GradeFormRawValue = FormValueOf<IGrade>;

type NewGradeFormRawValue = FormValueOf<NewGrade>;

type GradeFormDefaults = Pick<NewGrade, 'id' | 'gradedDate'>;

type GradeFormGroupContent = {
  id: FormControl<GradeFormRawValue['id'] | NewGrade['id']>;
  point: FormControl<GradeFormRawValue['point']>;
  gradedDate: FormControl<GradeFormRawValue['gradedDate']>;
  submissionAssignment: FormControl<GradeFormRawValue['submissionAssignment']>;
  teacher: FormControl<GradeFormRawValue['teacher']>;
  assignment: FormControl<GradeFormRawValue['assignment']>;
};

export type GradeFormGroup = FormGroup<GradeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GradeFormService {
  createGradeFormGroup(grade: GradeFormGroupInput = { id: null }): GradeFormGroup {
    const gradeRawValue = this.convertGradeToGradeRawValue({
      ...this.getFormDefaults(),
      ...grade,
    });
    return new FormGroup<GradeFormGroupContent>({
      id: new FormControl(
        { value: gradeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      point: new FormControl(gradeRawValue.point),
      gradedDate: new FormControl(gradeRawValue.gradedDate),
      submissionAssignment: new FormControl(gradeRawValue.submissionAssignment),
      teacher: new FormControl(gradeRawValue.teacher),
      assignment: new FormControl(gradeRawValue.assignment),
    });
  }

  getGrade(form: GradeFormGroup): IGrade | NewGrade {
    return this.convertGradeRawValueToGrade(form.getRawValue() as GradeFormRawValue | NewGradeFormRawValue);
  }

  resetForm(form: GradeFormGroup, grade: GradeFormGroupInput): void {
    const gradeRawValue = this.convertGradeToGradeRawValue({ ...this.getFormDefaults(), ...grade });
    form.reset(
      {
        ...gradeRawValue,
        id: { value: gradeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): GradeFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      gradedDate: currentTime,
    };
  }

  private convertGradeRawValueToGrade(rawGrade: GradeFormRawValue | NewGradeFormRawValue): IGrade | NewGrade {
    return {
      ...rawGrade,
      gradedDate: dayjs(rawGrade.gradedDate, DATE_TIME_FORMAT),
    };
  }

  private convertGradeToGradeRawValue(
    grade: IGrade | (Partial<NewGrade> & GradeFormDefaults),
  ): GradeFormRawValue | PartialWithRequiredKeyOf<NewGradeFormRawValue> {
    return {
      ...grade,
      gradedDate: grade.gradedDate ? grade.gradedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
