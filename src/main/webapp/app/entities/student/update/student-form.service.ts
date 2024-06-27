import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IStudent, NewStudent } from '../student.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStudent for edit and NewStudentFormGroupInput for create.
 */
type StudentFormGroupInput = IStudent | PartialWithRequiredKeyOf<NewStudent>;

type StudentFormDefaults = Pick<NewStudent, 'id' | 'isActive'>;

type StudentFormGroupContent = {
  id: FormControl<IStudent['id'] | NewStudent['id']>;
  firstName: FormControl<IStudent['firstName']>;
  lastName: FormControl<IStudent['lastName']>;
  middleName: FormControl<IStudent['middleName']>;
  gender: FormControl<IStudent['gender']>;
  birthdate: FormControl<IStudent['birthdate']>;
  phoneNumber: FormControl<IStudent['phoneNumber']>;
  email: FormControl<IStudent['email']>;
  hemisId: FormControl<IStudent['hemisId']>;
  passportNumber: FormControl<IStudent['passportNumber']>;
  jshshir: FormControl<IStudent['jshshir']>;
  isActive: FormControl<IStudent['isActive']>;
  tutionType: FormControl<IStudent['tutionType']>;
  nationality: FormControl<IStudent['nationality']>;
  country: FormControl<IStudent['country']>;
  city: FormControl<IStudent['city']>;
  region: FormControl<IStudent['region']>;
  addressLine: FormControl<IStudent['addressLine']>;
  course: FormControl<IStudent['course']>;
  semester: FormControl<IStudent['semester']>;
  educationLanguage: FormControl<IStudent['educationLanguage']>;
  educationType: FormControl<IStudent['educationType']>;
  educationForm: FormControl<IStudent['educationForm']>;
  studyAcademicYear: FormControl<IStudent['studyAcademicYear']>;
  user: FormControl<IStudent['user']>;
  faculty: FormControl<IStudent['faculty']>;
  speciality: FormControl<IStudent['speciality']>;
  group: FormControl<IStudent['group']>;
};

export type StudentFormGroup = FormGroup<StudentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StudentFormService {
  createStudentFormGroup(student: StudentFormGroupInput = { id: null }): StudentFormGroup {
    const studentRawValue = {
      ...this.getFormDefaults(),
      ...student,
    };
    return new FormGroup<StudentFormGroupContent>({
      id: new FormControl(
        { value: studentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      firstName: new FormControl(studentRawValue.firstName, {
        validators: [Validators.required],
      }),
      lastName: new FormControl(studentRawValue.lastName, {
        validators: [Validators.required],
      }),
      middleName: new FormControl(studentRawValue.middleName, {
        validators: [Validators.required],
      }),
      gender: new FormControl(studentRawValue.gender, {
        validators: [Validators.required],
      }),
      birthdate: new FormControl(studentRawValue.birthdate, {
        validators: [Validators.required],
      }),
      phoneNumber: new FormControl(studentRawValue.phoneNumber),
      email: new FormControl(studentRawValue.email, {
        validators: [Validators.required],
      }),
      hemisId: new FormControl(studentRawValue.hemisId),
      passportNumber: new FormControl(studentRawValue.passportNumber, {
        validators: [Validators.required],
      }),
      jshshir: new FormControl(studentRawValue.jshshir, {
        validators: [Validators.required],
      }),
      isActive: new FormControl(studentRawValue.isActive),
      tutionType: new FormControl(studentRawValue.tutionType),
      nationality: new FormControl(studentRawValue.nationality),
      country: new FormControl(studentRawValue.country),
      city: new FormControl(studentRawValue.city),
      region: new FormControl(studentRawValue.region),
      addressLine: new FormControl(studentRawValue.addressLine),
      course: new FormControl(studentRawValue.course),
      semester: new FormControl(studentRawValue.semester),
      educationLanguage: new FormControl(studentRawValue.educationLanguage),
      educationType: new FormControl(studentRawValue.educationType),
      educationForm: new FormControl(studentRawValue.educationForm),
      studyAcademicYear: new FormControl(studentRawValue.studyAcademicYear),
      user: new FormControl(studentRawValue.user),
      faculty: new FormControl(studentRawValue.faculty),
      speciality: new FormControl(studentRawValue.speciality),
      group: new FormControl(studentRawValue.group),
    });
  }

  getStudent(form: StudentFormGroup): IStudent | NewStudent {
    return form.getRawValue() as IStudent | NewStudent;
  }

  resetForm(form: StudentFormGroup, student: StudentFormGroupInput): void {
    const studentRawValue = { ...this.getFormDefaults(), ...student };
    form.reset(
      {
        ...studentRawValue,
        id: { value: studentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): StudentFormDefaults {
    return {
      id: null,
      isActive: false,
    };
  }
}
