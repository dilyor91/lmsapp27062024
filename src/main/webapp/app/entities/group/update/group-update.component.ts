import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISpeciality } from 'app/entities/speciality/speciality.model';
import { SpecialityService } from 'app/entities/speciality/service/speciality.service';
import { IGroup } from '../group.model';
import { GroupService } from '../service/group.service';
import { GroupFormService, GroupFormGroup } from './group-form.service';

@Component({
  standalone: true,
  selector: 'jhi-group-update',
  templateUrl: './group-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class GroupUpdateComponent implements OnInit {
  isSaving = false;
  group: IGroup | null = null;

  specialitiesSharedCollection: ISpeciality[] = [];

  protected groupService = inject(GroupService);
  protected groupFormService = inject(GroupFormService);
  protected specialityService = inject(SpecialityService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: GroupFormGroup = this.groupFormService.createGroupFormGroup();

  compareSpeciality = (o1: ISpeciality | null, o2: ISpeciality | null): boolean => this.specialityService.compareSpeciality(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ group }) => {
      this.group = group;
      if (group) {
        this.updateForm(group);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const group = this.groupFormService.getGroup(this.editForm);
    if (group.id !== null) {
      this.subscribeToSaveResponse(this.groupService.update(group));
    } else {
      this.subscribeToSaveResponse(this.groupService.create(group));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroup>>): void {
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

  protected updateForm(group: IGroup): void {
    this.group = group;
    this.groupFormService.resetForm(this.editForm, group);

    this.specialitiesSharedCollection = this.specialityService.addSpecialityToCollectionIfMissing<ISpeciality>(
      this.specialitiesSharedCollection,
      group.speciality,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.specialityService
      .query()
      .pipe(map((res: HttpResponse<ISpeciality[]>) => res.body ?? []))
      .pipe(
        map((specialities: ISpeciality[]) =>
          this.specialityService.addSpecialityToCollectionIfMissing<ISpeciality>(specialities, this.group?.speciality),
        ),
      )
      .subscribe((specialities: ISpeciality[]) => (this.specialitiesSharedCollection = specialities));
  }
}
