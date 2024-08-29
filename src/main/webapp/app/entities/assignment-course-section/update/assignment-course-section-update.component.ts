import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAssignment } from 'app/entities/assignment/assignment.model';
import { AssignmentService } from 'app/entities/assignment/service/assignment.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ICourseSection } from 'app/entities/course-section/course-section.model';
import { CourseSectionService } from 'app/entities/course-section/service/course-section.service';
import { AssignmentCourseSectionService } from '../service/assignment-course-section.service';
import { IAssignmentCourseSection } from '../assignment-course-section.model';
import { AssignmentCourseSectionFormGroup, AssignmentCourseSectionFormService } from './assignment-course-section-form.service';

@Component({
  standalone: true,
  selector: 'jhi-assignment-course-section-update',
  templateUrl: './assignment-course-section-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AssignmentCourseSectionUpdateComponent implements OnInit {
  isSaving = false;
  assignmentCourseSection: IAssignmentCourseSection | null = null;

  assignmentsSharedCollection: IAssignment[] = [];
  coursesSharedCollection: ICourse[] = [];
  courseSectionsSharedCollection: ICourseSection[] = [];

  protected assignmentCourseSectionService = inject(AssignmentCourseSectionService);
  protected assignmentCourseSectionFormService = inject(AssignmentCourseSectionFormService);
  protected assignmentService = inject(AssignmentService);
  protected courseService = inject(CourseService);
  protected courseSectionService = inject(CourseSectionService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AssignmentCourseSectionFormGroup = this.assignmentCourseSectionFormService.createAssignmentCourseSectionFormGroup();

  compareAssignment = (o1: IAssignment | null, o2: IAssignment | null): boolean => this.assignmentService.compareAssignment(o1, o2);

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  compareCourseSection = (o1: ICourseSection | null, o2: ICourseSection | null): boolean =>
    this.courseSectionService.compareCourseSection(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ assignmentCourseSection }) => {
      this.assignmentCourseSection = assignmentCourseSection;
      if (assignmentCourseSection) {
        this.updateForm(assignmentCourseSection);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const assignmentCourseSection = this.assignmentCourseSectionFormService.getAssignmentCourseSection(this.editForm);
    if (assignmentCourseSection.id !== null) {
      this.subscribeToSaveResponse(this.assignmentCourseSectionService.update(assignmentCourseSection));
    } else {
      this.subscribeToSaveResponse(this.assignmentCourseSectionService.create(assignmentCourseSection));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAssignmentCourseSection>>): void {
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

  protected updateForm(assignmentCourseSection: IAssignmentCourseSection): void {
    this.assignmentCourseSection = assignmentCourseSection;
    this.assignmentCourseSectionFormService.resetForm(this.editForm, assignmentCourseSection);

    this.assignmentsSharedCollection = this.assignmentService.addAssignmentToCollectionIfMissing<IAssignment>(
      this.assignmentsSharedCollection,
      assignmentCourseSection.assignment,
    );
    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(
      this.coursesSharedCollection,
      assignmentCourseSection.course,
    );
    this.courseSectionsSharedCollection = this.courseSectionService.addCourseSectionToCollectionIfMissing<ICourseSection>(
      this.courseSectionsSharedCollection,
      assignmentCourseSection.courseSection,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.assignmentService
      .query()
      .pipe(map((res: HttpResponse<IAssignment[]>) => res.body ?? []))
      .pipe(
        map((assignments: IAssignment[]) =>
          this.assignmentService.addAssignmentToCollectionIfMissing<IAssignment>(assignments, this.assignmentCourseSection?.assignment),
        ),
      )
      .subscribe((assignments: IAssignment[]) => (this.assignmentsSharedCollection = assignments));

    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(
        map((courses: ICourse[]) =>
          this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.assignmentCourseSection?.course),
        ),
      )
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));

    this.courseSectionService
      .query()
      .pipe(map((res: HttpResponse<ICourseSection[]>) => res.body ?? []))
      .pipe(
        map((courseSections: ICourseSection[]) =>
          this.courseSectionService.addCourseSectionToCollectionIfMissing<ICourseSection>(
            courseSections,
            this.assignmentCourseSection?.courseSection,
          ),
        ),
      )
      .subscribe((courseSections: ICourseSection[]) => (this.courseSectionsSharedCollection = courseSections));
  }
}
