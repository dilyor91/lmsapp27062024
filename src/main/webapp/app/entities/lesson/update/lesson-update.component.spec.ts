import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { LessonService } from '../service/lesson.service';
import { ILesson } from '../lesson.model';
import { LessonFormService } from './lesson-form.service';

import { LessonUpdateComponent } from './lesson-update.component';

describe('Lesson Management Update Component', () => {
  let comp: LessonUpdateComponent;
  let fixture: ComponentFixture<LessonUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let lessonFormService: LessonFormService;
  let lessonService: LessonService;
  let courseService: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LessonUpdateComponent],
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
      .overrideTemplate(LessonUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LessonUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    lessonFormService = TestBed.inject(LessonFormService);
    lessonService = TestBed.inject(LessonService);
    courseService = TestBed.inject(CourseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Course query and add missing value', () => {
      const lesson: ILesson = { id: 456 };
      const course: ICourse = { id: 29135 };
      lesson.course = course;

      const courseCollection: ICourse[] = [{ id: 29811 }];
      jest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      jest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ lesson });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(expect.objectContaining),
      );
      expect(comp.coursesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const lesson: ILesson = { id: 456 };
      const course: ICourse = { id: 662 };
      lesson.course = course;

      activatedRoute.data = of({ lesson });
      comp.ngOnInit();

      expect(comp.coursesSharedCollection).toContain(course);
      expect(comp.lesson).toEqual(lesson);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILesson>>();
      const lesson = { id: 123 };
      jest.spyOn(lessonFormService, 'getLesson').mockReturnValue(lesson);
      jest.spyOn(lessonService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ lesson });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: lesson }));
      saveSubject.complete();

      // THEN
      expect(lessonFormService.getLesson).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(lessonService.update).toHaveBeenCalledWith(expect.objectContaining(lesson));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILesson>>();
      const lesson = { id: 123 };
      jest.spyOn(lessonFormService, 'getLesson').mockReturnValue({ id: null });
      jest.spyOn(lessonService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ lesson: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: lesson }));
      saveSubject.complete();

      // THEN
      expect(lessonFormService.getLesson).toHaveBeenCalled();
      expect(lessonService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILesson>>();
      const lesson = { id: 123 };
      jest.spyOn(lessonService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ lesson });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(lessonService.update).toHaveBeenCalled();
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
