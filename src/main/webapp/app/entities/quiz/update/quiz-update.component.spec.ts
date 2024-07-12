import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { QuizService } from '../service/quiz.service';
import { IQuiz } from '../quiz.model';
import { QuizFormService } from './quiz-form.service';

import { QuizUpdateComponent } from './quiz-update.component';

describe('Quiz Management Update Component', () => {
  let comp: QuizUpdateComponent;
  let fixture: ComponentFixture<QuizUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let quizFormService: QuizFormService;
  let quizService: QuizService;
  let courseService: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuizUpdateComponent],
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
      .overrideTemplate(QuizUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QuizUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    quizFormService = TestBed.inject(QuizFormService);
    quizService = TestBed.inject(QuizService);
    courseService = TestBed.inject(CourseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Course query and add missing value', () => {
      const quiz: IQuiz = { id: 456 };
      const course: ICourse = { id: 5981 };
      quiz.course = course;

      const courseCollection: ICourse[] = [{ id: 25096 }];
      jest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      jest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ quiz });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(expect.objectContaining),
      );
      expect(comp.coursesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const quiz: IQuiz = { id: 456 };
      const course: ICourse = { id: 18426 };
      quiz.course = course;

      activatedRoute.data = of({ quiz });
      comp.ngOnInit();

      expect(comp.coursesSharedCollection).toContain(course);
      expect(comp.quiz).toEqual(quiz);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuiz>>();
      const quiz = { id: 123 };
      jest.spyOn(quizFormService, 'getQuiz').mockReturnValue(quiz);
      jest.spyOn(quizService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quiz });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quiz }));
      saveSubject.complete();

      // THEN
      expect(quizFormService.getQuiz).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(quizService.update).toHaveBeenCalledWith(expect.objectContaining(quiz));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuiz>>();
      const quiz = { id: 123 };
      jest.spyOn(quizFormService, 'getQuiz').mockReturnValue({ id: null });
      jest.spyOn(quizService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quiz: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quiz }));
      saveSubject.complete();

      // THEN
      expect(quizFormService.getQuiz).toHaveBeenCalled();
      expect(quizService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuiz>>();
      const quiz = { id: 123 };
      jest.spyOn(quizService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quiz });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(quizService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCourse', () => {
      it('Should forward to courseService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(courseService, 'compareCourse');
        comp.compareCourse(entity, entity2);
        expect(courseService.compareCourse).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
