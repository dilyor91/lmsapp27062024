import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IMessageAttachment } from '../message-attachment.model';
import { MessageAttachmentService } from '../service/message-attachment.service';

@Component({
  standalone: true,
  templateUrl: './message-attachment-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class MessageAttachmentDeleteDialogComponent {
  messageAttachment?: IMessageAttachment;

  protected messageAttachmentService = inject(MessageAttachmentService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.messageAttachmentService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
