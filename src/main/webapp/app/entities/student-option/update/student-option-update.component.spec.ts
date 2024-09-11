import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IStudentQuestion } from 'app/entities/student-question/student-question.model';
import { StudentQuestionService } from 'app/entities/student-question/service/student-question.service';
import { IOption } from 'app/entities/option/option.model';
import { OptionService } from 'app/entities/option/service/option.service';
import { IStudentOption } from '../student-option.model';
import { StudentOptionService } from '../service/student-option.service';
import { StudentOptionFormService } from './student-option-form.service';

import { StudentOptionUpdateComponent } from './student-option-update.component';

describe('StudentOption Management Update Component', () => {
  let comp: StudentOptionUpdateComponent;
  let fixture: ComponentFixture<StudentOptionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let studentOptionFormService: StudentOptionFormService;
  let studentOptionService: StudentOptionService;
  let studentQuestionService: StudentQuestionService;
  let optionService: OptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StudentOptionUpdateComponent],
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
      .overrideTemplate(StudentOptionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StudentOptionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    studentOptionFormService = TestBed.inject(StudentOptionFormService);
    studentOptionService = TestBed.inject(StudentOptionService);
    studentQuestionService = TestBed.inject(StudentQuestionService);
    optionService = TestBed.inject(OptionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call StudentQuestion query and add missing value', () => {
      const studentOption: IStudentOption = { id: 456 };
      const studentQuestion: IStudentQuestion = { id: 7101 };
      studentOption.studentQuestion = studentQuestion;

      const studentQuestionCollection: IStudentQuestion[] = [{ id: 2260 }];
      jest.spyOn(studentQuestionService, 'query').mockReturnValue(of(new HttpResponse({ body: studentQuestionCollection })));
      const additionalStudentQuestions = [studentQuestion];
      const expectedCollection: IStudentQuestion[] = [...additionalStudentQuestions, ...studentQuestionCollection];
      jest.spyOn(studentQuestionService, 'addStudentQuestionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ studentOption });
      comp.ngOnInit();

      expect(studentQuestionService.query).toHaveBeenCalled();
      expect(studentQuestionService.addStudentQuestionToCollectionIfMissing).toHaveBeenCalledWith(
        studentQuestionCollection,
        ...additionalStudentQuestions.map(expect.objectContaining),
      );
      expect(comp.studentQuestionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Option query and add missing value', () => {
      const studentOption: IStudentOption = { id: 456 };
      const option: IOption = { id: 26987 };
      studentOption.option = option;

      const optionCollection: IOption[] = [{ id: 1744 }];
      jest.spyOn(optionService, 'query').mockReturnValue(of(new HttpResponse({ body: optionCollection })));
      const additionalOptions = [option];
      const expectedCollection: IOption[] = [...additionalOptions, ...optionCollection];
      jest.spyOn(optionService, 'addOptionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ studentOption });
      comp.ngOnInit();

      expect(optionService.query).toHaveBeenCalled();
      expect(optionService.addOptionToCollectionIfMissing).toHaveBeenCalledWith(
        optionCollection,
        ...additionalOptions.map(expect.objectContaining),
      );
      expect(comp.optionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const studentOption: IStudentOption = { id: 456 };
      const studentQuestion: IStudentQuestion = { id: 20563 };
      studentOption.studentQuestion = studentQuestion;
      const option: IOption = { id: 21362 };
      studentOption.option = option;

      activatedRoute.data = of({ studentOption });
      comp.ngOnInit();

      expect(comp.studentQuestionsSharedCollection).toContain(studentQuestion);
      expect(comp.optionsSharedCollection).toContain(option);
      expect(comp.studentOption).toEqual(studentOption);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudentOption>>();
      const studentOption = { id: 123 };
      jest.spyOn(studentOptionFormService, 'getStudentOption').mockReturnValue(studentOption);
      jest.spyOn(studentOptionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studentOption });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: studentOption }));
      saveSubject.complete();

      // THEN
      expect(studentOptionFormService.getStudentOption).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(studentOptionService.update).toHaveBeenCalledWith(expect.objectContaining(studentOption));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudentOption>>();
      const studentOption = { id: 123 };
      jest.spyOn(studentOptionFormService, 'getStudentOption').mockReturnValue({ id: null });
      jest.spyOn(studentOptionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studentOption: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: studentOption }));
      saveSubject.complete();

      // THEN
      expect(studentOptionFormService.getStudentOption).toHaveBeenCalled();
      expect(studentOptionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudentOption>>();
      const studentOption = { id: 123 };
      jest.spyOn(studentOptionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studentOption });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(studentOptionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareStudentQuestion', () => {
      it('Should forward to studentQuestionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(studentQuestionService, 'compareStudentQuestion');
        comp.compareStudentQuestion(entity, entity2);
        expect(studentQuestionService.compareStudentQuestion).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareOption', () => {
      it('Should forward to optionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(optionService, 'compareOption');
        comp.compareOption(entity, entity2);
        expect(optionService.compareOption).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
