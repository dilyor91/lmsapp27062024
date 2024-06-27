import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IQuizSession } from 'app/entities/quiz-session/quiz-session.model';
import { QuizSessionService } from 'app/entities/quiz-session/service/quiz-session.service';
import { IQuestion } from 'app/entities/question/question.model';
import { QuestionService } from 'app/entities/question/service/question.service';
import { StudentQuestionService } from '../service/student-question.service';
import { IStudentQuestion } from '../student-question.model';
import { StudentQuestionFormService, StudentQuestionFormGroup } from './student-question-form.service';

@Component({
  standalone: true,
  selector: 'jhi-student-question-update',
  templateUrl: './student-question-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class StudentQuestionUpdateComponent implements OnInit {
  isSaving = false;
  studentQuestion: IStudentQuestion | null = null;

  quizSessionsSharedCollection: IQuizSession[] = [];
  questionsSharedCollection: IQuestion[] = [];

  protected studentQuestionService = inject(StudentQuestionService);
  protected studentQuestionFormService = inject(StudentQuestionFormService);
  protected quizSessionService = inject(QuizSessionService);
  protected questionService = inject(QuestionService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: StudentQuestionFormGroup = this.studentQuestionFormService.createStudentQuestionFormGroup();

  compareQuizSession = (o1: IQuizSession | null, o2: IQuizSession | null): boolean => this.quizSessionService.compareQuizSession(o1, o2);

  compareQuestion = (o1: IQuestion | null, o2: IQuestion | null): boolean => this.questionService.compareQuestion(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ studentQuestion }) => {
      this.studentQuestion = studentQuestion;
      if (studentQuestion) {
        this.updateForm(studentQuestion);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const studentQuestion = this.studentQuestionFormService.getStudentQuestion(this.editForm);
    if (studentQuestion.id !== null) {
      this.subscribeToSaveResponse(this.studentQuestionService.update(studentQuestion));
    } else {
      this.subscribeToSaveResponse(this.studentQuestionService.create(studentQuestion));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudentQuestion>>): void {
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

  protected updateForm(studentQuestion: IStudentQuestion): void {
    this.studentQuestion = studentQuestion;
    this.studentQuestionFormService.resetForm(this.editForm, studentQuestion);

    this.quizSessionsSharedCollection = this.quizSessionService.addQuizSessionToCollectionIfMissing<IQuizSession>(
      this.quizSessionsSharedCollection,
      studentQuestion.quizSession,
    );
    this.questionsSharedCollection = this.questionService.addQuestionToCollectionIfMissing<IQuestion>(
      this.questionsSharedCollection,
      studentQuestion.question,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.quizSessionService
      .query()
      .pipe(map((res: HttpResponse<IQuizSession[]>) => res.body ?? []))
      .pipe(
        map((quizSessions: IQuizSession[]) =>
          this.quizSessionService.addQuizSessionToCollectionIfMissing<IQuizSession>(quizSessions, this.studentQuestion?.quizSession),
        ),
      )
      .subscribe((quizSessions: IQuizSession[]) => (this.quizSessionsSharedCollection = quizSessions));

    this.questionService
      .query()
      .pipe(map((res: HttpResponse<IQuestion[]>) => res.body ?? []))
      .pipe(
        map((questions: IQuestion[]) =>
          this.questionService.addQuestionToCollectionIfMissing<IQuestion>(questions, this.studentQuestion?.question),
        ),
      )
      .subscribe((questions: IQuestion[]) => (this.questionsSharedCollection = questions));
  }
}
