import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IStudentQuestion } from 'app/entities/student-question/student-question.model';
import { StudentQuestionService } from 'app/entities/student-question/service/student-question.service';
import { IOption } from 'app/entities/option/option.model';
import { OptionService } from 'app/entities/option/service/option.service';
import { StudentOptionService } from '../service/student-option.service';
import { IStudentOption } from '../student-option.model';
import { StudentOptionFormService, StudentOptionFormGroup } from './student-option-form.service';

@Component({
  standalone: true,
  selector: 'jhi-student-option-update',
  templateUrl: './student-option-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class StudentOptionUpdateComponent implements OnInit {
  isSaving = false;
  studentOption: IStudentOption | null = null;

  studentQuestionsSharedCollection: IStudentQuestion[] = [];
  optionsSharedCollection: IOption[] = [];

  protected studentOptionService = inject(StudentOptionService);
  protected studentOptionFormService = inject(StudentOptionFormService);
  protected studentQuestionService = inject(StudentQuestionService);
  protected optionService = inject(OptionService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: StudentOptionFormGroup = this.studentOptionFormService.createStudentOptionFormGroup();

  compareStudentQuestion = (o1: IStudentQuestion | null, o2: IStudentQuestion | null): boolean =>
    this.studentQuestionService.compareStudentQuestion(o1, o2);

  compareOption = (o1: IOption | null, o2: IOption | null): boolean => this.optionService.compareOption(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ studentOption }) => {
      this.studentOption = studentOption;
      if (studentOption) {
        this.updateForm(studentOption);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const studentOption = this.studentOptionFormService.getStudentOption(this.editForm);
    if (studentOption.id !== null) {
      this.subscribeToSaveResponse(this.studentOptionService.update(studentOption));
    } else {
      this.subscribeToSaveResponse(this.studentOptionService.create(studentOption));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudentOption>>): void {
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

  protected updateForm(studentOption: IStudentOption): void {
    this.studentOption = studentOption;
    this.studentOptionFormService.resetForm(this.editForm, studentOption);

    this.studentQuestionsSharedCollection = this.studentQuestionService.addStudentQuestionToCollectionIfMissing<IStudentQuestion>(
      this.studentQuestionsSharedCollection,
      studentOption.studentQuestion,
    );
    this.optionsSharedCollection = this.optionService.addOptionToCollectionIfMissing<IOption>(
      this.optionsSharedCollection,
      studentOption.option,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.studentQuestionService
      .query()
      .pipe(map((res: HttpResponse<IStudentQuestion[]>) => res.body ?? []))
      .pipe(
        map((studentQuestions: IStudentQuestion[]) =>
          this.studentQuestionService.addStudentQuestionToCollectionIfMissing<IStudentQuestion>(
            studentQuestions,
            this.studentOption?.studentQuestion,
          ),
        ),
      )
      .subscribe((studentQuestions: IStudentQuestion[]) => (this.studentQuestionsSharedCollection = studentQuestions));

    this.optionService
      .query()
      .pipe(map((res: HttpResponse<IOption[]>) => res.body ?? []))
      .pipe(map((options: IOption[]) => this.optionService.addOptionToCollectionIfMissing<IOption>(options, this.studentOption?.option)))
      .subscribe((options: IOption[]) => (this.optionsSharedCollection = options));
  }
}
