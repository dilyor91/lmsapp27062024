import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { ISubmissionAssignment } from 'app/entities/submission-assignment/submission-assignment.model';
import { SubmissionAssignmentService } from 'app/entities/submission-assignment/service/submission-assignment.service';
import { IAssignment } from 'app/entities/assignment/assignment.model';
import { AssignmentService } from 'app/entities/assignment/service/assignment.service';
import { IStudent } from 'app/entities/student/student.model';
import { StudentService } from 'app/entities/student/service/student.service';
import { ITeacher } from 'app/entities/teacher/teacher.model';
import { TeacherService } from 'app/entities/teacher/service/teacher.service';
import { IAssignmentComment } from '../assignment-comment.model';
import { AssignmentCommentService } from '../service/assignment-comment.service';
import { AssignmentCommentFormService } from './assignment-comment-form.service';

import { AssignmentCommentUpdateComponent } from './assignment-comment-update.component';

describe('AssignmentComment Management Update Component', () => {
  let comp: AssignmentCommentUpdateComponent;
  let fixture: ComponentFixture<AssignmentCommentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let assignmentCommentFormService: AssignmentCommentFormService;
  let assignmentCommentService: AssignmentCommentService;
  let submissionAssignmentService: SubmissionAssignmentService;
  let assignmentService: AssignmentService;
  let studentService: StudentService;
  let teacherService: TeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AssignmentCommentUpdateComponent],
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
      .overrideTemplate(AssignmentCommentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AssignmentCommentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    assignmentCommentFormService = TestBed.inject(AssignmentCommentFormService);
    assignmentCommentService = TestBed.inject(AssignmentCommentService);
    submissionAssignmentService = TestBed.inject(SubmissionAssignmentService);
    assignmentService = TestBed.inject(AssignmentService);
    studentService = TestBed.inject(StudentService);
    teacherService = TestBed.inject(TeacherService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call SubmissionAssignment query and add missing value', () => {
      const assignmentComment: IAssignmentComment = { id: 456 };
      const submissionAssignment: ISubmissionAssignment = { id: 6434 };
      assignmentComment.submissionAssignment = submissionAssignment;

      const submissionAssignmentCollection: ISubmissionAssignment[] = [{ id: 23611 }];
      jest.spyOn(submissionAssignmentService, 'query').mockReturnValue(of(new HttpResponse({ body: submissionAssignmentCollection })));
      const additionalSubmissionAssignments = [submissionAssignment];
      const expectedCollection: ISubmissionAssignment[] = [...additionalSubmissionAssignments, ...submissionAssignmentCollection];
      jest.spyOn(submissionAssignmentService, 'addSubmissionAssignmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assignmentComment });
      comp.ngOnInit();

      expect(submissionAssignmentService.query).toHaveBeenCalled();
      expect(submissionAssignmentService.addSubmissionAssignmentToCollectionIfMissing).toHaveBeenCalledWith(
        submissionAssignmentCollection,
        ...additionalSubmissionAssignments.map(expect.objectContaining),
      );
      expect(comp.submissionAssignmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Assignment query and add missing value', () => {
      const assignmentComment: IAssignmentComment = { id: 456 };
      const assignment: IAssignment = { id: 4004 };
      assignmentComment.assignment = assignment;

      const assignmentCollection: IAssignment[] = [{ id: 4720 }];
      jest.spyOn(assignmentService, 'query').mockReturnValue(of(new HttpResponse({ body: assignmentCollection })));
      const additionalAssignments = [assignment];
      const expectedCollection: IAssignment[] = [...additionalAssignments, ...assignmentCollection];
      jest.spyOn(assignmentService, 'addAssignmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assignmentComment });
      comp.ngOnInit();

      expect(assignmentService.query).toHaveBeenCalled();
      expect(assignmentService.addAssignmentToCollectionIfMissing).toHaveBeenCalledWith(
        assignmentCollection,
        ...additionalAssignments.map(expect.objectContaining),
      );
      expect(comp.assignmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Student query and add missing value', () => {
      const assignmentComment: IAssignmentComment = { id: 456 };
      const student: IStudent = { id: 27364 };
      assignmentComment.student = student;

      const studentCollection: IStudent[] = [{ id: 1373 }];
      jest.spyOn(studentService, 'query').mockReturnValue(of(new HttpResponse({ body: studentCollection })));
      const additionalStudents = [student];
      const expectedCollection: IStudent[] = [...additionalStudents, ...studentCollection];
      jest.spyOn(studentService, 'addStudentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assignmentComment });
      comp.ngOnInit();

      expect(studentService.query).toHaveBeenCalled();
      expect(studentService.addStudentToCollectionIfMissing).toHaveBeenCalledWith(
        studentCollection,
        ...additionalStudents.map(expect.objectContaining),
      );
      expect(comp.studentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Teacher query and add missing value', () => {
      const assignmentComment: IAssignmentComment = { id: 456 };
      const teacher: ITeacher = { id: 2392 };
      assignmentComment.teacher = teacher;

      const teacherCollection: ITeacher[] = [{ id: 1903 }];
      jest.spyOn(teacherService, 'query').mockReturnValue(of(new HttpResponse({ body: teacherCollection })));
      const additionalTeachers = [teacher];
      const expectedCollection: ITeacher[] = [...additionalTeachers, ...teacherCollection];
      jest.spyOn(teacherService, 'addTeacherToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ assignmentComment });
      comp.ngOnInit();

      expect(teacherService.query).toHaveBeenCalled();
      expect(teacherService.addTeacherToCollectionIfMissing).toHaveBeenCalledWith(
        teacherCollection,
        ...additionalTeachers.map(expect.objectContaining),
      );
      expect(comp.teachersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const assignmentComment: IAssignmentComment = { id: 456 };
      const submissionAssignment: ISubmissionAssignment = { id: 15977 };
      assignmentComment.submissionAssignment = submissionAssignment;
      const assignment: IAssignment = { id: 4249 };
      assignmentComment.assignment = assignment;
      const student: IStudent = { id: 519 };
      assignmentComment.student = student;
      const teacher: ITeacher = { id: 21740 };
      assignmentComment.teacher = teacher;

      activatedRoute.data = of({ assignmentComment });
      comp.ngOnInit();

      expect(comp.submissionAssignmentsSharedCollection).toContain(submissionAssignment);
      expect(comp.assignmentsSharedCollection).toContain(assignment);
      expect(comp.studentsSharedCollection).toContain(student);
      expect(comp.teachersSharedCollection).toContain(teacher);
      expect(comp.assignmentComment).toEqual(assignmentComment);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssignmentComment>>();
      const assignmentComment = { id: 123 };
      jest.spyOn(assignmentCommentFormService, 'getAssignmentComment').mockReturnValue(assignmentComment);
      jest.spyOn(assignmentCommentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assignmentComment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: assignmentComment }));
      saveSubject.complete();

      // THEN
      expect(assignmentCommentFormService.getAssignmentComment).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(assignmentCommentService.update).toHaveBeenCalledWith(expect.objectContaining(assignmentComment));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssignmentComment>>();
      const assignmentComment = { id: 123 };
      jest.spyOn(assignmentCommentFormService, 'getAssignmentComment').mockReturnValue({ id: null });
      jest.spyOn(assignmentCommentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assignmentComment: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: assignmentComment }));
      saveSubject.complete();

      // THEN
      expect(assignmentCommentFormService.getAssignmentComment).toHaveBeenCalled();
      expect(assignmentCommentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAssignmentComment>>();
      const assignmentComment = { id: 123 };
      jest.spyOn(assignmentCommentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ assignmentComment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(assignmentCommentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSubmissionAssignment', () => {
      it('Should forward to submissionAssignmentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(submissionAssignmentService, 'compareSubmissionAssignment');
        comp.compareSubmissionAssignment(entity, entity2);
        expect(submissionAssignmentService.compareSubmissionAssignment).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareStudent', () => {
      it('Should forward to studentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(studentService, 'compareStudent');
        comp.compareStudent(entity, entity2);
        expect(studentService.compareStudent).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTeacher', () => {
      it('Should forward to teacherService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(teacherService, 'compareTeacher');
        comp.compareTeacher(entity, entity2);
        expect(teacherService.compareTeacher).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
