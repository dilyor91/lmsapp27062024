import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IStudent } from 'app/entities/student/student.model';
import { StudentService } from 'app/entities/student/service/student.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { IAssignment } from 'app/entities/assignment/assignment.model';
import { AssignmentService } from 'app/entities/assignment/service/assignment.service';
import { IAttachment } from 'app/entities/attachment/attachment.model';
import { AttachmentService } from 'app/entities/attachment/service/attachment.service';
import { ISubmissionAssignment } from '../submission-assignment.model';
import { SubmissionAssignmentService } from '../service/submission-assignment.service';
import { SubmissionAssignmentFormService } from './submission-assignment-form.service';

import { SubmissionAssignmentUpdateComponent } from './submission-assignment-update.component';

describe('SubmissionAssignment Management Update Component', () => {
  let comp: SubmissionAssignmentUpdateComponent;
  let fixture: ComponentFixture<SubmissionAssignmentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let submissionAssignmentFormService: SubmissionAssignmentFormService;
  let submissionAssignmentService: SubmissionAssignmentService;
  let studentService: StudentService;
  let courseService: CourseService;
  let assignmentService: AssignmentService;
  let attachmentService: AttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SubmissionAssignmentUpdateComponent],
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
      .overrideTemplate(SubmissionAssignmentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SubmissionAssignmentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    submissionAssignmentFormService = TestBed.inject(SubmissionAssignmentFormService);
    submissionAssignmentService = TestBed.inject(SubmissionAssignmentService);
    studentService = TestBed.inject(StudentService);
    courseService = TestBed.inject(CourseService);
    assignmentService = TestBed.inject(AssignmentService);
    attachmentService = TestBed.inject(AttachmentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Student query and add missing value', () => {
      const submissionAssignment: ISubmissionAssignment = { id: 456 };
      const student: IStudent = { id: 22298 };
      submissionAssignment.student = student;

      const studentCollection: IStudent[] = [{ id: 30572 }];
      jest.spyOn(studentService, 'query').mockReturnValue(of(new HttpResponse({ body: studentCollection })));
      const additionalStudents = [student];
      const expectedCollection: IStudent[] = [...additionalStudents, ...studentCollection];
      jest.spyOn(studentService, 'addStudentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ submissionAssignment });
      comp.ngOnInit();

      expect(studentService.query).toHaveBeenCalled();
      expect(studentService.addStudentToCollectionIfMissing).toHaveBeenCalledWith(
        studentCollection,
        ...additionalStudents.map(expect.objectContaining),
      );
      expect(comp.studentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Course query and add missing value', () => {
      const submissionAssignment: ISubmissionAssignment = { id: 456 };
      const course: ICourse = { id: 31510 };
      submissionAssignment.course = course;

      const courseCollection: ICourse[] = [{ id: 25885 }];
      jest.spyOn(courseService, 'query').mockReturnValue(of(new HttpResponse({ body: courseCollection })));
      const additionalCourses = [course];
      const expectedCollection: ICourse[] = [...additionalCourses, ...courseCollection];
      jest.spyOn(courseService, 'addCourseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ submissionAssignment });
      comp.ngOnInit();

      expect(courseService.query).toHaveBeenCalled();
      expect(courseService.addCourseToCollectionIfMissing).toHaveBeenCalledWith(
        courseCollection,
        ...additionalCourses.map(expect.objectContaining),
      );
      expect(comp.coursesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Assignment query and add missing value', () => {
      const submissionAssignment: ISubmissionAssignment = { id: 456 };
      const assignment: IAssignment = { id: 2201 };
      submissionAssignment.assignment = assignment;

      const assignmentCollection: IAssignment[] = [{ id: 11107 }];
      jest.spyOn(assignmentService, 'query').mockReturnValue(of(new HttpResponse({ body: assignmentCollection })));
      const additionalAssignments = [assignment];
      const expectedCollection: IAssignment[] = [...additionalAssignments, ...assignmentCollection];
      jest.spyOn(assignmentService, 'addAssignmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ submissionAssignment });
      comp.ngOnInit();

      expect(assignmentService.query).toHaveBeenCalled();
      expect(assignmentService.addAssignmentToCollectionIfMissing).toHaveBeenCalledWith(
        assignmentCollection,
        ...additionalAssignments.map(expect.objectContaining),
      );
      expect(comp.assignmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Attachment query and add missing value', () => {
      const submissionAssignment: ISubmissionAssignment = { id: 456 };
      const attachment: IAttachment = { id: 31804 };
      submissionAssignment.attachment = attachment;

      const attachmentCollection: IAttachment[] = [{ id: 20880 }];
      jest.spyOn(attachmentService, 'query').mockReturnValue(of(new HttpResponse({ body: attachmentCollection })));
      const additionalAttachments = [attachment];
      const expectedCollection: IAttachment[] = [...additionalAttachments, ...attachmentCollection];
      jest.spyOn(attachmentService, 'addAttachmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ submissionAssignment });
      comp.ngOnInit();

      expect(attachmentService.query).toHaveBeenCalled();
      expect(attachmentService.addAttachmentToCollectionIfMissing).toHaveBeenCalledWith(
        attachmentCollection,
        ...additionalAttachments.map(expect.objectContaining),
      );
      expect(comp.attachmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const submissionAssignment: ISubmissionAssignment = { id: 456 };
      const student: IStudent = { id: 8966 };
      submissionAssignment.student = student;
      const course: ICourse = { id: 10923 };
      submissionAssignment.course = course;
      const assignment: IAssignment = { id: 10612 };
      submissionAssignment.assignment = assignment;
      const attachment: IAttachment = { id: 18947 };
      submissionAssignment.attachment = attachment;

      activatedRoute.data = of({ submissionAssignment });
      comp.ngOnInit();

      expect(comp.studentsSharedCollection).toContain(student);
      expect(comp.coursesSharedCollection).toContain(course);
      expect(comp.assignmentsSharedCollection).toContain(assignment);
      expect(comp.attachmentsSharedCollection).toContain(attachment);
      expect(comp.submissionAssignment).toEqual(submissionAssignment);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISubmissionAssignment>>();
      const submissionAssignment = { id: 123 };
      jest.spyOn(submissionAssignmentFormService, 'getSubmissionAssignment').mockReturnValue(submissionAssignment);
      jest.spyOn(submissionAssignmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ submissionAssignment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: submissionAssignment }));
      saveSubject.complete();

      // THEN
      expect(submissionAssignmentFormService.getSubmissionAssignment).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(submissionAssignmentService.update).toHaveBeenCalledWith(expect.objectContaining(submissionAssignment));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISubmissionAssignment>>();
      const submissionAssignment = { id: 123 };
      jest.spyOn(submissionAssignmentFormService, 'getSubmissionAssignment').mockReturnValue({ id: null });
      jest.spyOn(submissionAssignmentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ submissionAssignment: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: submissionAssignment }));
      saveSubject.complete();

      // THEN
      expect(submissionAssignmentFormService.getSubmissionAssignment).toHaveBeenCalled();
      expect(submissionAssignmentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISubmissionAssignment>>();
      const submissionAssignment = { id: 123 };
      jest.spyOn(submissionAssignmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ submissionAssignment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(submissionAssignmentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareStudent', () => {
      it('Should forward to studentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(studentService, 'compareStudent');
        comp.compareStudent(entity, entity2);
        expect(studentService.compareStudent).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareAssignment', () => {
      it('Should forward to assignmentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(assignmentService, 'compareAssignment');
        comp.compareAssignment(entity, entity2);
        expect(assignmentService.compareAssignment).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareAttachment', () => {
      it('Should forward to attachmentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(attachmentService, 'compareAttachment');
        comp.compareAttachment(entity, entity2);
        expect(attachmentService.compareAttachment).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
