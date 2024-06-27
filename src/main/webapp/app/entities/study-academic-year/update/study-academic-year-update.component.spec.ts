import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { StudyAcademicYearService } from '../service/study-academic-year.service';
import { IStudyAcademicYear } from '../study-academic-year.model';
import { StudyAcademicYearFormService } from './study-academic-year-form.service';

import { StudyAcademicYearUpdateComponent } from './study-academic-year-update.component';

describe('StudyAcademicYear Management Update Component', () => {
  let comp: StudyAcademicYearUpdateComponent;
  let fixture: ComponentFixture<StudyAcademicYearUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let studyAcademicYearFormService: StudyAcademicYearFormService;
  let studyAcademicYearService: StudyAcademicYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StudyAcademicYearUpdateComponent],
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
      .overrideTemplate(StudyAcademicYearUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StudyAcademicYearUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    studyAcademicYearFormService = TestBed.inject(StudyAcademicYearFormService);
    studyAcademicYearService = TestBed.inject(StudyAcademicYearService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const studyAcademicYear: IStudyAcademicYear = { id: 456 };

      activatedRoute.data = of({ studyAcademicYear });
      comp.ngOnInit();

      expect(comp.studyAcademicYear).toEqual(studyAcademicYear);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudyAcademicYear>>();
      const studyAcademicYear = { id: 123 };
      jest.spyOn(studyAcademicYearFormService, 'getStudyAcademicYear').mockReturnValue(studyAcademicYear);
      jest.spyOn(studyAcademicYearService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studyAcademicYear });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: studyAcademicYear }));
      saveSubject.complete();

      // THEN
      expect(studyAcademicYearFormService.getStudyAcademicYear).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(studyAcademicYearService.update).toHaveBeenCalledWith(expect.objectContaining(studyAcademicYear));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudyAcademicYear>>();
      const studyAcademicYear = { id: 123 };
      jest.spyOn(studyAcademicYearFormService, 'getStudyAcademicYear').mockReturnValue({ id: null });
      jest.spyOn(studyAcademicYearService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studyAcademicYear: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: studyAcademicYear }));
      saveSubject.complete();

      // THEN
      expect(studyAcademicYearFormService.getStudyAcademicYear).toHaveBeenCalled();
      expect(studyAcademicYearService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudyAcademicYear>>();
      const studyAcademicYear = { id: 123 };
      jest.spyOn(studyAcademicYearService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studyAcademicYear });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(studyAcademicYearService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
