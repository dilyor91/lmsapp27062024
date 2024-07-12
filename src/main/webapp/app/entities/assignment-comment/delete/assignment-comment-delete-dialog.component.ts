import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IAssignmentComment } from '../assignment-comment.model';
import { AssignmentCommentService } from '../service/assignment-comment.service';

@Component({
  standalone: true,
  templateUrl: './assignment-comment-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class AssignmentCommentDeleteDialogComponent {
  assignmentComment?: IAssignmentComment;

  protected assignmentCommentService = inject(AssignmentCommentService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.assignmentCommentService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
