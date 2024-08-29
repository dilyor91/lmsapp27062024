import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISubmissionAssignment } from 'app/entities/submission-assignment/submission-assignment.model';
import { SubmissionAssignmentService } from 'app/entities/submission-assignment/service/submission-assignment.service';
import { ITeacher } from 'app/entities/teacher/teacher.model';
import { TeacherService } from 'app/entities/teacher/service/teacher.service';
import { IAssignment } from 'app/entities/assignment/assignment.model';
import { AssignmentService } from 'app/entities/assignment/service/assignment.service';
import { GradeService } from '../service/grade.service';
import { IGrade } from '../grade.model';
import { GradeFormGroup, GradeFormService } from './grade-form.service';

@Component({
  standalone: true,
  selector: 'jhi-grade-update',
  templateUrl: './grade-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class GradeUpdateComponent implements OnInit {
  isSaving = false;
  grade: IGrade | null = null;

  submissionAssignmentsCollection: ISubmissionAssignment[] = [];
  teachersSharedCollection: ITeacher[] = [];
  assignmentsSharedCollection: IAssignment[] = [];

  protected gradeService = inject(GradeService);
  protected gradeFormService = inject(GradeFormService);
  protected submissionAssignmentService = inject(SubmissionAssignmentService);
  protected teacherService = inject(TeacherService);
  protected assignmentService = inject(AssignmentService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: GradeFormGroup = this.gradeFormService.createGradeFormGroup();

  compareSubmissionAssignment = (o1: ISubmissionAssignment | null, o2: ISubmissionAssignment | null): boolean =>
    this.submissionAssignmentService.compareSubmissionAssignment(o1, o2);

  compareTeacher = (o1: ITeacher | null, o2: ITeacher | null): boolean => this.teacherService.compareTeacher(o1, o2);

  compareAssignment = (o1: IAssignment | null, o2: IAssignment | null): boolean => this.assignmentService.compareAssignment(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grade }) => {
      this.grade = grade;
      if (grade) {
        this.updateForm(grade);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const grade = this.gradeFormService.getGrade(this.editForm);
    if (grade.id !== null) {
      this.subscribeToSaveResponse(this.gradeService.update(grade));
    } else {
      this.subscribeToSaveResponse(this.gradeService.create(grade));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrade>>): void {
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

  protected updateForm(grade: IGrade): void {
    this.grade = grade;
    this.gradeFormService.resetForm(this.editForm, grade);

    this.submissionAssignmentsCollection =
      this.submissionAssignmentService.addSubmissionAssignmentToCollectionIfMissing<ISubmissionAssignment>(
        this.submissionAssignmentsCollection,
        grade.submissionAssignment,
      );
    this.teachersSharedCollection = this.teacherService.addTeacherToCollectionIfMissing<ITeacher>(
      this.teachersSharedCollection,
      grade.teacher,
    );
    this.assignmentsSharedCollection = this.assignmentService.addAssignmentToCollectionIfMissing<IAssignment>(
      this.assignmentsSharedCollection,
      grade.assignment,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.submissionAssignmentService
      .query({ filter: 'grade-is-null' })
      .pipe(map((res: HttpResponse<ISubmissionAssignment[]>) => res.body ?? []))
      .pipe(
        map((submissionAssignments: ISubmissionAssignment[]) =>
          this.submissionAssignmentService.addSubmissionAssignmentToCollectionIfMissing<ISubmissionAssignment>(
            submissionAssignments,
            this.grade?.submissionAssignment,
          ),
        ),
      )
      .subscribe((submissionAssignments: ISubmissionAssignment[]) => (this.submissionAssignmentsCollection = submissionAssignments));

    this.teacherService
      .query()
      .pipe(map((res: HttpResponse<ITeacher[]>) => res.body ?? []))
      .pipe(map((teachers: ITeacher[]) => this.teacherService.addTeacherToCollectionIfMissing<ITeacher>(teachers, this.grade?.teacher)))
      .subscribe((teachers: ITeacher[]) => (this.teachersSharedCollection = teachers));

    this.assignmentService
      .query()
      .pipe(map((res: HttpResponse<IAssignment[]>) => res.body ?? []))
      .pipe(
        map((assignments: IAssignment[]) =>
          this.assignmentService.addAssignmentToCollectionIfMissing<IAssignment>(assignments, this.grade?.assignment),
        ),
      )
      .subscribe((assignments: IAssignment[]) => (this.assignmentsSharedCollection = assignments));
  }
}
