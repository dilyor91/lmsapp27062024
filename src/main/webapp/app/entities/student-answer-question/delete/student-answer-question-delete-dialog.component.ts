import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IStudentAnswerQuestion } from '../student-answer-question.model';
import { StudentAnswerQuestionService } from '../service/student-answer-question.service';

@Component({
  standalone: true,
  templateUrl: './student-answer-question-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class StudentAnswerQuestionDeleteDialogComponent {
  studentAnswerQuestion?: IStudentAnswerQuestion;

  protected studentAnswerQuestionService = inject(StudentAnswerQuestionService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.studentAnswerQuestionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
