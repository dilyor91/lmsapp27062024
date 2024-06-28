import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../study-term.test-samples';

import { StudyTermFormService } from './study-term-form.service';

describe('StudyTerm Form Service', () => {
  let service: StudyTermFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyTermFormService);
  });

  describe('Service methods', () => {
    describe('createStudyTermFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createStudyTermFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            termName: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
            status: expect.any(Object),
            studyAcademicYear: expect.any(Object),
          }),
        );
      });

      it('passing IStudyTerm should create a new form with FormGroup', () => {
        const formGroup = service.createStudyTermFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            termName: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
            status: expect.any(Object),
            studyAcademicYear: expect.any(Object),
          }),
        );
      });
    });

    describe('getStudyTerm', () => {
      it('should return NewStudyTerm for default StudyTerm initial value', () => {
        const formGroup = service.createStudyTermFormGroup(sampleWithNewData);

        const studyTerm = service.getStudyTerm(formGroup) as any;

        expect(studyTerm).toMatchObject(sampleWithNewData);
      });

      it('should return NewStudyTerm for empty StudyTerm initial value', () => {
        const formGroup = service.createStudyTermFormGroup();

        const studyTerm = service.getStudyTerm(formGroup) as any;

        expect(studyTerm).toMatchObject({});
      });

      it('should return IStudyTerm', () => {
        const formGroup = service.createStudyTermFormGroup(sampleWithRequiredData);

        const studyTerm = service.getStudyTerm(formGroup) as any;

        expect(studyTerm).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IStudyTerm should not enable id FormControl', () => {
        const formGroup = service.createStudyTermFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewStudyTerm should disable id FormControl', () => {
        const formGroup = service.createStudyTermFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
