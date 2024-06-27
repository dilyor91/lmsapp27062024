import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IQuiz } from 'app/entities/quiz/quiz.model';
import { QuizService } from 'app/entities/quiz/service/quiz.service';
import { IQuestionGroup } from 'app/entities/question-group/question-group.model';
import { QuestionGroupService } from 'app/entities/question-group/service/question-group.service';
import { QuizQuestionGroupService } from '../service/quiz-question-group.service';
import { IQuizQuestionGroup } from '../quiz-question-group.model';
import { QuizQuestionGroupFormService, QuizQuestionGroupFormGroup } from './quiz-question-group-form.service';

@Component({
  standalone: true,
  selector: 'jhi-quiz-question-group-update',
  templateUrl: './quiz-question-group-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class QuizQuestionGroupUpdateComponent implements OnInit {
  isSaving = false;
  quizQuestionGroup: IQuizQuestionGroup | null = null;

  quizzesSharedCollection: IQuiz[] = [];
  questionGroupsSharedCollection: IQuestionGroup[] = [];

  protected quizQuestionGroupService = inject(QuizQuestionGroupService);
  protected quizQuestionGroupFormService = inject(QuizQuestionGroupFormService);
  protected quizService = inject(QuizService);
  protected questionGroupService = inject(QuestionGroupService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: QuizQuestionGroupFormGroup = this.quizQuestionGroupFormService.createQuizQuestionGroupFormGroup();

  compareQuiz = (o1: IQuiz | null, o2: IQuiz | null): boolean => this.quizService.compareQuiz(o1, o2);

  compareQuestionGroup = (o1: IQuestionGroup | null, o2: IQuestionGroup | null): boolean =>
    this.questionGroupService.compareQuestionGroup(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quizQuestionGroup }) => {
      this.quizQuestionGroup = quizQuestionGroup;
      if (quizQuestionGroup) {
        this.updateForm(quizQuestionGroup);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const quizQuestionGroup = this.quizQuestionGroupFormService.getQuizQuestionGroup(this.editForm);
    if (quizQuestionGroup.id !== null) {
      this.subscribeToSaveResponse(this.quizQuestionGroupService.update(quizQuestionGroup));
    } else {
      this.subscribeToSaveResponse(this.quizQuestionGroupService.create(quizQuestionGroup));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuizQuestionGroup>>): void {
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

  protected updateForm(quizQuestionGroup: IQuizQuestionGroup): void {
    this.quizQuestionGroup = quizQuestionGroup;
    this.quizQuestionGroupFormService.resetForm(this.editForm, quizQuestionGroup);

    this.quizzesSharedCollection = this.quizService.addQuizToCollectionIfMissing<IQuiz>(
      this.quizzesSharedCollection,
      quizQuestionGroup.quiz,
    );
    this.questionGroupsSharedCollection = this.questionGroupService.addQuestionGroupToCollectionIfMissing<IQuestionGroup>(
      this.questionGroupsSharedCollection,
      quizQuestionGroup.questionGroup,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.quizService
      .query()
      .pipe(map((res: HttpResponse<IQuiz[]>) => res.body ?? []))
      .pipe(map((quizzes: IQuiz[]) => this.quizService.addQuizToCollectionIfMissing<IQuiz>(quizzes, this.quizQuestionGroup?.quiz)))
      .subscribe((quizzes: IQuiz[]) => (this.quizzesSharedCollection = quizzes));

    this.questionGroupService
      .query()
      .pipe(map((res: HttpResponse<IQuestionGroup[]>) => res.body ?? []))
      .pipe(
        map((questionGroups: IQuestionGroup[]) =>
          this.questionGroupService.addQuestionGroupToCollectionIfMissing<IQuestionGroup>(
            questionGroups,
            this.quizQuestionGroup?.questionGroup,
          ),
        ),
      )
      .subscribe((questionGroups: IQuestionGroup[]) => (this.questionGroupsSharedCollection = questionGroups));
  }
}
