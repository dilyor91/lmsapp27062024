import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { IQuestionGroup } from '../question-group.model';
import { QuestionGroupService } from '../service/question-group.service';
import { QuestionGroupFormService, QuestionGroupFormGroup } from './question-group-form.service';

@Component({
  standalone: true,
  selector: 'jhi-question-group-update',
  templateUrl: './question-group-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class QuestionGroupUpdateComponent implements OnInit {
  isSaving = false;
  questionGroup: IQuestionGroup | null = null;

  coursesSharedCollection: ICourse[] = [];

  protected questionGroupService = inject(QuestionGroupService);
  protected questionGroupFormService = inject(QuestionGroupFormService);
  protected courseService = inject(CourseService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: QuestionGroupFormGroup = this.questionGroupFormService.createQuestionGroupFormGroup();

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ questionGroup }) => {
      this.questionGroup = questionGroup;
      if (questionGroup) {
        this.updateForm(questionGroup);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const questionGroup = this.questionGroupFormService.getQuestionGroup(this.editForm);
    if (questionGroup.id !== null) {
      this.subscribeToSaveResponse(this.questionGroupService.update(questionGroup));
    } else {
      this.subscribeToSaveResponse(this.questionGroupService.create(questionGroup));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestionGroup>>): void {
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

  protected updateForm(questionGroup: IQuestionGroup): void {
    this.questionGroup = questionGroup;
    this.questionGroupFormService.resetForm(this.editForm, questionGroup);

    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(
      this.coursesSharedCollection,
      questionGroup.course,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.questionGroup?.course)))
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));
  }
}
