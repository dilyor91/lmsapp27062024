import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IQuestionGroup } from '../question-group.model';
import { QuestionGroupService } from '../service/question-group.service';

@Component({
  standalone: true,
  templateUrl: './question-group-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class QuestionGroupDeleteDialogComponent {
  questionGroup?: IQuestionGroup;

  protected questionGroupService = inject(QuestionGroupService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.questionGroupService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
