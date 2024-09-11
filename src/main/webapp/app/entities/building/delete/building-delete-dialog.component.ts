import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IBuilding } from '../building.model';
import { BuildingService } from '../service/building.service';

@Component({
  standalone: true,
  templateUrl: './building-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class BuildingDeleteDialogComponent {
  building?: IBuilding;

  protected buildingService = inject(BuildingService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.buildingService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
