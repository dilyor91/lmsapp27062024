import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICommunityAttachment } from '../community-attachment.model';
import { CommunityAttachmentService } from '../service/community-attachment.service';

@Component({
  standalone: true,
  templateUrl: './community-attachment-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CommunityAttachmentDeleteDialogComponent {
  communityAttachment?: ICommunityAttachment;

  protected communityAttachmentService = inject(CommunityAttachmentService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.communityAttachmentService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
