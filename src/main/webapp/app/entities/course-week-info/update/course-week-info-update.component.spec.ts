import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { CourseWeekInfoService } from '../service/course-week-info.service';
import { ICourseWeekInfo } from '../course-week-info.model';
import { CourseWeekInfoFormService } from './course-week-info-form.service';

import { CourseWeekInfoUpdateComponent } from './course-week-info-update.component';

describe('CourseWeekInfo Management Update Component', () => {
  let comp: CourseWeekInfoUpdateComponent;
  let fixture: ComponentFixture<CourseWeekInfoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let courseWeekInfoFormService: CourseWeekInfoFormService;
  let courseWeekInfoService: CourseWeekInfoService;
  let courseService: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CourseWeekInfoUpdateComponent],
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
      .overrideTemplate(CourseWeekInfoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CourseWeekInfoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    courseWeekInfoFormService = TestBed.inject(CourseWeekInfoFormService);
    courseWeekInfoService = TestBed.inject(CourseWeekInfoService);
    courseService = TestBed.inject(CourseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call course query and add missing value', () => {
      const courseWeekInfo: ICourseWeekInfo = { id: 456 };
      const course: ICourse = { id: 13703 };
      courseWeekInfo.course = course;

      const courseCollection: ICourse[] = [{ id: 3817 }];
      jest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const expectedCollection: ICourse[] = [course, ...courseCollection];
      jest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ courseWeekInfo });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(courseCollection, course);
      expect(comp.coursesCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const courseWeekInfo: ICourseWeekInfo = { id: 456 };
      const course: ICourse = { id: 14084 };
      courseWeekInfo.course = course;

      activatedRoute.data = of({ courseWeekInfo });
      comp.ngOnInit();

      expect(comp.coursesCollection).toContain(course);
      expect(comp.courseWeekInfo).toEqual(courseWeekInfo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourseWeekInfo>>();
      const courseWeekInfo = { id: 123 };
      jest.spyOn(courseWeekInfoFormService, 'getCourseWeekInfo').mockReturnValue(courseWeekInfo);
      jest.spyOn(courseWeekInfoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courseWeekInfo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: courseWeekInfo }));
      saveSubject.complete();

      // THEN
      expect(courseWeekInfoFormService.getCourseWeekInfo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(courseWeekInfoService.update).toHaveBeenCalledWith(expect.objectContaining(courseWeekInfo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourseWeekInfo>>();
      const courseWeekInfo = { id: 123 };
      jest.spyOn(courseWeekInfoFormService, 'getCourseWeekInfo').mockReturnValue({ id: null });
      jest.spyOn(courseWeekInfoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courseWeekInfo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: courseWeekInfo }));
      saveSubject.complete();

      // THEN
      expect(courseWeekInfoFormService.getCourseWeekInfo).toHaveBeenCalled();
      expect(courseWeekInfoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourseWeekInfo>>();
      const courseWeekInfo = { id: 123 };
      jest.spyOn(courseWeekInfoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courseWeekInfo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(courseWeekInfoService.update).toHaveBeenCalled();
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
