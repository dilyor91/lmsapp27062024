import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IQuiz } from 'app/entities/quiz/quiz.model';
import { QuizService } from 'app/entities/quiz/service/quiz.service';
import { IStudent } from 'app/entities/student/student.model';
import { StudentService } from 'app/entities/student/service/student.service';
import { IQuizSession } from 'app/entities/quiz-session/quiz-session.model';
import { QuizSessionService } from 'app/entities/quiz-session/service/quiz-session.service';
import { IQuizResult } from '../quiz-result.model';
import { QuizResultService } from '../service/quiz-result.service';
import { QuizResultFormService } from './quiz-result-form.service';

import { QuizResultUpdateComponent } from './quiz-result-update.component';

describe('QuizResult Management Update Component', () => {
  let comp: QuizResultUpdateComponent;
  let fixture: ComponentFixture<QuizResultUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let quizResultFormService: QuizResultFormService;
  let quizResultService: QuizResultService;
  let quizService: QuizService;
  let studentService: StudentService;
  let quizSessionService: QuizSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuizResultUpdateComponent],
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
      .overrideTemplate(QuizResultUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QuizResultUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    quizResultFormService = TestBed.inject(QuizResultFormService);
    quizResultService = TestBed.inject(QuizResultService);
    quizService = TestBed.inject(QuizService);
    studentService = TestBed.inject(StudentService);
    quizSessionService = TestBed.inject(QuizSessionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Quiz query and add missing value', () => {
      const quizResult: IQuizResult = { id: 456 };
      const quiz: IQuiz = { id: 4680 };
      quizResult.quiz = quiz;

      const quizCollection: IQuiz[] = [{ id: 12755 }];
      jest.spyOn(quizService, 'query').mockReturnValue(of(new HttpResponse({ body: quizCollection })));
      const additionalQuizzes = [quiz];
      const expectedCollection: IQuiz[] = [...additionalQuizzes, ...quizCollection];
      jest.spyOn(quizService, 'addQuizToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ quizResult });
      comp.ngOnInit();

      expect(quizService.query).toHaveBeenCalled();
      expect(quizService.addQuizToCollectionIfMissing).toHaveBeenCalledWith(
        quizCollection,
        ...additionalQuizzes.map(expect.objectContaining),
      );
      expect(comp.quizzesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Student query and add missing value', () => {
      const quizResult: IQuizResult = { id: 456 };
      const student: IStudent = { id: 18630 };
      quizResult.student = student;

      const studentCollection: IStudent[] = [{ id: 8302 }];
      jest.spyOn(studentService, 'query').mockReturnValue(of(new HttpResponse({ body: studentCollection })));
      const additionalStudents = [student];
      const expectedCollection: IStudent[] = [...additionalStudents, ...studentCollection];
      jest.spyOn(studentService, 'addStudentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ quizResult });
      comp.ngOnInit();

      expect(studentService.query).toHaveBeenCalled();
      expect(studentService.addStudentToCollectionIfMissing).toHaveBeenCalledWith(
        studentCollection,
        ...additionalStudents.map(expect.objectContaining),
      );
      expect(comp.studentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call QuizSession query and add missing value', () => {
      const quizResult: IQuizResult = { id: 456 };
      const quizSession: IQuizSession = { id: 29569 };
      quizResult.quizSession = quizSession;

      const quizSessionCollection: IQuizSession[] = [{ id: 16308 }];
      jest.spyOn(quizSessionService, 'query').mockReturnValue(of(new HttpResponse({ body: quizSessionCollection })));
      const additionalQuizSessions = [quizSession];
      const expectedCollection: IQuizSession[] = [...additionalQuizSessions, ...quizSessionCollection];
      jest.spyOn(quizSessionService, 'addQuizSessionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ quizResult });
      comp.ngOnInit();

      expect(quizSessionService.query).toHaveBeenCalled();
      expect(quizSessionService.addQuizSessionToCollectionIfMissing).toHaveBeenCalledWith(
        quizSessionCollection,
        ...additionalQuizSessions.map(expect.objectContaining),
      );
      expect(comp.quizSessionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const quizResult: IQuizResult = { id: 456 };
      const quiz: IQuiz = { id: 22238 };
      quizResult.quiz = quiz;
      const student: IStudent = { id: 20509 };
      quizResult.student = student;
      const quizSession: IQuizSession = { id: 15007 };
      quizResult.quizSession = quizSession;

      activatedRoute.data = of({ quizResult });
      comp.ngOnInit();

      expect(comp.quizzesSharedCollection).toContain(quiz);
      expect(comp.studentsSharedCollection).toContain(student);
      expect(comp.quizSessionsSharedCollection).toContain(quizSession);
      expect(comp.quizResult).toEqual(quizResult);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuizResult>>();
      const quizResult = { id: 123 };
      jest.spyOn(quizResultFormService, 'getQuizResult').mockReturnValue(quizResult);
      jest.spyOn(quizResultService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quizResult });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quizResult }));
      saveSubject.complete();

      // THEN
      expect(quizResultFormService.getQuizResult).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(quizResultService.update).toHaveBeenCalledWith(expect.objectContaining(quizResult));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuizResult>>();
      const quizResult = { id: 123 };
      jest.spyOn(quizResultFormService, 'getQuizResult').mockReturnValue({ id: null });
      jest.spyOn(quizResultService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quizResult: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quizResult }));
      saveSubject.complete();

      // THEN
      expect(quizResultFormService.getQuizResult).toHaveBeenCalled();
      expect(quizResultService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuizResult>>();
      const quizResult = { id: 123 };
      jest.spyOn(quizResultService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quizResult });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(quizResultService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareQuiz', () => {
      it('Should forward to quizService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(quizService, 'compareQuiz');
        comp.compareQuiz(entity, entity2);
        expect(quizService.compareQuiz).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareStudent', () => {
      it('Should forward to studentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(studentService, 'compareStudent');
        comp.compareStudent(entity, entity2);
        expect(studentService.compareStudent).toHaveBeenCalledWith(entity, entity2);
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
