import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IQuizQuestionGroup } from '../quiz-question-group.model';
import { QuizQuestionGroupService } from '../service/quiz-question-group.service';

@Component({
  standalone: true,
  templateUrl: './quiz-question-group-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class QuizQuestionGroupDeleteDialogComponent {
  quizQuestionGroup?: IQuizQuestionGroup;

  protected quizQuestionGroupService = inject(QuizQuestionGroupService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.quizQuestionGroupService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
