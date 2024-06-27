import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IQuestion } from 'app/entities/question/question.model';
import { QuestionService } from 'app/entities/question/service/question.service';
import { IOption } from '../option.model';
import { OptionService } from '../service/option.service';
import { OptionFormService, OptionFormGroup } from './option-form.service';

@Component({
  standalone: true,
  selector: 'jhi-option-update',
  templateUrl: './option-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class OptionUpdateComponent implements OnInit {
  isSaving = false;
  option: IOption | null = null;

  questionsSharedCollection: IQuestion[] = [];

  protected optionService = inject(OptionService);
  protected optionFormService = inject(OptionFormService);
  protected questionService = inject(QuestionService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: OptionFormGroup = this.optionFormService.createOptionFormGroup();

  compareQuestion = (o1: IQuestion | null, o2: IQuestion | null): boolean => this.questionService.compareQuestion(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ option }) => {
      this.option = option;
      if (option) {
        this.updateForm(option);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const option = this.optionFormService.getOption(this.editForm);
    if (option.id !== null) {
      this.subscribeToSaveResponse(this.optionService.update(option));
    } else {
      this.subscribeToSaveResponse(this.optionService.create(option));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOption>>): void {
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

  protected updateForm(option: IOption): void {
    this.option = option;
    this.optionFormService.resetForm(this.editForm, option);

    this.questionsSharedCollection = this.questionService.addQuestionToCollectionIfMissing<IQuestion>(
      this.questionsSharedCollection,
      option.question,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.questionService
      .query()
      .pipe(map((res: HttpResponse<IQuestion[]>) => res.body ?? []))
      .pipe(
        map((questions: IQuestion[]) => this.questionService.addQuestionToCollectionIfMissing<IQuestion>(questions, this.option?.question)),
      )
      .subscribe((questions: IQuestion[]) => (this.questionsSharedCollection = questions));
  }
}
