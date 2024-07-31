import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { IQuiz } from 'app/entities/quiz/quiz.model';
import { QuizService } from 'app/entities/quiz/service/quiz.service';
import { IAssignment } from 'app/entities/assignment/assignment.model';
import { AssignmentService } from 'app/entities/assignment/service/assignment.service';
import { ISubmissionAssignment } from 'app/entities/submission-assignment/submission-assignment.model';
import { SubmissionAssignmentService } from 'app/entities/submission-assignment/service/submission-assignment.service';
import { IStudent } from 'app/entities/student/student.model';
import { StudentService } from 'app/entities/student/service/student.service';
import { ITeacher } from 'app/entities/teacher/teacher.model';
import { TeacherService } from 'app/entities/teacher/service/teacher.service';
import { INotification } from '../notification.model';
import { NotificationService } from '../service/notification.service';
import { NotificationFormService } from './notification-form.service';

import { NotificationUpdateComponent } from './notification-update.component';

describe('Notification Management Update Component', () => {
  let comp: NotificationUpdateComponent;
  let fixture: ComponentFixture<NotificationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let notificationFormService: NotificationFormService;
  let notificationService: NotificationService;
  let quizService: QuizService;
  let assignmentService: AssignmentService;
  let submissionAssignmentService: SubmissionAssignmentService;
  let studentService: StudentService;
  let teacherService: TeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotificationUpdateComponent],
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
      .overrideTemplate(NotificationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NotificationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    notificationFormService = TestBed.inject(NotificationFormService);
    notificationService = TestBed.inject(NotificationService);
    quizService = TestBed.inject(QuizService);
    assignmentService = TestBed.inject(AssignmentService);
    submissionAssignmentService = TestBed.inject(SubmissionAssignmentService);
    studentService = TestBed.inject(StudentService);
    teacherService = TestBed.inject(TeacherService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Quiz query and add missing value', () => {
      const notification: INotification = { id: 456 };
      const quiz: IQuiz = { id: 30336 };
      notification.quiz = quiz;

      const quizCollection: IQuiz[] = [{ id: 22844 }];
      jest.spyOn(quizService, 'query').mockReturnValue(of(new HttpResponse({ body: quizCollection })));
      const additionalQuizzes = [quiz];
      const expectedCollection: IQuiz[] = [...additionalQuizzes, ...quizCollection];
      jest.spyOn(quizService, 'addQuizToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ notification });
      comp.ngOnInit();

      expect(quizService.query).toHaveBeenCalled();
      expect(quizService.addQuizToCollectionIfMissing).toHaveBeenCalledWith(
        quizCollection,
        ...additionalQuizzes.map(expect.objectContaining),
      );
      expect(comp.quizzesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Assignment query and add missing value', () => {
      const notification: INotification = { id: 456 };
      const assignment: IAssignment = { id: 3486 };
      notification.assignment = assignment;

      const assignmentCollection: IAssignment[] = [{ id: 22320 }];
      jest.spyOn(assignmentService, 'query').mockReturnValue(of(new HttpResponse({ body: assignmentCollection })));
      const additionalAssignments = [assignment];
      const expectedCollection: IAssignment[] = [...additionalAssignments, ...assignmentCollection];
      jest.spyOn(assignmentService, 'addAssignmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ notification });
      comp.ngOnInit();

      expect(assignmentService.query).toHaveBeenCalled();
      expect(assignmentService.addAssignmentToCollectionIfMissing).toHaveBeenCalledWith(
        assignmentCollection,
        ...additionalAssignments.map(expect.objectContaining),
      );
      expect(comp.assignmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call SubmissionAssignment query and add missing value', () => {
      const notification: INotification = { id: 456 };
      const submissionAssignment: ISubmissionAssignment = { id: 4558 };
      notification.submissionAssignment = submissionAssignment;

      const submissionAssignmentCollection: ISubmissionAssignment[] = [{ id: 30696 }];
      jest.spyOn(submissionAssignmentService, 'query').mockReturnValue(of(new HttpResponse({ body: submissionAssignmentCollection })));
      const additionalSubmissionAssignments = [submissionAssignment];
      const expectedCollection: ISubmissionAssignment[] = [...additionalSubmissionAssignments, ...submissionAssignmentCollection];
      jest.spyOn(submissionAssignmentService, 'addSubmissionAssignmentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ notification });
      comp.ngOnInit();

      expect(submissionAssignmentService.query).toHaveBeenCalled();
      expect(submissionAssignmentService.addSubmissionAssignmentToCollectionIfMissing).toHaveBeenCalledWith(
        submissionAssignmentCollection,
        ...additionalSubmissionAssignments.map(expect.objectContaining),
      );
      expect(comp.submissionAssignmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Student query and add missing value', () => {
      const notification: INotification = { id: 456 };
      const student: IStudent = { id: 28359 };
      notification.student = student;

      const studentCollection: IStudent[] = [{ id: 19409 }];
      jest.spyOn(studentService, 'query').mockReturnValue(of(new HttpResponse({ body: studentCollection })));
      const additionalStudents = [student];
      const expectedCollection: IStudent[] = [...additionalStudents, ...studentCollection];
      jest.spyOn(studentService, 'addStudentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ notification });
      comp.ngOnInit();

      expect(studentService.query).toHaveBeenCalled();
      expect(studentService.addStudentToCollectionIfMissing).toHaveBeenCalledWith(
        studentCollection,
        ...additionalStudents.map(expect.objectContaining),
      );
      expect(comp.studentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Teacher query and add missing value', () => {
      const notification: INotification = { id: 456 };
      const teacher: ITeacher = { id: 6335 };
      notification.teacher = teacher;

      const teacherCollection: ITeacher[] = [{ id: 18352 }];
      jest.spyOn(teacherService, 'query').mockReturnValue(of(new HttpResponse({ body: teacherCollection })));
      const additionalTeachers = [teacher];
      const expectedCollection: ITeacher[] = [...additionalTeachers, ...teacherCollection];
      jest.spyOn(teacherService, 'addTeacherToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ notification });
      comp.ngOnInit();

      expect(teacherService.query).toHaveBeenCalled();
      expect(teacherService.addTeacherToCollectionIfMissing).toHaveBeenCalledWith(
        teacherCollection,
        ...additionalTeachers.map(expect.objectContaining),
      );
      expect(comp.teachersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const notification: INotification = { id: 456 };
      const quiz: IQuiz = { id: 21999 };
      notification.quiz = quiz;
      const assignment: IAssignment = { id: 7045 };
      notification.assignment = assignment;
      const submissionAssignment: ISubmissionAssignment = { id: 2510 };
      notification.submissionAssignment = submissionAssignment;
      const student: IStudent = { id: 19148 };
      notification.student = student;
      const teacher: ITeacher = { id: 24225 };
      notification.teacher = teacher;

      activatedRoute.data = of({ notification });
      comp.ngOnInit();

      expect(comp.quizzesSharedCollection).toContain(quiz);
      expect(comp.assignmentsSharedCollection).toContain(assignment);
      expect(comp.submissionAssignmentsSharedCollection).toContain(submissionAssignment);
      expect(comp.studentsSharedCollection).toContain(student);
      expect(comp.teachersSharedCollection).toContain(teacher);
      expect(comp.notification).toEqual(notification);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INotification>>();
      const notification = { id: 123 };
      jest.spyOn(notificationFormService, 'getNotification').mockReturnValue(notification);
      jest.spyOn(notificationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ notification });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: notification }));
      saveSubject.complete();

      // THEN
      expect(notificationFormService.getNotification).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(notificationService.update).toHaveBeenCalledWith(expect.objectContaining(notification));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INotification>>();
      const notification = { id: 123 };
      jest.spyOn(notificationFormService, 'getNotification').mockReturnValue({ id: null });
      jest.spyOn(notificationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ notification: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: notification }));
      saveSubject.complete();

      // THEN
      expect(notificationFormService.getNotification).toHaveBeenCalled();
      expect(notificationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INotification>>();
      const notification = { id: 123 };
      jest.spyOn(notificationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ notification });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(notificationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareQuiz', () => {
      it('Should forward to quizService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(quizService, 'compareQuiz');
        comp.compareQuiz(entity, entity2);
        expect(quizService.compareQuiz).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareSubmissionAssignment', () => {
      it('Should forward to submissionAssignmentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(submissionAssignmentService, 'compareSubmissionAssignment');
        comp.compareSubmissionAssignment(entity, entity2);
        expect(submissionAssignmentService.compareSubmissionAssignment).toHaveBeenCalledWith(entity, entity2);
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
