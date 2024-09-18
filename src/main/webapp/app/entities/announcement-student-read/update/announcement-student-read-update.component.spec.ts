import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IAnnouncement } from 'app/entities/announcement/announcement.model';
import { AnnouncementService } from 'app/entities/announcement/service/announcement.service';
import { IStudent } from 'app/entities/student/student.model';
import { StudentService } from 'app/entities/student/service/student.service';
import { IAnnouncementStudentRead } from '../announcement-student-read.model';
import { AnnouncementStudentReadService } from '../service/announcement-student-read.service';
import { AnnouncementStudentReadFormService } from './announcement-student-read-form.service';

import { AnnouncementStudentReadUpdateComponent } from './announcement-student-read-update.component';

describe('AnnouncementStudentRead Management Update Component', () => {
  let comp: AnnouncementStudentReadUpdateComponent;
  let fixture: ComponentFixture<AnnouncementStudentReadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let announcementStudentReadFormService: AnnouncementStudentReadFormService;
  let announcementStudentReadService: AnnouncementStudentReadService;
  let announcementService: AnnouncementService;
  let studentService: StudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnnouncementStudentReadUpdateComponent],
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
      .overrideTemplate(AnnouncementStudentReadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AnnouncementStudentReadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    announcementStudentReadFormService = TestBed.inject(AnnouncementStudentReadFormService);
    announcementStudentReadService = TestBed.inject(AnnouncementStudentReadService);
    announcementService = TestBed.inject(AnnouncementService);
    studentService = TestBed.inject(StudentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Announcement query and add missing value', () => {
      const announcementStudentRead: IAnnouncementStudentRead = { id: 456 };
      const announcement: IAnnouncement = { id: 28475 };
      announcementStudentRead.announcement = announcement;

      const announcementCollection: IAnnouncement[] = [{ id: 2815 }];
      jest.spyOn(announcementService, 'query').mockReturnValue(of(new HttpResponse({ body: announcementCollection })));
      const additionalAnnouncements = [announcement];
      const expectedCollection: IAnnouncement[] = [...additionalAnnouncements, ...announcementCollection];
      jest.spyOn(announcementService, 'addAnnouncementToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ announcementStudentRead });
      comp.ngOnInit();

      expect(announcementService.query).toHaveBeenCalled();
      expect(announcementService.addAnnouncementToCollectionIfMissing).toHaveBeenCalledWith(
        announcementCollection,
        ...additionalAnnouncements.map(expect.objectContaining),
      );
      expect(comp.announcementsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Student query and add missing value', () => {
      const announcementStudentRead: IAnnouncementStudentRead = { id: 456 };
      const student: IStudent = { id: 20026 };
      announcementStudentRead.student = student;

      const studentCollection: IStudent[] = [{ id: 18583 }];
      jest.spyOn(studentService, 'query').mockReturnValue(of(new HttpResponse({ body: studentCollection })));
      const additionalStudents = [student];
      const expectedCollection: IStudent[] = [...additionalStudents, ...studentCollection];
      jest.spyOn(studentService, 'addStudentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ announcementStudentRead });
      comp.ngOnInit();

      expect(studentService.query).toHaveBeenCalled();
      expect(studentService.addStudentToCollectionIfMissing).toHaveBeenCalledWith(
        studentCollection,
        ...additionalStudents.map(expect.objectContaining),
      );
      expect(comp.studentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const announcementStudentRead: IAnnouncementStudentRead = { id: 456 };
      const announcement: IAnnouncement = { id: 21521 };
      announcementStudentRead.announcement = announcement;
      const student: IStudent = { id: 15955 };
      announcementStudentRead.student = student;

      activatedRoute.data = of({ announcementStudentRead });
      comp.ngOnInit();

      expect(comp.announcementsSharedCollection).toContain(announcement);
      expect(comp.studentsSharedCollection).toContain(student);
      expect(comp.announcementStudentRead).toEqual(announcementStudentRead);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnnouncementStudentRead>>();
      const announcementStudentRead = { id: 123 };
      jest.spyOn(announcementStudentReadFormService, 'getAnnouncementStudentRead').mockReturnValue(announcementStudentRead);
      jest.spyOn(announcementStudentReadService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ announcementStudentRead });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: announcementStudentRead }));
      saveSubject.complete();

      // THEN
      expect(announcementStudentReadFormService.getAnnouncementStudentRead).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(announcementStudentReadService.update).toHaveBeenCalledWith(expect.objectContaining(announcementStudentRead));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnnouncementStudentRead>>();
      const announcementStudentRead = { id: 123 };
      jest.spyOn(announcementStudentReadFormService, 'getAnnouncementStudentRead').mockReturnValue({ id: null });
      jest.spyOn(announcementStudentReadService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ announcementStudentRead: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: announcementStudentRead }));
      saveSubject.complete();

      // THEN
      expect(announcementStudentReadFormService.getAnnouncementStudentRead).toHaveBeenCalled();
      expect(announcementStudentReadService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnnouncementStudentRead>>();
      const announcementStudentRead = { id: 123 };
      jest.spyOn(announcementStudentReadService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ announcementStudentRead });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(announcementStudentReadService.update).toHaveBeenCalled();
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

    describe('compareStudent', () => {
      it('Should forward to studentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(studentService, 'compareStudent');
        comp.compareStudent(entity, entity2);
        expect(studentService.compareStudent).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
