import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFaculty, NewFaculty } from '../faculty.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFaculty for edit and NewFacultyFormGroupInput for create.
 */
type FacultyFormGroupInput = IFaculty | PartialWithRequiredKeyOf<NewFaculty>;

type FacultyFormDefaults = Pick<NewFaculty, 'id'>;

type FacultyFormGroupContent = {
  id: FormControl<IFaculty['id'] | NewFaculty['id']>;
  name: FormControl<IFaculty['name']>;
};

export type FacultyFormGroup = FormGroup<FacultyFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FacultyFormService {
  createFacultyFormGroup(faculty: FacultyFormGroupInput = { id: null }): FacultyFormGroup {
    const facultyRawValue = {
      ...this.getFormDefaults(),
      ...faculty,
    };
    return new FormGroup<FacultyFormGroupContent>({
      id: new FormControl(
        { value: facultyRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(facultyRawValue.name),
    });
  }

  getFaculty(form: FacultyFormGroup): IFaculty | NewFaculty {
    return form.getRawValue() as IFaculty | NewFaculty;
  }

  resetForm(form: FacultyFormGroup, faculty: FacultyFormGroupInput): void {
    const facultyRawValue = { ...this.getFormDefaults(), ...faculty };
    form.reset(
      {
        ...facultyRawValue,
        id: { value: facultyRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): FacultyFormDefaults {
    return {
      id: null,
    };
  }
}
