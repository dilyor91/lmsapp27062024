import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IQuizSession } from '../quiz-session.model';
import { QuizSessionService } from '../service/quiz-session.service';

@Component({
  standalone: true,
  templateUrl: './quiz-session-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class QuizSessionDeleteDialogComponent {
  quizSession?: IQuizSession;

  protected quizSessionService = inject(QuizSessionService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.quizSessionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
