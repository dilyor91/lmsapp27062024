import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IQuizSession } from 'app/entities/quiz-session/quiz-session.model';
import { QuizSessionService } from 'app/entities/quiz-session/service/quiz-session.service';
import { IQuestion } from 'app/entities/question/question.model';
import { QuestionService } from 'app/entities/question/service/question.service';
import { IStudentQuestion } from '../student-question.model';
import { StudentQuestionService } from '../service/student-question.service';
import { StudentQuestionFormService } from './student-question-form.service';

import { StudentQuestionUpdateComponent } from './student-question-update.component';

describe('StudentQuestion Management Update Component', () => {
  let comp: StudentQuestionUpdateComponent;
  let fixture: ComponentFixture<StudentQuestionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let studentQuestionFormService: StudentQuestionFormService;
  let studentQuestionService: StudentQuestionService;
  let quizSessionService: QuizSessionService;
  let questionService: QuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StudentQuestionUpdateComponent],
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
      .overrideTemplate(StudentQuestionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StudentQuestionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    studentQuestionFormService = TestBed.inject(StudentQuestionFormService);
    studentQuestionService = TestBed.inject(StudentQuestionService);
    quizSessionService = TestBed.inject(QuizSessionService);
    questionService = TestBed.inject(QuestionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call QuizSession query and add missing value', () => {
      const studentQuestion: IStudentQuestion = { id: 456 };
      const quizSession: IQuizSession = { id: 19771 };
      studentQuestion.quizSession = quizSession;

      const quizSessionCollection: IQuizSession[] = [{ id: 4537 }];
      jest.spyOn(quizSessionService, 'query').mockReturnValue(of(new HttpResponse({ body: quizSessionCollection })));
      const additionalQuizSessions = [quizSession];
      const expectedCollection: IQuizSession[] = [...additionalQuizSessions, ...quizSessionCollection];
      jest.spyOn(quizSessionService, 'addQuizSessionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ studentQuestion });
      comp.ngOnInit();

      expect(quizSessionService.query).toHaveBeenCalled();
      expect(quizSessionService.addQuizSessionToCollectionIfMissing).toHaveBeenCalledWith(
        quizSessionCollection,
        ...additionalQuizSessions.map(expect.objectContaining),
      );
      expect(comp.quizSessionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Question query and add missing value', () => {
      const studentQuestion: IStudentQuestion = { id: 456 };
      const question: IQuestion = { id: 5567 };
      studentQuestion.question = question;

      const questionCollection: IQuestion[] = [{ id: 25875 }];
      jest.spyOn(questionService, 'query').mockReturnValue(of(new HttpResponse({ body: questionCollection })));
      const additionalQuestions = [question];
      const expectedCollection: IQuestion[] = [...additionalQuestions, ...questionCollection];
      jest.spyOn(questionService, 'addQuestionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ studentQuestion });
      comp.ngOnInit();

      expect(questionService.query).toHaveBeenCalled();
      expect(questionService.addQuestionToCollectionIfMissing).toHaveBeenCalledWith(
        questionCollection,
        ...additionalQuestions.map(expect.objectContaining),
      );
      expect(comp.questionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const studentQuestion: IStudentQuestion = { id: 456 };
      const quizSession: IQuizSession = { id: 10161 };
      studentQuestion.quizSession = quizSession;
      const question: IQuestion = { id: 22894 };
      studentQuestion.question = question;

      activatedRoute.data = of({ studentQuestion });
      comp.ngOnInit();

      expect(comp.quizSessionsSharedCollection).toContain(quizSession);
      expect(comp.questionsSharedCollection).toContain(question);
      expect(comp.studentQuestion).toEqual(studentQuestion);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudentQuestion>>();
      const studentQuestion = { id: 123 };
      jest.spyOn(studentQuestionFormService, 'getStudentQuestion').mockReturnValue(studentQuestion);
      jest.spyOn(studentQuestionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studentQuestion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: studentQuestion }));
      saveSubject.complete();

      // THEN
      expect(studentQuestionFormService.getStudentQuestion).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(studentQuestionService.update).toHaveBeenCalledWith(expect.objectContaining(studentQuestion));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudentQuestion>>();
      const studentQuestion = { id: 123 };
      jest.spyOn(studentQuestionFormService, 'getStudentQuestion').mockReturnValue({ id: null });
      jest.spyOn(studentQuestionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studentQuestion: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: studentQuestion }));
      saveSubject.complete();

      // THEN
      expect(studentQuestionFormService.getStudentQuestion).toHaveBeenCalled();
      expect(studentQuestionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStudentQuestion>>();
      const studentQuestion = { id: 123 };
      jest.spyOn(studentQuestionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ studentQuestion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(studentQuestionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareQuizSession', () => {
      it('Should forward to quizSessionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(quizSessionService, 'compareQuizSession');
        comp.compareQuizSession(entity, entity2);
        expect(quizSessionService.compareQuizSession).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareQuestion', () => {
      it('Should forward to questionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(questionService, 'compareQuestion');
        comp.compareQuestion(entity, entity2);
        expect(questionService.compareQuestion).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
