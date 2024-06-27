import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IQuiz } from 'app/entities/quiz/quiz.model';
import { QuizService } from 'app/entities/quiz/service/quiz.service';
import { IStudent } from 'app/entities/student/student.model';
import { StudentService } from 'app/entities/student/service/student.service';
import { IQuizSession } from 'app/entities/quiz-session/quiz-session.model';
import { QuizSessionService } from 'app/entities/quiz-session/service/quiz-session.service';
import { QuizResultService } from '../service/quiz-result.service';
import { IQuizResult } from '../quiz-result.model';
import { QuizResultFormService, QuizResultFormGroup } from './quiz-result-form.service';

@Component({
  standalone: true,
  selector: 'jhi-quiz-result-update',
  templateUrl: './quiz-result-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class QuizResultUpdateComponent implements OnInit {
  isSaving = false;
  quizResult: IQuizResult | null = null;

  quizzesSharedCollection: IQuiz[] = [];
  studentsSharedCollection: IStudent[] = [];
  quizSessionsSharedCollection: IQuizSession[] = [];

  protected quizResultService = inject(QuizResultService);
  protected quizResultFormService = inject(QuizResultFormService);
  protected quizService = inject(QuizService);
  protected studentService = inject(StudentService);
  protected quizSessionService = inject(QuizSessionService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: QuizResultFormGroup = this.quizResultFormService.createQuizResultFormGroup();

  compareQuiz = (o1: IQuiz | null, o2: IQuiz | null): boolean => this.quizService.compareQuiz(o1, o2);

  compareStudent = (o1: IStudent | null, o2: IStudent | null): boolean => this.studentService.compareStudent(o1, o2);

  compareQuizSession = (o1: IQuizSession | null, o2: IQuizSession | null): boolean => this.quizSessionService.compareQuizSession(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quizResult }) => {
      this.quizResult = quizResult;
      if (quizResult) {
        this.updateForm(quizResult);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const quizResult = this.quizResultFormService.getQuizResult(this.editForm);
    if (quizResult.id !== null) {
      this.subscribeToSaveResponse(this.quizResultService.update(quizResult));
    } else {
      this.subscribeToSaveResponse(this.quizResultService.create(quizResult));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuizResult>>): void {
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

  protected updateForm(quizResult: IQuizResult): void {
    this.quizResult = quizResult;
    this.quizResultFormService.resetForm(this.editForm, quizResult);

    this.quizzesSharedCollection = this.quizService.addQuizToCollectionIfMissing<IQuiz>(this.quizzesSharedCollection, quizResult.quiz);
    this.studentsSharedCollection = this.studentService.addStudentToCollectionIfMissing<IStudent>(
      this.studentsSharedCollection,
      quizResult.student,
    );
    this.quizSessionsSharedCollection = this.quizSessionService.addQuizSessionToCollectionIfMissing<IQuizSession>(
      this.quizSessionsSharedCollection,
      quizResult.quizSession,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.quizService
      .query()
      .pipe(map((res: HttpResponse<IQuiz[]>) => res.body ?? []))
      .pipe(map((quizzes: IQuiz[]) => this.quizService.addQuizToCollectionIfMissing<IQuiz>(quizzes, this.quizResult?.quiz)))
      .subscribe((quizzes: IQuiz[]) => (this.quizzesSharedCollection = quizzes));

    this.studentService
      .query()
      .pipe(map((res: HttpResponse<IStudent[]>) => res.body ?? []))
      .pipe(
        map((students: IStudent[]) => this.studentService.addStudentToCollectionIfMissing<IStudent>(students, this.quizResult?.student)),
      )
      .subscribe((students: IStudent[]) => (this.studentsSharedCollection = students));

    this.quizSessionService
      .query()
      .pipe(map((res: HttpResponse<IQuizSession[]>) => res.body ?? []))
      .pipe(
        map((quizSessions: IQuizSession[]) =>
          this.quizSessionService.addQuizSessionToCollectionIfMissing<IQuizSession>(quizSessions, this.quizResult?.quizSession),
        ),
      )
      .subscribe((quizSessions: IQuizSession[]) => (this.quizSessionsSharedCollection = quizSessions));
  }
}
