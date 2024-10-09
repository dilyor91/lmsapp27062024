import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IAnnouncement } from 'app/entities/announcement/announcement.model';
import { AnnouncementService } from 'app/entities/announcement/service/announcement.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ICourseSection } from 'app/entities/course-section/course-section.model';
import { CourseSectionService } from 'app/entities/course-section/service/course-section.service';
import { IAnnouncementCourseSection } from '../announcement-course-section.model';
import { AnnouncementCourseSectionService } from '../service/announcement-course-section.service';
import { AnnouncementCourseSectionFormService } from './announcement-course-section-form.service';

import { AnnouncementCourseSectionUpdateComponent } from './announcement-course-section-update.component';

describe('AnnouncementCourseSection Management Update Component', () => {
  let comp: AnnouncementCourseSectionUpdateComponent;
  let fixture: ComponentFixture<AnnouncementCourseSectionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let announcementCourseSectionFormService: AnnouncementCourseSectionFormService;
  let announcementCourseSectionService: AnnouncementCourseSectionService;
  let announcementService: AnnouncementService;
  let courseService: CourseService;
  let courseSectionService: CourseSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnnouncementCourseSectionUpdateComponent],
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
      .overrideTemplate(AnnouncementCourseSectionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AnnouncementCourseSectionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    announcementCourseSectionFormService = TestBed.inject(AnnouncementCourseSectionFormService);
    announcementCourseSectionService = TestBed.inject(AnnouncementCourseSectionService);
    announcementService = TestBed.inject(AnnouncementService);
    courseService = TestBed.inject(CourseService);
    courseSectionService = TestBed.inject(CourseSectionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Announcement query and add missing value', () => {
      const announcementCourseSection: IAnnouncementCourseSection = { id: 456 };
      const announcement: IAnnouncement = { id: 10886 };
      announcementCourseSection.announcement = announcement;

      const announcementCollection: IAnnouncement[] = [{ id: 29012 }];
      jest.spyOn(announcementService, 'query').mockReturnValue(of(new HttpResponse({ body: announcementCollection })));
      const additionalAnnouncements = [announcement];
      const expectedCollection: IAnnouncement[] = [...additionalAnnouncements, ...announcementCollection];
      jest.spyOn(announcementService, 'addAnnouncementToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ announcementCourseSection });
      comp.ngOnInit();

      expect(announcementService.query).toHaveBeenCalled();
      expect(announcementService.addAnnouncementToCollectionIfMissing).toHaveBeenCalledWith(
        announcementCollection,
        ...additionalAnnouncements.map(expect.objectContaining),
      );
      expect(comp.announcementsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Course query and add missing value', () => {
      const announcementCourseSection: IAnnouncementCourseSection = { id: 456 };
      const course: ICourse = { id: 14013 };
      announcementCourseSection.course = course;

      const courseCollection: ICourse[] = [{ id: 4937 }];
      jest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      jest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ announcementCourseSection });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(expect.objectContaining),
      );
      expect(comp.coursesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CourseSection query and add missing value', () => {
      const announcementCourseSection: IAnnouncementCourseSection = { id: 456 };
      const courseSection: ICourseSection = { id: 13670 };
      announcementCourseSection.courseSection = courseSection;

      const courseSectionCollection: ICourseSection[] = [{ id: 5343 }];
      jest.spyOn(courseSectionService, 'query').mockReturnValue(of(new HttpResponse({ body: courseSectionCollection })));
      const additionalCourseSections = [courseSection];
      const expectedCollection: ICourseSection[] = [...additionalCourseSections, ...courseSectionCollection];
      jest.spyOn(courseSectionService, 'addCourseSectionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ announcementCourseSection });
      comp.ngOnInit();

      expect(courseSectionService.query).toHaveBeenCalled();
      expect(courseSectionService.addCourseSectionToCollectionIfMissing).toHaveBeenCalledWith(
        courseSectionCollection,
        ...additionalCourseSections.map(expect.objectContaining),
      );
      expect(comp.courseSectionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const announcementCourseSection: IAnnouncementCourseSection = { id: 456 };
      const announcement: IAnnouncement = { id: 32753 };
      announcementCourseSection.announcement = announcement;
      const course: ICourse = { id: 25350 };
      announcementCourseSection.course = course;
      const courseSection: ICourseSection = { id: 2832 };
      announcementCourseSection.courseSection = courseSection;

      activatedRoute.data = of({ announcementCourseSection });
      comp.ngOnInit();

      expect(comp.announcementsSharedCollection).toContain(announcement);
      expect(comp.coursesSharedCollection).toContain(course);
      expect(comp.courseSectionsSharedCollection).toContain(courseSection);
      expect(comp.announcementCourseSection).toEqual(announcementCourseSection);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnnouncementCourseSection>>();
      const announcementCourseSection = { id: 123 };
      jest.spyOn(announcementCourseSectionFormService, 'getAnnouncementCourseSection').mockReturnValue(announcementCourseSection);
      jest.spyOn(announcementCourseSectionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ announcementCourseSection });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: announcementCourseSection }));
      saveSubject.complete();

      // THEN
      expect(announcementCourseSectionFormService.getAnnouncementCourseSection).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(announcementCourseSectionService.update).toHaveBeenCalledWith(expect.objectContaining(announcementCourseSection));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnnouncementCourseSection>>();
      const announcementCourseSection = { id: 123 };
      jest.spyOn(announcementCourseSectionFormService, 'getAnnouncementCourseSection').mockReturnValue({ id: null });
      jest.spyOn(announcementCourseSectionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ announcementCourseSection: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: announcementCourseSection }));
      saveSubject.complete();

      // THEN
      expect(announcementCourseSectionFormService.getAnnouncementCourseSection).toHaveBeenCalled();
      expect(announcementCourseSectionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnnouncementCourseSection>>();
      const announcementCourseSection = { id: 123 };
      jest.spyOn(announcementCourseSectionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ announcementCourseSection });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(announcementCourseSectionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAnnouncement', () => {
      it('Should forward to announcementService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(announcementService, 'compareAnnouncement');
        comp.compareAnnouncement(entity, entity2);
        expect(announcementService.compareAnnouncement).toHaveBeenCalledWith(entity, entity2);
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
