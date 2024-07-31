import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { NotificationType } from 'app/entities/enumerations/notification-type.model';
import { NotificationService } from '../service/notification.service';
import { INotification } from '../notification.model';
import { NotificationFormService, NotificationFormGroup } from './notification-form.service';

@Component({
  standalone: true,
  selector: 'jhi-notification-update',
  templateUrl: './notification-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class NotificationUpdateComponent implements OnInit {
  isSaving = false;
  notification: INotification | null = null;
  notificationTypeValues = Object.keys(NotificationType);

  quizzesSharedCollection: IQuiz[] = [];
  assignmentsSharedCollection: IAssignment[] = [];
  submissionAssignmentsSharedCollection: ISubmissionAssignment[] = [];
  studentsSharedCollection: IStudent[] = [];
  teachersSharedCollection: ITeacher[] = [];

  protected notificationService = inject(NotificationService);
  protected notificationFormService = inject(NotificationFormService);
  protected quizService = inject(QuizService);
  protected assignmentService = inject(AssignmentService);
  protected submissionAssignmentService = inject(SubmissionAssignmentService);
  protected studentService = inject(StudentService);
  protected teacherService = inject(TeacherService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: NotificationFormGroup = this.notificationFormService.createNotificationFormGroup();

  compareQuiz = (o1: IQuiz | null, o2: IQuiz | null): boolean => this.quizService.compareQuiz(o1, o2);

  compareAssignment = (o1: IAssignment | null, o2: IAssignment | null): boolean => this.assignmentService.compareAssignment(o1, o2);

  compareSubmissionAssignment = (o1: ISubmissionAssignment | null, o2: ISubmissionAssignment | null): boolean =>
    this.submissionAssignmentService.compareSubmissionAssignment(o1, o2);

  compareStudent = (o1: IStudent | null, o2: IStudent | null): boolean => this.studentService.compareStudent(o1, o2);

  compareTeacher = (o1: ITeacher | null, o2: ITeacher | null): boolean => this.teacherService.compareTeacher(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ notification }) => {
      this.notification = notification;
      if (notification) {
        this.updateForm(notification);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const notification = this.notificationFormService.getNotification(this.editForm);
    if (notification.id !== null) {
      this.subscribeToSaveResponse(this.notificationService.update(notification));
    } else {
      this.subscribeToSaveResponse(this.notificationService.create(notification));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INotification>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(notification: INotification): void {
    this.notification = notification;
    this.notificationFormService.resetForm(this.editForm, notification);

    this.quizzesSharedCollection = this.quizService.addQuizToCollectionIfMissing<IQuiz>(this.quizzesSharedCollection, notification.quiz);
    this.assignmentsSharedCollection = this.assignmentService.addAssignmentToCollectionIfMissing<IAssignment>(
      this.assignmentsSharedCollection,
      notification.assignment,
    );
    this.submissionAssignmentsSharedCollection =
      this.submissionAssignmentService.addSubmissionAssignmentToCollectionIfMissing<ISubmissionAssignment>(
        this.submissionAssignmentsSharedCollection,
        notification.submissionAssignment,
      );
    this.studentsSharedCollection = this.studentService.addStudentToCollectionIfMissing<IStudent>(
      this.studentsSharedCollection,
      notification.student,
    );
    this.teachersSharedCollection = this.teacherService.addTeacherToCollectionIfMissing<ITeacher>(
      this.teachersSharedCollection,
      notification.teacher,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.quizService
      .query()
      .pipe(map((res: HttpResponse<IQuiz[]>) => res.body ?? []))
      .pipe(map((quizzes: IQuiz[]) => this.quizService.addQuizToCollectionIfMissing<IQuiz>(quizzes, this.notification?.quiz)))
      .subscribe((quizzes: IQuiz[]) => (this.quizzesSharedCollection = quizzes));

    this.assignmentService
      .query()
      .pipe(map((res: HttpResponse<IAssignment[]>) => res.body ?? []))
      .pipe(
        map((assignments: IAssignment[]) =>
          this.assignmentService.addAssignmentToCollectionIfMissing<IAssignment>(assignments, this.notification?.assignment),
        ),
      )
      .subscribe((assignments: IAssignment[]) => (this.assignmentsSharedCollection = assignments));

    this.submissionAssignmentService
      .query()
      .pipe(map((res: HttpResponse<ISubmissionAssignment[]>) => res.body ?? []))
      .pipe(
        map((submissionAssignments: ISubmissionAssignment[]) =>
          this.submissionAssignmentService.addSubmissionAssignmentToCollectionIfMissing<ISubmissionAssignment>(
            submissionAssignments,
            this.notification?.submissionAssignment,
          ),
        ),
      )
      .subscribe((submissionAssignments: ISubmissionAssignment[]) => (this.submissionAssignmentsSharedCollection = submissionAssignments));

    this.studentService
      .query()
      .pipe(map((res: HttpResponse<IStudent[]>) => res.body ?? []))
      .pipe(
        map((students: IStudent[]) => this.studentService.addStudentToCollectionIfMissing<IStudent>(students, this.notification?.student)),
      )
      .subscribe((students: IStudent[]) => (this.studentsSharedCollection = students));

    this.teacherService
      .query()
      .pipe(map((res: HttpResponse<ITeacher[]>) => res.body ?? []))
      .pipe(
        map((teachers: ITeacher[]) => this.teacherService.addTeacherToCollectionIfMissing<ITeacher>(teachers, this.notification?.teacher)),
      )
      .subscribe((teachers: ITeacher[]) => (this.teachersSharedCollection = teachers));
  }
}
