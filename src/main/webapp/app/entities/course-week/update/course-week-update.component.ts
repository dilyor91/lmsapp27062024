import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ICourseWeek } from '../course-week.model';
import { CourseWeekService } from '../service/course-week.service';
import { CourseWeekFormService, CourseWeekFormGroup } from './course-week-form.service';

@Component({
  standalone: true,
  selector: 'jhi-course-week-update',
  templateUrl: './course-week-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CourseWeekUpdateComponent implements OnInit {
  isSaving = false;
  courseWeek: ICourseWeek | null = null;

  coursesSharedCollection: ICourse[] = [];

  protected courseWeekService = inject(CourseWeekService);
  protected courseWeekFormService = inject(CourseWeekFormService);
  protected courseService = inject(CourseService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CourseWeekFormGroup = this.courseWeekFormService.createCourseWeekFormGroup();

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ courseWeek }) => {
      this.courseWeek = courseWeek;
      if (courseWeek) {
        this.updateForm(courseWeek);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const courseWeek = this.courseWeekFormService.getCourseWeek(this.editForm);
    if (courseWeek.id !== null) {
      this.subscribeToSaveResponse(this.courseWeekService.update(courseWeek));
    } else {
      this.subscribeToSaveResponse(this.courseWeekService.create(courseWeek));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourseWeek>>): void {
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

  protected updateForm(courseWeek: ICourseWeek): void {
    this.courseWeek = courseWeek;
    this.courseWeekFormService.resetForm(this.editForm, courseWeek);

    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(
      this.coursesSharedCollection,
      courseWeek.course,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.courseWeek?.course)))
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));
  }
}
