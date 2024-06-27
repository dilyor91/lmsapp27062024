import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../study-academic-year.test-samples';

import { StudyAcademicYearFormService } from './study-academic-year-form.service';

describe('StudyAcademicYear Form Service', () => {
  let service: StudyAcademicYearFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyAcademicYearFormService);
  });

  describe('Service methods', () => {
    describe('createStudyAcademicYearFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createStudyAcademicYearFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fromDate: expect.any(Object),
            endDate: expect.any(Object),
          }),
        );
      });

      it('passing IStudyAcademicYear should create a new form with FormGroup', () => {
        const formGroup = service.createStudyAcademicYearFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fromDate: expect.any(Object),
            endDate: expect.any(Object),
          }),
        );
      });
    });

    describe('getStudyAcademicYear', () => {
      it('should return NewStudyAcademicYear for default StudyAcademicYear initial value', () => {
        const formGroup = service.createStudyAcademicYearFormGroup(sampleWithNewData);

        const studyAcademicYear = service.getStudyAcademicYear(formGroup) as any;

        expect(studyAcademicYear).toMatchObject(sampleWithNewData);
      });

      it('should return NewStudyAcademicYear for empty StudyAcademicYear initial value', () => {
        const formGroup = service.createStudyAcademicYearFormGroup();

        const studyAcademicYear = service.getStudyAcademicYear(formGroup) as any;

        expect(studyAcademicYear).toMatchObject({});
      });

      it('should return IStudyAcademicYear', () => {
        const formGroup = service.createStudyAcademicYearFormGroup(sampleWithRequiredData);

        const studyAcademicYear = service.getStudyAcademicYear(formGroup) as any;

        expect(studyAcademicYear).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IStudyAcademicYear should not enable id FormControl', () => {
        const formGroup = service.createStudyAcademicYearFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewStudyAcademicYear should disable id FormControl', () => {
        const formGroup = service.createStudyAcademicYearFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
