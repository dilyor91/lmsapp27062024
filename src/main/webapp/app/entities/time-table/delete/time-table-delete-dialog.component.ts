import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITimeTable } from '../time-table.model';
import { TimeTableService } from '../service/time-table.service';

@Component({
  standalone: true,
  templateUrl: './time-table-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TimeTableDeleteDialogComponent {
  timeTable?: ITimeTable;

  protected timeTableService = inject(TimeTableService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.timeTableService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
