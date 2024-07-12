import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IStudyAcademicYear } from 'app/entities/study-academic-year/study-academic-year.model';
import { StudyAcademicYearService } from 'app/entities/study-academic-year/service/study-academic-year.service';
import { StudyTermService } from '../service/study-term.service';
import { IStudyTerm } from '../study-term.model';
import { StudyTermFormService } from './study-term-form.service';

import { StudyTermUpdateComponent } from './study-term-update.component';

describe('StudyTerm Management Update Component', () => {
  let comp: StudyTermUpdateComponent;
  let fixture: ComponentFixture<StudyTermUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let studyTermFormService: StudyTermFormService;
  let studyTermService: StudyTermService;
  let studyAcademicYearService: StudyAcademicYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StudyTermUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(StudyTermUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StudyTermUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    studyTermFormService = TestBed.inject(StudyTermFormService);
    studyTermService = TestBed.inject(StudyTermService);
    studyAcademicYearService = TestBed.inject(StudyAcademicYearService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call StudyAcademicYear query and add missing value', () => {
      const studyTerm: IStudyTerm = { id: 456 };
      const studyAcademicYear: IStudyAcademicYear = { id: 21327 };
      studyTerm.studyAcademicYear = studyAcademicYear;

      const studyAcademicYearCollection: IStudyAcademicYear[] = [{ id: 13801 }];
      jest.spyOn(studyAcademicYearService, 'query').mockReturnValue(of(new HttpResponse({ body: studyAcademicYearCollection })));
      const additionalStudyAcademicYears = [studyAcademicYear];
      const expectedCollection: IStudyAcademicYear[] = [...additionalStudyAcademicYears, ...studyAcademicYearCollection];
      jest.spyOn(studyAcademicYearService, 'addStudyAcademicYearToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ studyTerm });
      comp.ngOnInit();

      expect(studyAcademicYearService.query).toHaveBeenCalled();
      expect(studyAcademicYearService.addStudyAcademicYearToCollectionIfMissing).toHaveBeenCalledWith(
        studyAcademicYearCollection,
        ...additionalStudyAcademicYears.map(expect.objectContaining),
      );
      expect(comp.studyAcademicYearsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const studyTerm: IStudyTerm = { id: 456 };
      const studyAcademicYear: IStudyAcademicYear = { id: 20552 };
      studyTerm.studyAcademicYear = studyAcademicYear;

      activatedRoute.data = of({ studyTerm });
      comp.ngOnInit();

      expect(comp.studyAcademicYearsSharedCollection).toContain(studyAcademicYear);
      expect(comp.studyTerm).toEqual(studyTerm);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudyTerm>>();
      const studyTerm = { id: 123 };
      jest.spyOn(studyTermFormService, 'getStudyTerm').mockReturnValue(studyTerm);
      jest.spyOn(studyTermService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studyTerm });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: studyTerm }));
      saveSubject.complete();

      // THEN
      expect(studyTermFormService.getStudyTerm).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(studyTermService.update).toHaveBeenCalledWith(expect.objectContaining(studyTerm));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudyTerm>>();
      const studyTerm = { id: 123 };
      jest.spyOn(studyTermFormService, 'getStudyTerm').mockReturnValue({ id: null });
      jest.spyOn(studyTermService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studyTerm: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: studyTerm }));
      saveSubject.complete();

      // THEN
      expect(studyTermFormService.getStudyTerm).toHaveBeenCalled();
      expect(studyTermService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudyTerm>>();
      const studyTerm = { id: 123 };
      jest.spyOn(studyTermService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studyTerm });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(studyTermService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareStudyAcademicYear', () => {
      it('Should forward to studyAcademicYearService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(studyAcademicYearService, 'compareStudyAcademicYear');
        comp.compareStudyAcademicYear(entity, entity2);
        expect(studyAcademicYearService.compareStudyAcademicYear).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
