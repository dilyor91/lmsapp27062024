import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IStudentOption, NewStudentOption } from '../student-option.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStudentOption for edit and NewStudentOptionFormGroupInput for create.
 */
type StudentOptionFormGroupInput = IStudentOption | PartialWithRequiredKeyOf<NewStudentOption>;

type StudentOptionFormDefaults = Pick<NewStudentOption, 'id'>;

type StudentOptionFormGroupContent = {
  id: FormControl<IStudentOption['id'] | NewStudentOption['id']>;
  ordNum: FormControl<IStudentOption['ordNum']>;
  studentQuestion: FormControl<IStudentOption['studentQuestion']>;
  option: FormControl<IStudentOption['option']>;
};

export type StudentOptionFormGroup = FormGroup<StudentOptionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StudentOptionFormService {
  createStudentOptionFormGroup(studentOption: StudentOptionFormGroupInput = { id: null }): StudentOptionFormGroup {
    const studentOptionRawValue = {
      ...this.getFormDefaults(),
      ...studentOption,
    };
    return new FormGroup<StudentOptionFormGroupContent>({
      id: new FormControl(
        { value: studentOptionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      ordNum: new FormControl(studentOptionRawValue.ordNum),
      studentQuestion: new FormControl(studentOptionRawValue.studentQuestion),
      option: new FormControl(studentOptionRawValue.option),
    });
  }

  getStudentOption(form: StudentOptionFormGroup): IStudentOption | NewStudentOption {
    return form.getRawValue() as IStudentOption | NewStudentOption;
  }

  resetForm(form: StudentOptionFormGroup, studentOption: StudentOptionFormGroupInput): void {
    const studentOptionRawValue = { ...this.getFormDefaults(), ...studentOption };
    form.reset(
      {
        ...studentOptionRawValue,
        id: { value: studentOptionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): StudentOptionFormDefaults {
    return {
      id: null,
    };
  }
}
