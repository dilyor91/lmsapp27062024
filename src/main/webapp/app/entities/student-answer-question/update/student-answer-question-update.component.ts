import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IQuestion } from 'app/entities/question/question.model';
import { QuestionService } from 'app/entities/question/service/question.service';
import { IOption } from 'app/entities/option/option.model';
import { OptionService } from 'app/entities/option/service/option.service';
import { IQuizSession } from 'app/entities/quiz-session/quiz-session.model';
import { QuizSessionService } from 'app/entities/quiz-session/service/quiz-session.service';
import { StudentAnswerQuestionService } from '../service/student-answer-question.service';
import { IStudentAnswerQuestion } from '../student-answer-question.model';
import { StudentAnswerQuestionFormService, StudentAnswerQuestionFormGroup } from './student-answer-question-form.service';

@Component({
  standalone: true,
  selector: 'jhi-student-answer-question-update',
  templateUrl: './student-answer-question-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class StudentAnswerQuestionUpdateComponent implements OnInit {
  isSaving = false;
  studentAnswerQuestion: IStudentAnswerQuestion | null = null;

  questionsSharedCollection: IQuestion[] = [];
  optionsSharedCollection: IOption[] = [];
  quizSessionsSharedCollection: IQuizSession[] = [];

  protected studentAnswerQuestionService = inject(StudentAnswerQuestionService);
  protected studentAnswerQuestionFormService = inject(StudentAnswerQuestionFormService);
  protected questionService = inject(QuestionService);
  protected optionService = inject(OptionService);
  protected quizSessionService = inject(QuizSessionService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: StudentAnswerQuestionFormGroup = this.studentAnswerQuestionFormService.createStudentAnswerQuestionFormGroup();

  compareQuestion = (o1: IQuestion | null, o2: IQuestion | null): boolean => this.questionService.compareQuestion(o1, o2);

  compareOption = (o1: IOption | null, o2: IOption | null): boolean => this.optionService.compareOption(o1, o2);

  compareQuizSession = (o1: IQuizSession | null, o2: IQuizSession | null): boolean => this.quizSessionService.compareQuizSession(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ studentAnswerQuestion }) => {
      this.studentAnswerQuestion = studentAnswerQuestion;
      if (studentAnswerQuestion) {
        this.updateForm(studentAnswerQuestion);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const studentAnswerQuestion = this.studentAnswerQuestionFormService.getStudentAnswerQuestion(this.editForm);
    if (studentAnswerQuestion.id !== null) {
      this.subscribeToSaveResponse(this.studentAnswerQuestionService.update(studentAnswerQuestion));
    } else {
      this.subscribeToSaveResponse(this.studentAnswerQuestionService.create(studentAnswerQuestion));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudentAnswerQuestion>>): void {
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

  protected updateForm(studentAnswerQuestion: IStudentAnswerQuestion): void {
    this.studentAnswerQuestion = studentAnswerQuestion;
    this.studentAnswerQuestionFormService.resetForm(this.editForm, studentAnswerQuestion);

    this.questionsSharedCollection = this.questionService.addQuestionToCollectionIfMissing<IQuestion>(
      this.questionsSharedCollection,
      studentAnswerQuestion.question,
    );
    this.optionsSharedCollection = this.optionService.addOptionToCollectionIfMissing<IOption>(
      this.optionsSharedCollection,
      studentAnswerQuestion.option,
    );
    this.quizSessionsSharedCollection = this.quizSessionService.addQuizSessionToCollectionIfMissing<IQuizSession>(
      this.quizSessionsSharedCollection,
      studentAnswerQuestion.quizSession,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.questionService
      .query()
      .pipe(map((res: HttpResponse<IQuestion[]>) => res.body ?? []))
      .pipe(
        map((questions: IQuestion[]) =>
          this.questionService.addQuestionToCollectionIfMissing<IQuestion>(questions, this.studentAnswerQuestion?.question),
        ),
      )
      .subscribe((questions: IQuestion[]) => (this.questionsSharedCollection = questions));

    this.optionService
      .query()
      .pipe(map((res: HttpResponse<IOption[]>) => res.body ?? []))
      .pipe(
        map((options: IOption[]) =>
          this.optionService.addOptionToCollectionIfMissing<IOption>(options, this.studentAnswerQuestion?.option),
        ),
      )
      .subscribe((options: IOption[]) => (this.optionsSharedCollection = options));

    this.quizSessionService
      .query()
      .pipe(map((res: HttpResponse<IQuizSession[]>) => res.body ?? []))
      .pipe(
        map((quizSessions: IQuizSession[]) =>
          this.quizSessionService.addQuizSessionToCollectionIfMissing<IQuizSession>(quizSessions, this.studentAnswerQuestion?.quizSession),
        ),
      )
      .subscribe((quizSessions: IQuizSession[]) => (this.quizSessionsSharedCollection = quizSessions));
  }
}
