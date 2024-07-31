import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IAssignment } from 'app/entities/assignment/assignment.model';
import { AssignmentService } from 'app/entities/assignment/service/assignment.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ICourseSection } from 'app/entities/course-section/course-section.model';
import { CourseSectionService } from 'app/entities/course-section/service/course-section.service';
import { IAssignmentCourseSection } from '../assignment-course-section.model';
import { AssignmentCourseSectionService } from '../service/assignment-course-section.service';
import { AssignmentCourseSectionFormService } from './assignment-course-section-form.service';

import { AssignmentCourseSectionUpdateComponent } from './assignment-course-section-update.component';

describe('AssignmentCourseSection Management Update Component', () => {
  let comp: AssignmentCourseSectionUpdateComponent;
  let fixture: ComponentFixture<AssignmentCourseSectionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let assignmentCourseSectionFormService: AssignmentCourseSectionFormService;
  let assignmentCourseSectionService: AssignmentCourseSectionService;
  let assignmentService: AssignmentService;
  let courseService: CourseService;
  let courseSectionService: CourseSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AssignmentCourseSectionUpdateComponent],
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
      .overrideTemplate(AssignmentCourseSectionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AssignmentCourseSectionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    assignmentCourseSectionFormService = TestBed.inject(AssignmentCourseSectionFormService);
    assignmentCourseSectionService = TestBed.inject(AssignmentCourseSectionService);
    assignmentService = TestBed.inject(AssignmentService);
    courseService = TestBed.inject(CourseService);
    courseSectionService = TestBed.inject(CourseSectionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Assignment query and add missing value', () => {
      const assignmentCourseSection: IAssignmentCourseSection = { id: 456 };
      const assignment: IAssignment = { id: 10236 };
      assignmentCourseSection.assignment = assignment;

      const assignmentCollection: IAssignment[] = [{ id: 16719 }];
      jest.spyOn(assignmentService, 'query').mockReturnValue(of(new HttpResponse({ body: assignmentCollection })));
      const additionalAssignments = [assignment];
      const expectedCollection: IAssignment[] = [...additionalAssignments, ...assignmentCollection];
      jest.spyOn(assignmentService, 'addAssignmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assignmentCourseSection });
      comp.ngOnInit();

      expect(assignmentService.query).toHaveBeenCalled();
      expect(assignmentService.addAssignmentToCollectionIfMissing).toHaveBeenCalledWith(
        assignmentCollection,
        ...additionalAssignments.map(expect.objectContaining),
      );
      expect(comp.assignmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Course query and add missing value', () => {
      const assignmentCourseSection: IAssignmentCourseSection = { id: 456 };
      const course: ICourse = { id: 7726 };
      assignmentCourseSection.course = course;

      const courseCollection: ICourse[] = [{ id: 13567 }];
      jest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      jest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assignmentCourseSection });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(expect.objectContaining),
      );
      expect(comp.coursesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CourseSection query and add missing value', () => {
      const assignmentCourseSection: IAssignmentCourseSection = { id: 456 };
      const courseSection: ICourseSection = { id: 13909 };
      assignmentCourseSection.courseSection = courseSection;

      const courseSectionCollection: ICourseSection[] = [{ id: 7538 }];
      jest.spyOn(courseSectionService, 'query').mockReturnValue(of(new HttpResponse({ body: courseSectionCollection })));
      const additionalCourseSections = [courseSection];
      const expectedCollection: ICourseSection[] = [...additionalCourseSections, ...courseSectionCollection];
      jest.spyOn(courseSectionService, 'addCourseSectionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assignmentCourseSection });
      comp.ngOnInit();

      expect(courseSectionService.query).toHaveBeenCalled();
      expect(courseSectionService.addCourseSectionToCollectionIfMissing).toHaveBeenCalledWith(
        courseSectionCollection,
        ...additionalCourseSections.map(expect.objectContaining),
      );
      expect(comp.courseSectionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const assignmentCourseSection: IAssignmentCourseSection = { id: 456 };
      const assignment: IAssignment = { id: 691 };
      assignmentCourseSection.assignment = assignment;
      const course: ICourse = { id: 10769 };
      assignmentCourseSection.course = course;
      const courseSection: ICourseSection = { id: 25974 };
      assignmentCourseSection.courseSection = courseSection;

      activatedRoute.data = of({ assignmentCourseSection });
      comp.ngOnInit();

      expect(comp.assignmentsSharedCollection).toContain(assignment);
      expect(comp.coursesSharedCollection).toContain(course);
      expect(comp.courseSectionsSharedCollection).toContain(courseSection);
      expect(comp.assignmentCourseSection).toEqual(assignmentCourseSection);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssignmentCourseSection>>();
      const assignmentCourseSection = { id: 123 };
      jest.spyOn(assignmentCourseSectionFormService, 'getAssignmentCourseSection').mockReturnValue(assignmentCourseSection);
      jest.spyOn(assignmentCourseSectionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assignmentCourseSection });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: assignmentCourseSection }));
      saveSubject.complete();

      // THEN
      expect(assignmentCourseSectionFormService.getAssignmentCourseSection).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(assignmentCourseSectionService.update).toHaveBeenCalledWith(expect.objectContaining(assignmentCourseSection));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssignmentCourseSection>>();
      const assignmentCourseSection = { id: 123 };
      jest.spyOn(assignmentCourseSectionFormService, 'getAssignmentCourseSection').mockReturnValue({ id: null });
      jest.spyOn(assignmentCourseSectionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assignmentCourseSection: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: assignmentCourseSection }));
      saveSubject.complete();

      // THEN
      expect(assignmentCourseSectionFormService.getAssignmentCourseSection).toHaveBeenCalled();
      expect(assignmentCourseSectionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssignmentCourseSection>>();
      const assignmentCourseSection = { id: 123 };
      jest.spyOn(assignmentCourseSectionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assignmentCourseSection });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(assignmentCourseSectionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAssignment', () => {
      it('Should forward to assignmentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(assignmentService, 'compareAssignment');
        comp.compareAssignment(entity, entity2);
        expect(assignmentService.compareAssignment).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
