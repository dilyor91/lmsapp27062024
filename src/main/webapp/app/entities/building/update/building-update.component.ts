import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFaculty } from 'app/entities/faculty/faculty.model';
import { FacultyService } from 'app/entities/faculty/service/faculty.service';
import { IBuilding } from '../building.model';
import { BuildingService } from '../service/building.service';
import { BuildingFormGroup, BuildingFormService } from './building-form.service';

@Component({
  standalone: true,
  selector: 'jhi-building-update',
  templateUrl: './building-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class BuildingUpdateComponent implements OnInit {
  isSaving = false;
  building: IBuilding | null = null;

  facultiesSharedCollection: IFaculty[] = [];

  protected buildingService = inject(BuildingService);
  protected buildingFormService = inject(BuildingFormService);
  protected facultyService = inject(FacultyService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: BuildingFormGroup = this.buildingFormService.createBuildingFormGroup();

  compareFaculty = (o1: IFaculty | null, o2: IFaculty | null): boolean => this.facultyService.compareFaculty(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ building }) => {
      this.building = building;
      if (building) {
        this.updateForm(building);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const building = this.buildingFormService.getBuilding(this.editForm);
    if (building.id !== null) {
      this.subscribeToSaveResponse(this.buildingService.update(building));
    } else {
      this.subscribeToSaveResponse(this.buildingService.create(building));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBuilding>>): void {
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

  protected updateForm(building: IBuilding): void {
    this.building = building;
    this.buildingFormService.resetForm(this.editForm, building);

    this.facultiesSharedCollection = this.facultyService.addFacultyToCollectionIfMissing<IFaculty>(
      this.facultiesSharedCollection,
      building.faculty,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.facultyService
      .query()
      .pipe(map((res: HttpResponse<IFaculty[]>) => res.body ?? []))
      .pipe(
        map((faculties: IFaculty[]) => this.facultyService.addFacultyToCollectionIfMissing<IFaculty>(faculties, this.building?.faculty)),
      )
      .subscribe((faculties: IFaculty[]) => (this.facultiesSharedCollection = faculties));
  }
}
