import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITeacher, NewTeacher } from '../teacher.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITeacher for edit and NewTeacherFormGroupInput for create.
 */
type TeacherFormGroupInput = ITeacher | PartialWithRequiredKeyOf<NewTeacher>;

type TeacherFormDefaults = Pick<NewTeacher, 'id' | 'isActive'>;

type TeacherFormGroupContent = {
  id: FormControl<ITeacher['id'] | NewTeacher['id']>;
  firstName: FormControl<ITeacher['firstName']>;
  lastName: FormControl<ITeacher['lastName']>;
  middleName: FormControl<ITeacher['middleName']>;
  gender: FormControl<ITeacher['gender']>;
  birthdate: FormControl<ITeacher['birthdate']>;
  phoneNumber: FormControl<ITeacher['phoneNumber']>;
  email: FormControl<ITeacher['email']>;
  passportNumber: FormControl<ITeacher['passportNumber']>;
  jshshir: FormControl<ITeacher['jshshir']>;
  isActive: FormControl<ITeacher['isActive']>;
  nationality: FormControl<ITeacher['nationality']>;
  country: FormControl<ITeacher['country']>;
  city: FormControl<ITeacher['city']>;
  region: FormControl<ITeacher['region']>;
  addressLine: FormControl<ITeacher['addressLine']>;
  position: FormControl<ITeacher['position']>;
  academicDegree: FormControl<ITeacher['academicDegree']>;
  academicTitle: FormControl<ITeacher['academicTitle']>;
  user: FormControl<ITeacher['user']>;
  faculty: FormControl<ITeacher['faculty']>;
  department: FormControl<ITeacher['department']>;
};

export type TeacherFormGroup = FormGroup<TeacherFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TeacherFormService {
  createTeacherFormGroup(teacher: TeacherFormGroupInput = { id: null }): TeacherFormGroup {
    const teacherRawValue = {
      ...this.getFormDefaults(),
      ...teacher,
    };
    return new FormGroup<TeacherFormGroupContent>({
      id: new FormControl(
        { value: teacherRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      firstName: new FormControl(teacherRawValue.firstName, {
        validators: [Validators.required],
      }),
      lastName: new FormControl(teacherRawValue.lastName, {
        validators: [Validators.required],
      }),
      middleName: new FormControl(teacherRawValue.middleName),
      gender: new FormControl(teacherRawValue.gender, {
        validators: [Validators.required],
      }),
      birthdate: new FormControl(teacherRawValue.birthdate, {
        validators: [Validators.required],
      }),
      phoneNumber: new FormControl(teacherRawValue.phoneNumber),
      email: new FormControl(teacherRawValue.email, {
        validators: [Validators.required],
      }),
      passportNumber: new FormControl(teacherRawValue.passportNumber, {
        validators: [Validators.required],
      }),
      jshshir: new FormControl(teacherRawValue.jshshir, {
        validators: [Validators.required],
      }),
      isActive: new FormControl(teacherRawValue.isActive),
      nationality: new FormControl(teacherRawValue.nationality),
      country: new FormControl(teacherRawValue.country),
      city: new FormControl(teacherRawValue.city),
      region: new FormControl(teacherRawValue.region),
      addressLine: new FormControl(teacherRawValue.addressLine),
      position: new FormControl(teacherRawValue.position),
      academicDegree: new FormControl(teacherRawValue.academicDegree),
      academicTitle: new FormControl(teacherRawValue.academicTitle),
      user: new FormControl(teacherRawValue.user),
      faculty: new FormControl(teacherRawValue.faculty),
      department: new FormControl(teacherRawValue.department),
    });
  }

  getTeacher(form: TeacherFormGroup): ITeacher | NewTeacher {
    return form.getRawValue() as ITeacher | NewTeacher;
  }

  resetForm(form: TeacherFormGroup, teacher: TeacherFormGroupInput): void {
    const teacherRawValue = { ...this.getFormDefaults(), ...teacher };
    form.reset(
      {
        ...teacherRawValue,
        id: { value: teacherRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TeacherFormDefaults {
    return {
      id: null,
      isActive: false,
    };
  }
}
