import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISubmissionAssignment } from 'app/entities/submission-assignment/submission-assignment.model';
import { SubmissionAssignmentService } from 'app/entities/submission-assignment/service/submission-assignment.service';
import { IAssignment } from 'app/entities/assignment/assignment.model';
import { AssignmentService } from 'app/entities/assignment/service/assignment.service';
import { IStudent } from 'app/entities/student/student.model';
import { StudentService } from 'app/entities/student/service/student.service';
import { ITeacher } from 'app/entities/teacher/teacher.model';
import { TeacherService } from 'app/entities/teacher/service/teacher.service';
import { AssignmentCommentService } from '../service/assignment-comment.service';
import { IAssignmentComment } from '../assignment-comment.model';
import { AssignmentCommentFormService, AssignmentCommentFormGroup } from './assignment-comment-form.service';

@Component({
  standalone: true,
  selector: 'jhi-assignment-comment-update',
  templateUrl: './assignment-comment-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AssignmentCommentUpdateComponent implements OnInit {
  isSaving = false;
  assignmentComment: IAssignmentComment | null = null;

  submissionAssignmentsSharedCollection: ISubmissionAssignment[] = [];
  assignmentsSharedCollection: IAssignment[] = [];
  studentsSharedCollection: IStudent[] = [];
  teachersSharedCollection: ITeacher[] = [];

  protected assignmentCommentService = inject(AssignmentCommentService);
  protected assignmentCommentFormService = inject(AssignmentCommentFormService);
  protected submissionAssignmentService = inject(SubmissionAssignmentService);
  protected assignmentService = inject(AssignmentService);
  protected studentService = inject(StudentService);
  protected teacherService = inject(TeacherService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AssignmentCommentFormGroup = this.assignmentCommentFormService.createAssignmentCommentFormGroup();

  compareSubmissionAssignment = (o1: ISubmissionAssignment | null, o2: ISubmissionAssignment | null): boolean =>
    this.submissionAssignmentService.compareSubmissionAssignment(o1, o2);

  compareAssignment = (o1: IAssignment | null, o2: IAssignment | null): boolean => this.assignmentService.compareAssignment(o1, o2);

  compareStudent = (o1: IStudent | null, o2: IStudent | null): boolean => this.studentService.compareStudent(o1, o2);

  compareTeacher = (o1: ITeacher | null, o2: ITeacher | null): boolean => this.teacherService.compareTeacher(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ assignmentComment }) => {
      this.assignmentComment = assignmentComment;
      if (assignmentComment) {
        this.updateForm(assignmentComment);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const assignmentComment = this.assignmentCommentFormService.getAssignmentComment(this.editForm);
    if (assignmentComment.id !== null) {
      this.subscribeToSaveResponse(this.assignmentCommentService.update(assignmentComment));
    } else {
      this.subscribeToSaveResponse(this.assignmentCommentService.create(assignmentComment));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAssignmentComment>>): void {
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

  protected updateForm(assignmentComment: IAssignmentComment): void {
    this.assignmentComment = assignmentComment;
    this.assignmentCommentFormService.resetForm(this.editForm, assignmentComment);

    this.submissionAssignmentsSharedCollection =
      this.submissionAssignmentService.addSubmissionAssignmentToCollectionIfMissing<ISubmissionAssignment>(
        this.submissionAssignmentsSharedCollection,
        assignmentComment.submissionAssignment,
      );
    this.assignmentsSharedCollection = this.assignmentService.addAssignmentToCollectionIfMissing<IAssignment>(
      this.assignmentsSharedCollection,
      assignmentComment.assignment,
    );
    this.studentsSharedCollection = this.studentService.addStudentToCollectionIfMissing<IStudent>(
      this.studentsSharedCollection,
      assignmentComment.student,
    );
    this.teachersSharedCollection = this.teacherService.addTeacherToCollectionIfMissing<ITeacher>(
      this.teachersSharedCollection,
      assignmentComment.teacher,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.submissionAssignmentService
      .query()
      .pipe(map((res: HttpResponse<ISubmissionAssignment[]>) => res.body ?? []))
      .pipe(
        map((submissionAssignments: ISubmissionAssignment[]) =>
          this.submissionAssignmentService.addSubmissionAssignmentToCollectionIfMissing<ISubmissionAssignment>(
            submissionAssignments,
            this.assignmentComment?.submissionAssignment,
          ),
        ),
      )
      .subscribe((submissionAssignments: ISubmissionAssignment[]) => (this.submissionAssignmentsSharedCollection = submissionAssignments));

    this.assignmentService
      .query()
      .pipe(map((res: HttpResponse<IAssignment[]>) => res.body ?? []))
      .pipe(
        map((assignments: IAssignment[]) =>
          this.assignmentService.addAssignmentToCollectionIfMissing<IAssignment>(assignments, this.assignmentComment?.assignment),
        ),
      )
      .subscribe((assignments: IAssignment[]) => (this.assignmentsSharedCollection = assignments));

    this.studentService
      .query()
      .pipe(map((res: HttpResponse<IStudent[]>) => res.body ?? []))
      .pipe(
        map((students: IStudent[]) =>
          this.studentService.addStudentToCollectionIfMissing<IStudent>(students, this.assignmentComment?.student),
        ),
      )
      .subscribe((students: IStudent[]) => (this.studentsSharedCollection = students));

    this.teacherService
      .query()
      .pipe(map((res: HttpResponse<ITeacher[]>) => res.body ?? []))
      .pipe(
        map((teachers: ITeacher[]) =>
          this.teacherService.addTeacherToCollectionIfMissing<ITeacher>(teachers, this.assignmentComment?.teacher),
        ),
      )
      .subscribe((teachers: ITeacher[]) => (this.teachersSharedCollection = teachers));
  }
}
