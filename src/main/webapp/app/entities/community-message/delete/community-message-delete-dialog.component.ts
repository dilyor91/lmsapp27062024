import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICommunityMessage } from '../community-message.model';
import { CommunityMessageService } from '../service/community-message.service';

@Component({
  standalone: true,
  templateUrl: './community-message-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CommunityMessageDeleteDialogComponent {
  communityMessage?: ICommunityMessage;

  protected communityMessageService = inject(CommunityMessageService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.communityMessageService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
