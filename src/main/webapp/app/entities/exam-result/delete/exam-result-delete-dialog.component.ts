import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IExamResult } from '../exam-result.model';
import { ExamResultService } from '../service/exam-result.service';

@Component({
  standalone: true,
  templateUrl: './exam-result-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ExamResultDeleteDialogComponent {
  examResult?: IExamResult;

  protected examResultService = inject(ExamResultService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.examResultService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
