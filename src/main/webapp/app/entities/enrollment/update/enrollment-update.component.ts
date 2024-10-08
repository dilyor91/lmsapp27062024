import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IStudent } from 'app/entities/student/student.model';
import { StudentService } from 'app/entities/student/service/student.service';
import { ICourseSection } from 'app/entities/course-section/course-section.model';
import { CourseSectionService } from 'app/entities/course-section/service/course-section.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { EnrollmentStatusEnum } from 'app/entities/enumerations/enrollment-status-enum.model';
import { EnrollmentService } from '../service/enrollment.service';
import { IEnrollment } from '../enrollment.model';
import { EnrollmentFormGroup, EnrollmentFormService } from './enrollment-form.service';

@Component({
  standalone: true,
  selector: 'jhi-enrollment-update',
  templateUrl: './enrollment-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class EnrollmentUpdateComponent implements OnInit {
  isSaving = false;
  enrollment: IEnrollment | null = null;
  enrollmentStatusEnumValues = Object.keys(EnrollmentStatusEnum);

  studentsSharedCollection: IStudent[] = [];
  courseSectionsSharedCollection: ICourseSection[] = [];
  coursesSharedCollection: ICourse[] = [];

  protected enrollmentService = inject(EnrollmentService);
  protected enrollmentFormService = inject(EnrollmentFormService);
  protected studentService = inject(StudentService);
  protected courseSectionService = inject(CourseSectionService);
  protected courseService = inject(CourseService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: EnrollmentFormGroup = this.enrollmentFormService.createEnrollmentFormGroup();

  compareStudent = (o1: IStudent | null, o2: IStudent | null): boolean => this.studentService.compareStudent(o1, o2);

  compareCourseSection = (o1: ICourseSection | null, o2: ICourseSection | null): boolean =>
    this.courseSectionService.compareCourseSection(o1, o2);

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ enrollment }) => {
      this.enrollment = enrollment;
      if (enrollment) {
        this.updateForm(enrollment);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const enrollment = this.enrollmentFormService.getEnrollment(this.editForm);
    if (enrollment.id !== null) {
      this.subscribeToSaveResponse(this.enrollmentService.update(enrollment));
    } else {
      this.subscribeToSaveResponse(this.enrollmentService.create(enrollment));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEnrollment>>): void {
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

  protected updateForm(enrollment: IEnrollment): void {
    this.enrollment = enrollment;
    this.enrollmentFormService.resetForm(this.editForm, enrollment);

    this.studentsSharedCollection = this.studentService.addStudentToCollectionIfMissing<IStudent>(
      this.studentsSharedCollection,
      enrollment.student,
    );
    this.courseSectionsSharedCollection = this.courseSectionService.addCourseSectionToCollectionIfMissing<ICourseSection>(
      this.courseSectionsSharedCollection,
      enrollment.courseSection,
    );
    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(
      this.coursesSharedCollection,
      enrollment.course,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.studentService
      .query()
      .pipe(map((res: HttpResponse<IStudent[]>) => res.body ?? []))
      .pipe(
        map((students: IStudent[]) => this.studentService.addStudentToCollectionIfMissing<IStudent>(students, this.enrollment?.student)),
      )
      .subscribe((students: IStudent[]) => (this.studentsSharedCollection = students));

    this.courseSectionService
      .query()
      .pipe(map((res: HttpResponse<ICourseSection[]>) => res.body ?? []))
      .pipe(
        map((courseSections: ICourseSection[]) =>
          this.courseSectionService.addCourseSectionToCollectionIfMissing<ICourseSection>(courseSections, this.enrollment?.courseSection),
        ),
      )
      .subscribe((courseSections: ICourseSection[]) => (this.courseSectionsSharedCollection = courseSections));

    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.enrollment?.course)))
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));
  }
}
