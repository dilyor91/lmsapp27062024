import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { IAnnouncement } from 'app/entities/announcement/announcement.model';
import { AnnouncementService } from 'app/entities/announcement/service/announcement.service';
import { IAssignment } from 'app/entities/assignment/assignment.model';
import { AssignmentService } from 'app/entities/assignment/service/assignment.service';
import { ICourseSection } from '../course-section.model';
import { CourseSectionService } from '../service/course-section.service';
import { CourseSectionFormService } from './course-section-form.service';

import { CourseSectionUpdateComponent } from './course-section-update.component';

describe('CourseSection Management Update Component', () => {
  let comp: CourseSectionUpdateComponent;
  let fixture: ComponentFixture<CourseSectionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let courseSectionFormService: CourseSectionFormService;
  let courseSectionService: CourseSectionService;
  let courseService: CourseService;
  let announcementService: AnnouncementService;
  let assignmentService: AssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CourseSectionUpdateComponent],
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
      .overrideTemplate(CourseSectionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CourseSectionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    courseSectionFormService = TestBed.inject(CourseSectionFormService);
    courseSectionService = TestBed.inject(CourseSectionService);
    courseService = TestBed.inject(CourseService);
    announcementService = TestBed.inject(AnnouncementService);
    assignmentService = TestBed.inject(AssignmentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Course query and add missing value', () => {
      const courseSection: ICourseSection = { id: 456 };
      const course: ICourse = { id: 7121 };
      courseSection.course = course;

      const courseCollection: ICourse[] = [{ id: 25231 }];
      jest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      jest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ courseSection });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(expect.objectContaining),
      );
      expect(comp.coursesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Announcement query and add missing value', () => {
      const courseSection: ICourseSection = { id: 456 };
      const announcements: IAnnouncement[] = [{ id: 17141 }];
      courseSection.announcements = announcements;

      const announcementCollection: IAnnouncement[] = [{ id: 4952 }];
      jest.spyOn(announcementService, 'query').mockReturnValue(of(new HttpResponse({ body: announcementCollection })));
      const additionalAnnouncements = [...announcements];
      const expectedCollection: IAnnouncement[] = [...additionalAnnouncements, ...announcementCollection];
      jest.spyOn(announcementService, 'addAnnouncementToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ courseSection });
      comp.ngOnInit();

      expect(announcementService.query).toHaveBeenCalled();
      expect(announcementService.addAnnouncementToCollectionIfMissing).toHaveBeenCalledWith(
        announcementCollection,
        ...additionalAnnouncements.map(expect.objectContaining),
      );
      expect(comp.announcementsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Assignment query and add missing value', () => {
      const courseSection: ICourseSection = { id: 456 };
      const assignments: IAssignment[] = [{ id: 25225 }];
      courseSection.assignments = assignments;

      const assignmentCollection: IAssignment[] = [{ id: 32145 }];
      jest.spyOn(assignmentService, 'query').mockReturnValue(of(new HttpResponse({ body: assignmentCollection })));
      const additionalAssignments = [...assignments];
      const expectedCollection: IAssignment[] = [...additionalAssignments, ...assignmentCollection];
      jest.spyOn(assignmentService, 'addAssignmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ courseSection });
      comp.ngOnInit();

      expect(assignmentService.query).toHaveBeenCalled();
      expect(assignmentService.addAssignmentToCollectionIfMissing).toHaveBeenCalledWith(
        assignmentCollection,
        ...additionalAssignments.map(expect.objectContaining),
      );
      expect(comp.assignmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const courseSection: ICourseSection = { id: 456 };
      const course: ICourse = { id: 27888 };
      courseSection.course = course;
      const announcement: IAnnouncement = { id: 18209 };
      courseSection.announcements = [announcement];
      const assignment: IAssignment = { id: 5964 };
      courseSection.assignments = [assignment];

      activatedRoute.data = of({ courseSection });
      comp.ngOnInit();

      expect(comp.coursesSharedCollection).toContain(course);
      expect(comp.announcementsSharedCollection).toContain(announcement);
      expect(comp.assignmentsSharedCollection).toContain(assignment);
      expect(comp.courseSection).toEqual(courseSection);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourseSection>>();
      const courseSection = { id: 123 };
      jest.spyOn(courseSectionFormService, 'getCourseSection').mockReturnValue(courseSection);
      jest.spyOn(courseSectionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courseSection });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: courseSection }));
      saveSubject.complete();

      // THEN
      expect(courseSectionFormService.getCourseSection).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(courseSectionService.update).toHaveBeenCalledWith(expect.objectContaining(courseSection));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourseSection>>();
      const courseSection = { id: 123 };
      jest.spyOn(courseSectionFormService, 'getCourseSection').mockReturnValue({ id: null });
      jest.spyOn(courseSectionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courseSection: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: courseSection }));
      saveSubject.complete();

      // THEN
      expect(courseSectionFormService.getCourseSection).toHaveBeenCalled();
      expect(courseSectionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICourseSection>>();
      const courseSection = { id: 123 };
      jest.spyOn(courseSectionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ courseSection });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(courseSectionService.update).toHaveBeenCalled();
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

    describe('compareAnnouncement', () => {
      it('Should forward to announcementService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(announcementService, 'compareAnnouncement');
        comp.compareAnnouncement(entity, entity2);
        expect(announcementService.compareAnnouncement).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareAssignment', () => {
      it('Should forward to assignmentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(assignmentService, 'compareAssignment');
        comp.compareAssignment(entity, entity2);
        expect(assignmentService.compareAssignment).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
