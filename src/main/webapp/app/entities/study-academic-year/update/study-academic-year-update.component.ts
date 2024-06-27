import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IStudyAcademicYear } from '../study-academic-year.model';
import { StudyAcademicYearService } from '../service/study-academic-year.service';
import { StudyAcademicYearFormService, StudyAcademicYearFormGroup } from './study-academic-year-form.service';

@Component({
  standalone: true,
  selector: 'jhi-study-academic-year-update',
  templateUrl: './study-academic-year-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class StudyAcademicYearUpdateComponent implements OnInit {
  isSaving = false;
  studyAcademicYear: IStudyAcademicYear | null = null;

  protected studyAcademicYearService = inject(StudyAcademicYearService);
  protected studyAcademicYearFormService = inject(StudyAcademicYearFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: StudyAcademicYearFormGroup = this.studyAcademicYearFormService.createStudyAcademicYearFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ studyAcademicYear }) => {
      this.studyAcademicYear = studyAcademicYear;
      if (studyAcademicYear) {
        this.updateForm(studyAcademicYear);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const studyAcademicYear = this.studyAcademicYearFormService.getStudyAcademicYear(this.editForm);
    if (studyAcademicYear.id !== null) {
      this.subscribeToSaveResponse(this.studyAcademicYearService.update(studyAcademicYear));
    } else {
      this.subscribeToSaveResponse(this.studyAcademicYearService.create(studyAcademicYear));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudyAcademicYear>>): void {
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

  protected updateForm(studyAcademicYear: IStudyAcademicYear): void {
    this.studyAcademicYear = studyAcademicYear;
    this.studyAcademicYearFormService.resetForm(this.editForm, studyAcademicYear);
  }
}
