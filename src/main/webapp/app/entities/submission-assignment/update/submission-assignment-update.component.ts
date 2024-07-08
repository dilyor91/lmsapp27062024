import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IStudent } from 'app/entities/student/student.model';
import { StudentService } from 'app/entities/student/service/student.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { IAssignment } from 'app/entities/assignment/assignment.model';
import { AssignmentService } from 'app/entities/assignment/service/assignment.service';
import { IAttachment } from 'app/entities/attachment/attachment.model';
import { AttachmentService } from 'app/entities/attachment/service/attachment.service';
import { SubmissionAssignmentService } from '../service/submission-assignment.service';
import { ISubmissionAssignment } from '../submission-assignment.model';
import { SubmissionAssignmentFormService, SubmissionAssignmentFormGroup } from './submission-assignment-form.service';

@Component({
  standalone: true,
  selector: 'jhi-submission-assignment-update',
  templateUrl: './submission-assignment-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SubmissionAssignmentUpdateComponent implements OnInit {
  isSaving = false;
  submissionAssignment: ISubmissionAssignment | null = null;

  studentsSharedCollection: IStudent[] = [];
  coursesSharedCollection: ICourse[] = [];
  assignmentsSharedCollection: IAssignment[] = [];
  attachmentsSharedCollection: IAttachment[] = [];

  protected submissionAssignmentService = inject(SubmissionAssignmentService);
  protected submissionAssignmentFormService = inject(SubmissionAssignmentFormService);
  protected studentService = inject(StudentService);
  protected courseService = inject(CourseService);
  protected assignmentService = inject(AssignmentService);
  protected attachmentService = inject(AttachmentService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SubmissionAssignmentFormGroup = this.submissionAssignmentFormService.createSubmissionAssignmentFormGroup();

  compareStudent = (o1: IStudent | null, o2: IStudent | null): boolean => this.studentService.compareStudent(o1, o2);

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  compareAssignment = (o1: IAssignment | null, o2: IAssignment | null): boolean => this.assignmentService.compareAssignment(o1, o2);

  compareAttachment = (o1: IAttachment | null, o2: IAttachment | null): boolean => this.attachmentService.compareAttachment(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ submissionAssignment }) => {
      this.submissionAssignment = submissionAssignment;
      if (submissionAssignment) {
        this.updateForm(submissionAssignment);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const submissionAssignment = this.submissionAssignmentFormService.getSubmissionAssignment(this.editForm);
    if (submissionAssignment.id !== null) {
      this.subscribeToSaveResponse(this.submissionAssignmentService.update(submissionAssignment));
    } else {
      this.subscribeToSaveResponse(this.submissionAssignmentService.create(submissionAssignment));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubmissionAssignment>>): void {
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

  protected updateForm(submissionAssignment: ISubmissionAssignment): void {
    this.submissionAssignment = submissionAssignment;
    this.submissionAssignmentFormService.resetForm(this.editForm, submissionAssignment);

    this.studentsSharedCollection = this.studentService.addStudentToCollectionIfMissing<IStudent>(
      this.studentsSharedCollection,
      submissionAssignment.student,
    );
    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(
      this.coursesSharedCollection,
      submissionAssignment.course,
    );
    this.assignmentsSharedCollection = this.assignmentService.addAssignmentToCollectionIfMissing<IAssignment>(
      this.assignmentsSharedCollection,
      submissionAssignment.assignment,
    );
    this.attachmentsSharedCollection = this.attachmentService.addAttachmentToCollectionIfMissing<IAttachment>(
      this.attachmentsSharedCollection,
      submissionAssignment.attachment,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.studentService
      .query()
      .pipe(map((res: HttpResponse<IStudent[]>) => res.body ?? []))
      .pipe(
        map((students: IStudent[]) =>
          this.studentService.addStudentToCollectionIfMissing<IStudent>(students, this.submissionAssignment?.student),
        ),
      )
      .subscribe((students: IStudent[]) => (this.studentsSharedCollection = students));

    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(
        map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.submissionAssignment?.course)),
      )
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));

    this.assignmentService
      .query()
      .pipe(map((res: HttpResponse<IAssignment[]>) => res.body ?? []))
      .pipe(
        map((assignments: IAssignment[]) =>
          this.assignmentService.addAssignmentToCollectionIfMissing<IAssignment>(assignments, this.submissionAssignment?.assignment),
        ),
      )
      .subscribe((assignments: IAssignment[]) => (this.assignmentsSharedCollection = assignments));

    this.attachmentService
      .query()
      .pipe(map((res: HttpResponse<IAttachment[]>) => res.body ?? []))
      .pipe(
        map((attachments: IAttachment[]) =>
          this.attachmentService.addAttachmentToCollectionIfMissing<IAttachment>(attachments, this.submissionAssignment?.attachment),
        ),
      )
      .subscribe((attachments: IAttachment[]) => (this.attachmentsSharedCollection = attachments));
  }
}
