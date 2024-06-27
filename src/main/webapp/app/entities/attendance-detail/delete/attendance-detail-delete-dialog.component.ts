import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IAttendanceDetail } from '../attendance-detail.model';
import { AttendanceDetailService } from '../service/attendance-detail.service';

@Component({
  standalone: true,
  templateUrl: './attendance-detail-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class AttendanceDetailDeleteDialogComponent {
  attendanceDetail?: IAttendanceDetail;

  protected attendanceDetailService = inject(AttendanceDetailService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.attendanceDetailService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
