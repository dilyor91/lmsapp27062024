import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ISubmissionAssignment } from '../submission-assignment.model';
import { SubmissionAssignmentService } from '../service/submission-assignment.service';

@Component({
  standalone: true,
  templateUrl: './submission-assignment-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class SubmissionAssignmentDeleteDialogComponent {
  submissionAssignment?: ISubmissionAssignment;

  protected submissionAssignmentService = inject(SubmissionAssignmentService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.submissionAssignmentService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
