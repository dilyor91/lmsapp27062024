import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IAnnouncementStudentRead } from '../announcement-student-read.model';
import { AnnouncementStudentReadService } from '../service/announcement-student-read.service';

@Component({
  standalone: true,
  templateUrl: './announcement-student-read-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class AnnouncementStudentReadDeleteDialogComponent {
  announcementStudentRead?: IAnnouncementStudentRead;

  protected announcementStudentReadService = inject(AnnouncementStudentReadService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.announcementStudentReadService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
