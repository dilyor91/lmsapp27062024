import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IStudent } from 'app/entities/student/student.model';
import { StudentService } from 'app/entities/student/service/student.service';
import { IQuiz } from 'app/entities/quiz/quiz.model';
import { QuizService } from 'app/entities/quiz/service/quiz.service';
import { QuizSessionEnum } from 'app/entities/enumerations/quiz-session-enum.model';
import { QuizSessionService } from '../service/quiz-session.service';
import { IQuizSession } from '../quiz-session.model';
import { QuizSessionFormService, QuizSessionFormGroup } from './quiz-session-form.service';

@Component({
  standalone: true,
  selector: 'jhi-quiz-session-update',
  templateUrl: './quiz-session-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class QuizSessionUpdateComponent implements OnInit {
  isSaving = false;
  quizSession: IQuizSession | null = null;
  quizSessionEnumValues = Object.keys(QuizSessionEnum);

  studentsSharedCollection: IStudent[] = [];
  quizzesSharedCollection: IQuiz[] = [];

  protected quizSessionService = inject(QuizSessionService);
  protected quizSessionFormService = inject(QuizSessionFormService);
  protected studentService = inject(StudentService);
  protected quizService = inject(QuizService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: QuizSessionFormGroup = this.quizSessionFormService.createQuizSessionFormGroup();

  compareStudent = (o1: IStudent | null, o2: IStudent | null): boolean => this.studentService.compareStudent(o1, o2);

  compareQuiz = (o1: IQuiz | null, o2: IQuiz | null): boolean => this.quizService.compareQuiz(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quizSession }) => {
      this.quizSession = quizSession;
      if (quizSession) {
        this.updateForm(quizSession);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const quizSession = this.quizSessionFormService.getQuizSession(this.editForm);
    if (quizSession.id !== null) {
      this.subscribeToSaveResponse(this.quizSessionService.update(quizSession));
    } else {
      this.subscribeToSaveResponse(this.quizSessionService.create(quizSession));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuizSession>>): void {
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

  protected updateForm(quizSession: IQuizSession): void {
    this.quizSession = quizSession;
    this.quizSessionFormService.resetForm(this.editForm, quizSession);

    this.studentsSharedCollection = this.studentService.addStudentToCollectionIfMissing<IStudent>(
      this.studentsSharedCollection,
      quizSession.student,
    );
    this.quizzesSharedCollection = this.quizService.addQuizToCollectionIfMissing<IQuiz>(this.quizzesSharedCollection, quizSession.quiz);
  }

  protected loadRelationshipsOptions(): void {
    this.studentService
      .query()
      .pipe(map((res: HttpResponse<IStudent[]>) => res.body ?? []))
      .pipe(
        map((students: IStudent[]) => this.studentService.addStudentToCollectionIfMissing<IStudent>(students, this.quizSession?.student)),
      )
      .subscribe((students: IStudent[]) => (this.studentsSharedCollection = students));

    this.quizService
      .query()
      .pipe(map((res: HttpResponse<IQuiz[]>) => res.body ?? []))
      .pipe(map((quizzes: IQuiz[]) => this.quizService.addQuizToCollectionIfMissing<IQuiz>(quizzes, this.quizSession?.quiz)))
      .subscribe((quizzes: IQuiz[]) => (this.quizzesSharedCollection = quizzes));
  }
}
