import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICommunityTag } from '../community-tag.model';
import { CommunityTagService } from '../service/community-tag.service';

@Component({
  standalone: true,
  templateUrl: './community-tag-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CommunityTagDeleteDialogComponent {
  communityTag?: ICommunityTag;

  protected communityTagService = inject(CommunityTagService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.communityTagService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
