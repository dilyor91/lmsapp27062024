import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IStudyAcademicYear } from 'app/entities/study-academic-year/study-academic-year.model';
import { StudyAcademicYearService } from 'app/entities/study-academic-year/service/study-academic-year.service';
import { IStudyTerm } from '../study-term.model';
import { StudyTermService } from '../service/study-term.service';
import { StudyTermFormGroup, StudyTermFormService } from './study-term-form.service';

@Component({
  standalone: true,
  selector: 'jhi-study-term-update',
  templateUrl: './study-term-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class StudyTermUpdateComponent implements OnInit {
  isSaving = false;
  studyTerm: IStudyTerm | null = null;

  studyAcademicYearsSharedCollection: IStudyAcademicYear[] = [];

  protected studyTermService = inject(StudyTermService);
  protected studyTermFormService = inject(StudyTermFormService);
  protected studyAcademicYearService = inject(StudyAcademicYearService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: StudyTermFormGroup = this.studyTermFormService.createStudyTermFormGroup();

  compareStudyAcademicYear = (o1: IStudyAcademicYear | null, o2: IStudyAcademicYear | null): boolean =>
    this.studyAcademicYearService.compareStudyAcademicYear(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ studyTerm }) => {
      this.studyTerm = studyTerm;
      if (studyTerm) {
        this.updateForm(studyTerm);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const studyTerm = this.studyTermFormService.getStudyTerm(this.editForm);
    if (studyTerm.id !== null) {
      this.subscribeToSaveResponse(this.studyTermService.update(studyTerm));
    } else {
      this.subscribeToSaveResponse(this.studyTermService.create(studyTerm));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudyTerm>>): void {
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

  protected updateForm(studyTerm: IStudyTerm): void {
    this.studyTerm = studyTerm;
    this.studyTermFormService.resetForm(this.editForm, studyTerm);

    this.studyAcademicYearsSharedCollection = this.studyAcademicYearService.addStudyAcademicYearToCollectionIfMissing<IStudyAcademicYear>(
      this.studyAcademicYearsSharedCollection,
      studyTerm.studyAcademicYear,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.studyAcademicYearService
      .query()
      .pipe(map((res: HttpResponse<IStudyAcademicYear[]>) => res.body ?? []))
      .pipe(
        map((studyAcademicYears: IStudyAcademicYear[]) =>
          this.studyAcademicYearService.addStudyAcademicYearToCollectionIfMissing<IStudyAcademicYear>(
            studyAcademicYears,
            this.studyTerm?.studyAcademicYear,
          ),
        ),
      )
      .subscribe((studyAcademicYears: IStudyAcademicYear[]) => (this.studyAcademicYearsSharedCollection = studyAcademicYears));
  }
}
