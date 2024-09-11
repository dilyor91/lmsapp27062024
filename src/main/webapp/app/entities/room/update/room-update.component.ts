import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IBuilding } from 'app/entities/building/building.model';
import { BuildingService } from 'app/entities/building/service/building.service';
import { IRoom } from '../room.model';
import { RoomService } from '../service/room.service';
import { RoomFormGroup, RoomFormService } from './room-form.service';

@Component({
  standalone: true,
  selector: 'jhi-room-update',
  templateUrl: './room-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class RoomUpdateComponent implements OnInit {
  isSaving = false;
  room: IRoom | null = null;

  buildingsSharedCollection: IBuilding[] = [];

  protected roomService = inject(RoomService);
  protected roomFormService = inject(RoomFormService);
  protected buildingService = inject(BuildingService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: RoomFormGroup = this.roomFormService.createRoomFormGroup();

  compareBuilding = (o1: IBuilding | null, o2: IBuilding | null): boolean => this.buildingService.compareBuilding(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ room }) => {
      this.room = room;
      if (room) {
        this.updateForm(room);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const room = this.roomFormService.getRoom(this.editForm);
    if (room.id !== null) {
      this.subscribeToSaveResponse(this.roomService.update(room));
    } else {
      this.subscribeToSaveResponse(this.roomService.create(room));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRoom>>): void {
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

  protected updateForm(room: IRoom): void {
    this.room = room;
    this.roomFormService.resetForm(this.editForm, room);

    this.buildingsSharedCollection = this.buildingService.addBuildingToCollectionIfMissing<IBuilding>(
      this.buildingsSharedCollection,
      room.building,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.buildingService
      .query()
      .pipe(map((res: HttpResponse<IBuilding[]>) => res.body ?? []))
      .pipe(
        map((buildings: IBuilding[]) => this.buildingService.addBuildingToCollectionIfMissing<IBuilding>(buildings, this.room?.building)),
      )
      .subscribe((buildings: IBuilding[]) => (this.buildingsSharedCollection = buildings));
  }
}
