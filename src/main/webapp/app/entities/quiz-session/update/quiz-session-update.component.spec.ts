import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IStudent } from 'app/entities/student/student.model';
import { StudentService } from 'app/entities/student/service/student.service';
import { IQuiz } from 'app/entities/quiz/quiz.model';
import { QuizService } from 'app/entities/quiz/service/quiz.service';
import { IQuizSession } from '../quiz-session.model';
import { QuizSessionService } from '../service/quiz-session.service';
import { QuizSessionFormService } from './quiz-session-form.service';

import { QuizSessionUpdateComponent } from './quiz-session-update.component';

describe('QuizSession Management Update Component', () => {
  let comp: QuizSessionUpdateComponent;
  let fixture: ComponentFixture<QuizSessionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let quizSessionFormService: QuizSessionFormService;
  let quizSessionService: QuizSessionService;
  let studentService: StudentService;
  let quizService: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuizSessionUpdateComponent],
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
      .overrideTemplate(QuizSessionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QuizSessionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    quizSessionFormService = TestBed.inject(QuizSessionFormService);
    quizSessionService = TestBed.inject(QuizSessionService);
    studentService = TestBed.inject(StudentService);
    quizService = TestBed.inject(QuizService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Student query and add missing value', () => {
      const quizSession: IQuizSession = { id: 456 };
      const student: IStudent = { id: 5881 };
      quizSession.student = student;

      const studentCollection: IStudent[] = [{ id: 10334 }];
      jest.spyOn(studentService, 'query').mockReturnValue(of(new HttpResponse({ body: studentCollection })));
      const additionalStudents = [student];
      const expectedCollection: IStudent[] = [...additionalStudents, ...studentCollection];
      jest.spyOn(studentService, 'addStudentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ quizSession });
      comp.ngOnInit();

      expect(studentService.query).toHaveBeenCalled();
      expect(studentService.addStudentToCollectionIfMissing).toHaveBeenCalledWith(
        studentCollection,
        ...additionalStudents.map(expect.objectContaining),
      );
      expect(comp.studentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Quiz query and add missing value', () => {
      const quizSession: IQuizSession = { id: 456 };
      const quiz: IQuiz = { id: 30106 };
      quizSession.quiz = quiz;

      const quizCollection: IQuiz[] = [{ id: 11143 }];
      jest.spyOn(quizService, 'query').mockReturnValue(of(new HttpResponse({ body: quizCollection })));
      const additionalQuizzes = [quiz];
      const expectedCollection: IQuiz[] = [...additionalQuizzes, ...quizCollection];
      jest.spyOn(quizService, 'addQuizToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ quizSession });
      comp.ngOnInit();

      expect(quizService.query).toHaveBeenCalled();
      expect(quizService.addQuizToCollectionIfMissing).toHaveBeenCalledWith(
        quizCollection,
        ...additionalQuizzes.map(expect.objectContaining),
      );
      expect(comp.quizzesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const quizSession: IQuizSession = { id: 456 };
      const student: IStudent = { id: 17443 };
      quizSession.student = student;
      const quiz: IQuiz = { id: 21032 };
      quizSession.quiz = quiz;

      activatedRoute.data = of({ quizSession });
      comp.ngOnInit();

      expect(comp.studentsSharedCollection).toContain(student);
      expect(comp.quizzesSharedCollection).toContain(quiz);
      expect(comp.quizSession).toEqual(quizSession);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuizSession>>();
      const quizSession = { id: 123 };
      jest.spyOn(quizSessionFormService, 'getQuizSession').mockReturnValue(quizSession);
      jest.spyOn(quizSessionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quizSession });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quizSession }));
      saveSubject.complete();

      // THEN
      expect(quizSessionFormService.getQuizSession).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(quizSessionService.update).toHaveBeenCalledWith(expect.objectContaining(quizSession));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuizSession>>();
      const quizSession = { id: 123 };
      jest.spyOn(quizSessionFormService, 'getQuizSession').mockReturnValue({ id: null });
      jest.spyOn(quizSessionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quizSession: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quizSession }));
      saveSubject.complete();

      // THEN
      expect(quizSessionFormService.getQuizSession).toHaveBeenCalled();
      expect(quizSessionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuizSession>>();
      const quizSession = { id: 123 };
      jest.spyOn(quizSessionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quizSession });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(quizSessionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareStudent', () => {
      it('Should forward to studentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(studentService, 'compareStudent');
        comp.compareStudent(entity, entity2);
        expect(studentService.compareStudent).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareQuiz', () => {
      it('Should forward to quizService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(quizService, 'compareQuiz');
        comp.compareQuiz(entity, entity2);
        expect(quizService.compareQuiz).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
