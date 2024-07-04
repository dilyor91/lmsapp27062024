import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ICourseWeekInfo } from '../course-week-info.model';
import { CourseWeekInfoService } from '../service/course-week-info.service';
import { CourseWeekInfoFormService, CourseWeekInfoFormGroup } from './course-week-info-form.service';

@Component({
  standalone: true,
  selector: 'jhi-course-week-info-update',
  templateUrl: './course-week-info-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CourseWeekInfoUpdateComponent implements OnInit {
  isSaving = false;
  courseWeekInfo: ICourseWeekInfo | null = null;

  coursesCollection: ICourse[] = [];

  protected courseWeekInfoService = inject(CourseWeekInfoService);
  protected courseWeekInfoFormService = inject(CourseWeekInfoFormService);
  protected courseService = inject(CourseService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CourseWeekInfoFormGroup = this.courseWeekInfoFormService.createCourseWeekInfoFormGroup();

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ courseWeekInfo }) => {
      this.courseWeekInfo = courseWeekInfo;
      if (courseWeekInfo) {
        this.updateForm(courseWeekInfo);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const courseWeekInfo = this.courseWeekInfoFormService.getCourseWeekInfo(this.editForm);
    if (courseWeekInfo.id !== null) {
      this.subscribeToSaveResponse(this.courseWeekInfoService.update(courseWeekInfo));
    } else {
      this.subscribeToSaveResponse(this.courseWeekInfoService.create(courseWeekInfo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourseWeekInfo>>): void {
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

  protected updateForm(courseWeekInfo: ICourseWeekInfo): void {
    this.courseWeekInfo = courseWeekInfo;
    this.courseWeekInfoFormService.resetForm(this.editForm, courseWeekInfo);

    this.coursesCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(this.coursesCollection, courseWeekInfo.course);
  }

  protected loadRelationshipsOptions(): void {
    this.courseService
      .query({ filter: 'courseweekinfo-is-null' })
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.courseWeekInfo?.course)))
      .subscribe((courses: ICourse[]) => (this.coursesCollection = courses));
  }
}
