import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ICourseSection } from 'app/entities/course-section/course-section.model';
import { CourseSectionService } from 'app/entities/course-section/service/course-section.service';
import { IAssignment } from '../assignment.model';
import { AssignmentService } from '../service/assignment.service';
import { AssignmentFormService } from './assignment-form.service';

import { AssignmentUpdateComponent } from './assignment-update.component';

describe('Assignment Management Update Component', () => {
  let comp: AssignmentUpdateComponent;
  let fixture: ComponentFixture<AssignmentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let assignmentFormService: AssignmentFormService;
  let assignmentService: AssignmentService;
  let courseService: CourseService;
  let courseSectionService: CourseSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AssignmentUpdateComponent],
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
      .overrideTemplate(AssignmentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AssignmentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    assignmentFormService = TestBed.inject(AssignmentFormService);
    assignmentService = TestBed.inject(AssignmentService);
    courseService = TestBed.inject(CourseService);
    courseSectionService = TestBed.inject(CourseSectionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Course query and add missing value', () => {
      const assignment: IAssignment = { id: 456 };
      const course: ICourse = { id: 13187 };
      assignment.course = course;

      const courseCollection: ICourse[] = [{ id: 6799 }];
      jest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      jest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assignment });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(expect.objectContaining),
      );
      expect(comp.coursesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CourseSection query and add missing value', () => {
      const assignment: IAssignment = { id: 456 };
      const courseSections: ICourseSection[] = [{ id: 5887 }];
      assignment.courseSections = courseSections;

      const courseSectionCollection: ICourseSection[] = [{ id: 26312 }];
      jest.spyOn(courseSectionService, 'query').mockReturnValue(of(new HttpResponse({ body: courseSectionCollection })));
      const additionalCourseSections = [...courseSections];
      const expectedCollection: ICourseSection[] = [...additionalCourseSections, ...courseSectionCollection];
      jest.spyOn(courseSectionService, 'addCourseSectionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assignment });
      comp.ngOnInit();

      expect(courseSectionService.query).toHaveBeenCalled();
      expect(courseSectionService.addCourseSectionToCollectionIfMissing).toHaveBeenCalledWith(
        courseSectionCollection,
        ...additionalCourseSections.map(expect.objectContaining),
      );
      expect(comp.courseSectionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const assignment: IAssignment = { id: 456 };
      const course: ICourse = { id: 19210 };
      assignment.course = course;
      const courseSection: ICourseSection = { id: 839 };
      assignment.courseSections = [courseSection];

      activatedRoute.data = of({ assignment });
      comp.ngOnInit();

      expect(comp.coursesSharedCollection).toContain(course);
      expect(comp.courseSectionsSharedCollection).toContain(courseSection);
      expect(comp.assignment).toEqual(assignment);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssignment>>();
      const assignment = { id: 123 };
      jest.spyOn(assignmentFormService, 'getAssignment').mockReturnValue(assignment);
      jest.spyOn(assignmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assignment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: assignment }));
      saveSubject.complete();

      // THEN
      expect(assignmentFormService.getAssignment).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(assignmentService.update).toHaveBeenCalledWith(expect.objectContaining(assignment));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssignment>>();
      const assignment = { id: 123 };
      jest.spyOn(assignmentFormService, 'getAssignment').mockReturnValue({ id: null });
      jest.spyOn(assignmentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assignment: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: assignment }));
      saveSubject.complete();

      // THEN
      expect(assignmentFormService.getAssignment).toHaveBeenCalled();
      expect(assignmentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssignment>>();
      const assignment = { id: 123 };
      jest.spyOn(assignmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assignment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(assignmentService.update).toHaveBeenCalled();
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

    describe('compareCourseSection', () => {
      it('Should forward to courseSectionService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(courseSectionService, 'compareCourseSection');
        comp.compareCourseSection(entity, entity2);
        expect(courseSectionService.compareCourseSection).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
