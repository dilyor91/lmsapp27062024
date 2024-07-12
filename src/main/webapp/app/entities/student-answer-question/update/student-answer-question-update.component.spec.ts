import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IQuestion } from 'app/entities/question/question.model';
import { QuestionService } from 'app/entities/question/service/question.service';
import { IOption } from 'app/entities/option/option.model';
import { OptionService } from 'app/entities/option/service/option.service';
import { IQuizSession } from 'app/entities/quiz-session/quiz-session.model';
import { QuizSessionService } from 'app/entities/quiz-session/service/quiz-session.service';
import { IStudentAnswerQuestion } from '../student-answer-question.model';
import { StudentAnswerQuestionService } from '../service/student-answer-question.service';
import { StudentAnswerQuestionFormService } from './student-answer-question-form.service';

import { StudentAnswerQuestionUpdateComponent } from './student-answer-question-update.component';

describe('StudentAnswerQuestion Management Update Component', () => {
  let comp: StudentAnswerQuestionUpdateComponent;
  let fixture: ComponentFixture<StudentAnswerQuestionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let studentAnswerQuestionFormService: StudentAnswerQuestionFormService;
  let studentAnswerQuestionService: StudentAnswerQuestionService;
  let questionService: QuestionService;
  let optionService: OptionService;
  let quizSessionService: QuizSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StudentAnswerQuestionUpdateComponent],
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
      .overrideTemplate(StudentAnswerQuestionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StudentAnswerQuestionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    studentAnswerQuestionFormService = TestBed.inject(StudentAnswerQuestionFormService);
    studentAnswerQuestionService = TestBed.inject(StudentAnswerQuestionService);
    questionService = TestBed.inject(QuestionService);
    optionService = TestBed.inject(OptionService);
    quizSessionService = TestBed.inject(QuizSessionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Question query and add missing value', () => {
      const studentAnswerQuestion: IStudentAnswerQuestion = { id: 456 };
      const question: IQuestion = { id: 26697 };
      studentAnswerQuestion.question = question;

      const questionCollection: IQuestion[] = [{ id: 31929 }];
      jest.spyOn(questionService, 'query').mockReturnValue(of(new HttpResponse({ body: questionCollection })));
      const additionalQuestions = [question];
      const expectedCollection: IQuestion[] = [...additionalQuestions, ...questionCollection];
      jest.spyOn(questionService, 'addQuestionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ studentAnswerQuestion });
      comp.ngOnInit();

      expect(questionService.query).toHaveBeenCalled();
      expect(questionService.addQuestionToCollectionIfMissing).toHaveBeenCalledWith(
        questionCollection,
        ...additionalQuestions.map(expect.objectContaining),
      );
      expect(comp.questionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Option query and add missing value', () => {
      const studentAnswerQuestion: IStudentAnswerQuestion = { id: 456 };
      const option: IOption = { id: 18194 };
      studentAnswerQuestion.option = option;

      const optionCollection: IOption[] = [{ id: 28075 }];
      jest.spyOn(optionService, 'query').mockReturnValue(of(new HttpResponse({ body: optionCollection })));
      const additionalOptions = [option];
      const expectedCollection: IOption[] = [...additionalOptions, ...optionCollection];
      jest.spyOn(optionService, 'addOptionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ studentAnswerQuestion });
      comp.ngOnInit();

      expect(optionService.query).toHaveBeenCalled();
      expect(optionService.addOptionToCollectionIfMissing).toHaveBeenCalledWith(
        optionCollection,
        ...additionalOptions.map(expect.objectContaining),
      );
      expect(comp.optionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call QuizSession query and add missing value', () => {
      const studentAnswerQuestion: IStudentAnswerQuestion = { id: 456 };
      const quizSession: IQuizSession = { id: 29059 };
      studentAnswerQuestion.quizSession = quizSession;

      const quizSessionCollection: IQuizSession[] = [{ id: 3730 }];
      jest.spyOn(quizSessionService, 'query').mockReturnValue(of(new HttpResponse({ body: quizSessionCollection })));
      const additionalQuizSessions = [quizSession];
      const expectedCollection: IQuizSession[] = [...additionalQuizSessions, ...quizSessionCollection];
      jest.spyOn(quizSessionService, 'addQuizSessionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ studentAnswerQuestion });
      comp.ngOnInit();

      expect(quizSessionService.query).toHaveBeenCalled();
      expect(quizSessionService.addQuizSessionToCollectionIfMissing).toHaveBeenCalledWith(
        quizSessionCollection,
        ...additionalQuizSessions.map(expect.objectContaining),
      );
      expect(comp.quizSessionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const studentAnswerQuestion: IStudentAnswerQuestion = { id: 456 };
      const question: IQuestion = { id: 32094 };
      studentAnswerQuestion.question = question;
      const option: IOption = { id: 32069 };
      studentAnswerQuestion.option = option;
      const quizSession: IQuizSession = { id: 16722 };
      studentAnswerQuestion.quizSession = quizSession;

      activatedRoute.data = of({ studentAnswerQuestion });
      comp.ngOnInit();

      expect(comp.questionsSharedCollection).toContain(question);
      expect(comp.optionsSharedCollection).toContain(option);
      expect(comp.quizSessionsSharedCollection).toContain(quizSession);
      expect(comp.studentAnswerQuestion).toEqual(studentAnswerQuestion);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudentAnswerQuestion>>();
      const studentAnswerQuestion = { id: 123 };
      jest.spyOn(studentAnswerQuestionFormService, 'getStudentAnswerQuestion').mockReturnValue(studentAnswerQuestion);
      jest.spyOn(studentAnswerQuestionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studentAnswerQuestion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: studentAnswerQuestion }));
      saveSubject.complete();

      // THEN
      expect(studentAnswerQuestionFormService.getStudentAnswerQuestion).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(studentAnswerQuestionService.update).toHaveBeenCalledWith(expect.objectContaining(studentAnswerQuestion));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudentAnswerQuestion>>();
      const studentAnswerQuestion = { id: 123 };
      jest.spyOn(studentAnswerQuestionFormService, 'getStudentAnswerQuestion').mockReturnValue({ id: null });
      jest.spyOn(studentAnswerQuestionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studentAnswerQuestion: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: studentAnswerQuestion }));
      saveSubject.complete();

      // THEN
      expect(studentAnswerQuestionFormService.getStudentAnswerQuestion).toHaveBeenCalled();
      expect(studentAnswerQuestionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudentAnswerQuestion>>();
      const studentAnswerQuestion = { id: 123 };
      jest.spyOn(studentAnswerQuestionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studentAnswerQuestion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(studentAnswerQuestionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareQuestion', () => {
      it('Should forward to questionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(questionService, 'compareQuestion');
        comp.compareQuestion(entity, entity2);
        expect(questionService.compareQuestion).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareQuizSession', () => {
      it('Should forward to quizSessionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(quizSessionService, 'compareQuizSession');
        comp.compareQuizSession(entity, entity2);
        expect(quizSessionService.compareQuizSession).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
