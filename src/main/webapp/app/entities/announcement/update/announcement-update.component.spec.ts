import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ICourseSection } from 'app/entities/course-section/course-section.model';
import { CourseSectionService } from 'app/entities/course-section/service/course-section.service';
import { IAnnouncement } from '../announcement.model';
import { AnnouncementService } from '../service/announcement.service';
import { AnnouncementFormService } from './announcement-form.service';

import { AnnouncementUpdateComponent } from './announcement-update.component';

describe('Announcement Management Update Component', () => {
  let comp: AnnouncementUpdateComponent;
  let fixture: ComponentFixture<AnnouncementUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let announcementFormService: AnnouncementFormService;
  let announcementService: AnnouncementService;
  let courseService: CourseService;
  let courseSectionService: CourseSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnnouncementUpdateComponent],
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
      .overrideTemplate(AnnouncementUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AnnouncementUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    announcementFormService = TestBed.inject(AnnouncementFormService);
    announcementService = TestBed.inject(AnnouncementService);
    courseService = TestBed.inject(CourseService);
    courseSectionService = TestBed.inject(CourseSectionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Course query and add missing value', () => {
      const announcement: IAnnouncement = { id: 456 };
      const course: ICourse = { id: 29699 };
      announcement.course = course;

      const courseCollection: ICourse[] = [{ id: 31028 }];
      jest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      jest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ announcement });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(expect.objectContaining),
      );
      expect(comp.coursesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call CourseSection query and add missing value', () => {
      const announcement: IAnnouncement = { id: 456 };
      const courseSections: ICourseSection[] = [{ id: 17791 }];
      announcement.courseSections = courseSections;

      const courseSectionCollection: ICourseSection[] = [{ id: 1566 }];
      jest.spyOn(courseSectionService, 'query').mockReturnValue(of(new HttpResponse({ body: courseSectionCollection })));
      const additionalCourseSections = [...courseSections];
      const expectedCollection: ICourseSection[] = [...additionalCourseSections, ...courseSectionCollection];
      jest.spyOn(courseSectionService, 'addCourseSectionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ announcement });
      comp.ngOnInit();

      expect(courseSectionService.query).toHaveBeenCalled();
      expect(courseSectionService.addCourseSectionToCollectionIfMissing).toHaveBeenCalledWith(
        courseSectionCollection,
        ...additionalCourseSections.map(expect.objectContaining),
      );
      expect(comp.courseSectionsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const announcement: IAnnouncement = { id: 456 };
      const course: ICourse = { id: 4252 };
      announcement.course = course;
      const courseSection: ICourseSection = { id: 12499 };
      announcement.courseSections = [courseSection];

      activatedRoute.data = of({ announcement });
      comp.ngOnInit();

      expect(comp.coursesSharedCollection).toContain(course);
      expect(comp.courseSectionsSharedCollection).toContain(courseSection);
      expect(comp.announcement).toEqual(announcement);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnnouncement>>();
      const announcement = { id: 123 };
      jest.spyOn(announcementFormService, 'getAnnouncement').mockReturnValue(announcement);
      jest.spyOn(announcementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ announcement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: announcement }));
      saveSubject.complete();

      // THEN
      expect(announcementFormService.getAnnouncement).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(announcementService.update).toHaveBeenCalledWith(expect.objectContaining(announcement));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnnouncement>>();
      const announcement = { id: 123 };
      jest.spyOn(announcementFormService, 'getAnnouncement').mockReturnValue({ id: null });
      jest.spyOn(announcementService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ announcement: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: announcement }));
      saveSubject.complete();

      // THEN
      expect(announcementFormService.getAnnouncement).toHaveBeenCalled();
      expect(announcementService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnnouncement>>();
      const announcement = { id: 123 };
      jest.spyOn(announcementService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ announcement });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(announcementService.update).toHaveBeenCalled();
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
