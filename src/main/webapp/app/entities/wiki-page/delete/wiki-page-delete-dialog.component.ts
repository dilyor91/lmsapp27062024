import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IWikiPage } from '../wiki-page.model';
import { WikiPageService } from '../service/wiki-page.service';

@Component({
  standalone: true,
  templateUrl: './wiki-page-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class WikiPageDeleteDialogComponent {
  wikiPage?: IWikiPage;

  protected wikiPageService = inject(WikiPageService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.wikiPageService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
