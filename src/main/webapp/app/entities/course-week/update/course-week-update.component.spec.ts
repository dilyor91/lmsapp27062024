import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { CourseWeekService } from '../service/course-week.service';
import { ICourseWeek } from '../course-week.model';
import { CourseWeekFormService } from './course-week-form.service';

import { CourseWeekUpdateComponent } from './course-week-update.component';

describe('CourseWeek Management Update Component', () => {
  let comp: CourseWeekUpdateComponent;
  let fixture: ComponentFixture<CourseWeekUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let courseWeekFormService: CourseWeekFormService;
  let courseWeekService: CourseWeekService;
  let courseService: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CourseWeekUpdateComponent],
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
      .overrideTemplate(CourseWeekUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CourseWeekUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    courseWeekFormService = TestBed.inject(CourseWeekFormService);
    courseWeekService = TestBed.inject(CourseWeekService);
    courseService = TestBed.inject(CourseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Course query and add missing value', () => {
      const courseWeek: ICourseWeek = { id: 456 };
      const course: ICourse = { id: 1672 };
      courseWeek.course = course;

      const courseCollection: ICourse[] = [{ id: 24538 }];
      jest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      jest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ courseWeek });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(expect.objectContaining),
      );
      expect(comp.coursesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const courseWeek: ICourseWeek = { id: 456 };
      const course: ICourse = { id: 1322 };
      courseWeek.course = course;

      activatedRoute.data = of({ courseWeek });
      comp.ngOnInit();

      expect(comp.coursesSharedCollection).toContain(course);
      expect(comp.courseWeek).toEqual(courseWeek);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourseWeek>>();
      const courseWeek = { id: 123 };
      jest.spyOn(courseWeekFormService, 'getCourseWeek').mockReturnValue(courseWeek);
      jest.spyOn(courseWeekService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courseWeek });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: courseWeek }));
      saveSubject.complete();

      // THEN
      expect(courseWeekFormService.getCourseWeek).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(courseWeekService.update).toHaveBeenCalledWith(expect.objectContaining(courseWeek));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourseWeek>>();
      const courseWeek = { id: 123 };
      jest.spyOn(courseWeekFormService, 'getCourseWeek').mockReturnValue({ id: null });
      jest.spyOn(courseWeekService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courseWeek: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: courseWeek }));
      saveSubject.complete();

      // THEN
      expect(courseWeekFormService.getCourseWeek).toHaveBeenCalled();
      expect(courseWeekService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourseWeek>>();
      const courseWeek = { id: 123 };
      jest.spyOn(courseWeekService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courseWeek });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(courseWeekService.update).toHaveBeenCalled();
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
