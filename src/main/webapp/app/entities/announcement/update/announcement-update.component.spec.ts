import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IAttachment } from 'app/entities/attachment/attachment.model';
import { AttachmentService } from 'app/entities/attachment/service/attachment.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
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
  let attachmentService: AttachmentService;
  let courseService: CourseService;

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
    attachmentService = TestBed.inject(AttachmentService);
    courseService = TestBed.inject(CourseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Attachment query and add missing value', () => {
      const announcement: IAnnouncement = { id: 456 };
      const attachment: IAttachment = { id: 18146 };
      announcement.attachment = attachment;

      const attachmentCollection: IAttachment[] = [{ id: 20438 }];
      jest.spyOn(attachmentService, 'query').mockReturnValue(of(new HttpResponse({ body: attachmentCollection })));
      const additionalAttachments = [attachment];
      const expectedCollection: IAttachment[] = [...additionalAttachments, ...attachmentCollection];
      jest.spyOn(attachmentService, 'addAttachmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ announcement });
      comp.ngOnInit();

      expect(attachmentService.query).toHaveBeenCalled();
      expect(attachmentService.addAttachmentToCollectionIfMissing).toHaveBeenCalledWith(
        attachmentCollection,
        ...additionalAttachments.map(expect.objectContaining),
      );
      expect(comp.attachmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Course query and add missing value', () => {
      const announcement: IAnnouncement = { id: 456 };
      const course: ICourse = { id: 7289 };
      announcement.course = course;

      const courseCollection: ICourse[] = [{ id: 30570 }];
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

    it('Should update editForm', () => {
      const announcement: IAnnouncement = { id: 456 };
      const attachment: IAttachment = { id: 27036 };
      announcement.attachment = attachment;
      const course: ICourse = { id: 23243 };
      announcement.course = course;

      activatedRoute.data = of({ announcement });
      comp.ngOnInit();

      expect(comp.attachmentsSharedCollection).toContain(attachment);
      expect(comp.coursesSharedCollection).toContain(course);
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
    describe('compareAttachment', () => {
      it('Should forward to attachmentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(attachmentService, 'compareAttachment');
        comp.compareAttachment(entity, entity2);
        expect(attachmentService.compareAttachment).toHaveBeenCalledWith(entity, entity2);
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
  });
});
