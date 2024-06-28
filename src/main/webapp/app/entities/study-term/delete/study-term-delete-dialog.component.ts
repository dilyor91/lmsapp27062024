import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IStudyTerm } from '../study-term.model';
import { StudyTermService } from '../service/study-term.service';

@Component({
  standalone: true,
  templateUrl: './study-term-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class StudyTermDeleteDialogComponent {
  studyTerm?: IStudyTerm;

  protected studyTermService = inject(StudyTermService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.studyTermService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
