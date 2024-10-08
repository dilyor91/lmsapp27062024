import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICommunity } from '../community.model';
import { CommunityService } from '../service/community.service';

@Component({
  standalone: true,
  templateUrl: './community-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CommunityDeleteDialogComponent {
  community?: ICommunity;

  protected communityService = inject(CommunityService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.communityService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
