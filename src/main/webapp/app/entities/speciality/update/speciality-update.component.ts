import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFaculty } from 'app/entities/faculty/faculty.model';
import { FacultyService } from 'app/entities/faculty/service/faculty.service';
import { ISpeciality } from '../speciality.model';
import { SpecialityService } from '../service/speciality.service';
import { SpecialityFormService, SpecialityFormGroup } from './speciality-form.service';

@Component({
  standalone: true,
  selector: 'jhi-speciality-update',
  templateUrl: './speciality-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SpecialityUpdateComponent implements OnInit {
  isSaving = false;
  speciality: ISpeciality | null = null;

  facultiesSharedCollection: IFaculty[] = [];

  protected specialityService = inject(SpecialityService);
  protected specialityFormService = inject(SpecialityFormService);
  protected facultyService = inject(FacultyService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SpecialityFormGroup = this.specialityFormService.createSpecialityFormGroup();

  compareFaculty = (o1: IFaculty | null, o2: IFaculty | null): boolean => this.facultyService.compareFaculty(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ speciality }) => {
      this.speciality = speciality;
      if (speciality) {
        this.updateForm(speciality);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const speciality = this.specialityFormService.getSpeciality(this.editForm);
    if (speciality.id !== null) {
      this.subscribeToSaveResponse(this.specialityService.update(speciality));
    } else {
      this.subscribeToSaveResponse(this.specialityService.create(speciality));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpeciality>>): void {
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

  protected updateForm(speciality: ISpeciality): void {
    this.speciality = speciality;
    this.specialityFormService.resetForm(this.editForm, speciality);

    this.facultiesSharedCollection = this.facultyService.addFacultyToCollectionIfMissing<IFaculty>(
      this.facultiesSharedCollection,
      speciality.faculty,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.facultyService
      .query()
      .pipe(map((res: HttpResponse<IFaculty[]>) => res.body ?? []))
      .pipe(
        map((faculties: IFaculty[]) => this.facultyService.addFacultyToCollectionIfMissing<IFaculty>(faculties, this.speciality?.faculty)),
      )
      .subscribe((faculties: IFaculty[]) => (this.facultiesSharedCollection = faculties));
  }
}
