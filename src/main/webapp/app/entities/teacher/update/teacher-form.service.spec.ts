import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../teacher.test-samples';

import { TeacherFormService } from './teacher-form.service';

describe('Teacher Form Service', () => {
  let service: TeacherFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherFormService);
  });

  describe('Service methods', () => {
    describe('createTeacherFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTeacherFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            firstName: expect.any(Object),
            lastName: expect.any(Object),
            middleName: expect.any(Object),
            gender: expect.any(Object),
            birthdate: expect.any(Object),
            phoneNumber: expect.any(Object),
            email: expect.any(Object),
            passportNumber: expect.any(Object),
            jshshir: expect.any(Object),
            isActive: expect.any(Object),
            nationality: expect.any(Object),
            country: expect.any(Object),
            city: expect.any(Object),
            region: expect.any(Object),
            addressLine: expect.any(Object),
            position: expect.any(Object),
            academicDegree: expect.any(Object),
            academicTitle: expect.any(Object),
            user: expect.any(Object),
            faculty: expect.any(Object),
            department: expect.any(Object),
          }),
        );
      });

      it('passing ITeacher should create a new form with FormGroup', () => {
        const formGroup = service.createTeacherFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            firstName: expect.any(Object),
            lastName: expect.any(Object),
            middleName: expect.any(Object),
            gender: expect.any(Object),
            birthdate: expect.any(Object),
            phoneNumber: expect.any(Object),
            email: expect.any(Object),
            passportNumber: expect.any(Object),
            jshshir: expect.any(Object),
            isActive: expect.any(Object),
            nationality: expect.any(Object),
            country: expect.any(Object),
            city: expect.any(Object),
            region: expect.any(Object),
            addressLine: expect.any(Object),
            position: expect.any(Object),
            academicDegree: expect.any(Object),
            academicTitle: expect.any(Object),
            user: expect.any(Object),
            faculty: expect.any(Object),
            department: expect.any(Object),
          }),
        );
      });
    });

    describe('getTeacher', () => {
      it('should return NewTeacher for default Teacher initial value', () => {
        const formGroup = service.createTeacherFormGroup(sampleWithNewData);

        const teacher = service.getTeacher(formGroup) as any;

        expect(teacher).toMatchObject(sampleWithNewData);
      });

      it('should return NewTeacher for empty Teacher initial value', () => {
        const formGroup = service.createTeacherFormGroup();

        const teacher = service.getTeacher(formGroup) as any;

        expect(teacher).toMatchObject({});
      });

      it('should return ITeacher', () => {
        const formGroup = service.createTeacherFormGroup(sampleWithRequiredData);

        const teacher = service.getTeacher(formGroup) as any;

        expect(teacher).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITeacher should not enable id FormControl', () => {
        const formGroup = service.createTeacherFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTeacher should disable id FormControl', () => {
        const formGroup = service.createTeacherFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
