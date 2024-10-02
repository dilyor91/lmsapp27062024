import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IMessageToUser } from '../message-to-user.model';
import { MessageToUserService } from '../service/message-to-user.service';

@Component({
  standalone: true,
  templateUrl: './message-to-user-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class MessageToUserDeleteDialogComponent {
  messageToUser?: IMessageToUser;

  protected messageToUserService = inject(MessageToUserService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.messageToUserService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
