import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { IQuiz } from '../quiz.model';
import { QuizService } from '../service/quiz.service';
import { QuizFormService, QuizFormGroup } from './quiz-form.service';

@Component({
  standalone: true,
  selector: 'jhi-quiz-update',
  templateUrl: './quiz-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class QuizUpdateComponent implements OnInit {
  isSaving = false;
  quiz: IQuiz | null = null;

  coursesSharedCollection: ICourse[] = [];

  protected quizService = inject(QuizService);
  protected quizFormService = inject(QuizFormService);
  protected courseService = inject(CourseService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: QuizFormGroup = this.quizFormService.createQuizFormGroup();

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quiz }) => {
      this.quiz = quiz;
      if (quiz) {
        this.updateForm(quiz);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const quiz = this.quizFormService.getQuiz(this.editForm);
    if (quiz.id !== null) {
      this.subscribeToSaveResponse(this.quizService.update(quiz));
    } else {
      this.subscribeToSaveResponse(this.quizService.create(quiz));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuiz>>): void {
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

  protected updateForm(quiz: IQuiz): void {
    this.quiz = quiz;
    this.quizFormService.resetForm(this.editForm, quiz);

    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(this.coursesSharedCollection, quiz.course);
  }

  protected loadRelationshipsOptions(): void {
    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.quiz?.course)))
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));
  }
}
