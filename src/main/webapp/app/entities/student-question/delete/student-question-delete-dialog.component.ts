import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IStudentQuestion } from '../student-question.model';
import { StudentQuestionService } from '../service/student-question.service';

@Component({
  standalone: true,
  templateUrl: './student-question-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class StudentQuestionDeleteDialogComponent {
  studentQuestion?: IStudentQuestion;

  protected studentQuestionService = inject(StudentQuestionService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.studentQuestionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
