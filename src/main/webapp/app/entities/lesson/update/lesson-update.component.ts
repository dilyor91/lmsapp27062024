import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { LessonTypeEnum } from 'app/entities/enumerations/lesson-type-enum.model';
import { LessonService } from '../service/lesson.service';
import { ILesson } from '../lesson.model';
import { LessonFormService, LessonFormGroup } from './lesson-form.service';

@Component({
  standalone: true,
  selector: 'jhi-lesson-update',
  templateUrl: './lesson-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LessonUpdateComponent implements OnInit {
  isSaving = false;
  lesson: ILesson | null = null;
  lessonTypeEnumValues = Object.keys(LessonTypeEnum);

  coursesSharedCollection: ICourse[] = [];

  protected lessonService = inject(LessonService);
  protected lessonFormService = inject(LessonFormService);
  protected courseService = inject(CourseService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LessonFormGroup = this.lessonFormService.createLessonFormGroup();

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ lesson }) => {
      this.lesson = lesson;
      if (lesson) {
        this.updateForm(lesson);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const lesson = this.lessonFormService.getLesson(this.editForm);
    if (lesson.id !== null) {
      this.subscribeToSaveResponse(this.lessonService.update(lesson));
    } else {
      this.subscribeToSaveResponse(this.lessonService.create(lesson));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILesson>>): void {
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

  protected updateForm(lesson: ILesson): void {
    this.lesson = lesson;
    this.lessonFormService.resetForm(this.editForm, lesson);

    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(this.coursesSharedCollection, lesson.course);
  }

  protected loadRelationshipsOptions(): void {
    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.lesson?.course)))
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));
  }
}
