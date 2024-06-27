import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ICourseSection } from 'app/entities/course-section/course-section.model';
import { CourseSectionService } from 'app/entities/course-section/service/course-section.service';
import { SubmissionTypeEnum } from 'app/entities/enumerations/submission-type-enum.model';
import { AssignmentService } from '../service/assignment.service';
import { IAssignment } from '../assignment.model';
import { AssignmentFormService, AssignmentFormGroup } from './assignment-form.service';

@Component({
  standalone: true,
  selector: 'jhi-assignment-update',
  templateUrl: './assignment-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AssignmentUpdateComponent implements OnInit {
  isSaving = false;
  assignment: IAssignment | null = null;
  submissionTypeEnumValues = Object.keys(SubmissionTypeEnum);

  coursesSharedCollection: ICourse[] = [];
  courseSectionsSharedCollection: ICourseSection[] = [];

  protected assignmentService = inject(AssignmentService);
  protected assignmentFormService = inject(AssignmentFormService);
  protected courseService = inject(CourseService);
  protected courseSectionService = inject(CourseSectionService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AssignmentFormGroup = this.assignmentFormService.createAssignmentFormGroup();

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  compareCourseSection = (o1: ICourseSection | null, o2: ICourseSection | null): boolean =>
    this.courseSectionService.compareCourseSection(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ assignment }) => {
      this.assignment = assignment;
      if (assignment) {
        this.updateForm(assignment);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const assignment = this.assignmentFormService.getAssignment(this.editForm);
    if (assignment.id !== null) {
      this.subscribeToSaveResponse(this.assignmentService.update(assignment));
    } else {
      this.subscribeToSaveResponse(this.assignmentService.create(assignment));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAssignment>>): void {
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

  protected updateForm(assignment: IAssignment): void {
    this.assignment = assignment;
    this.assignmentFormService.resetForm(this.editForm, assignment);

    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(
      this.coursesSharedCollection,
      assignment.course,
    );
    this.courseSectionsSharedCollection = this.courseSectionService.addCourseSectionToCollectionIfMissing<ICourseSection>(
      this.courseSectionsSharedCollection,
      ...(assignment.courseSections ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.assignment?.course)))
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));

    this.courseSectionService
      .query()
      .pipe(map((res: HttpResponse<ICourseSection[]>) => res.body ?? []))
      .pipe(
        map((courseSections: ICourseSection[]) =>
          this.courseSectionService.addCourseSectionToCollectionIfMissing<ICourseSection>(
            courseSections,
            ...(this.assignment?.courseSections ?? []),
          ),
        ),
      )
      .subscribe((courseSections: ICourseSection[]) => (this.courseSectionsSharedCollection = courseSections));
  }
}
