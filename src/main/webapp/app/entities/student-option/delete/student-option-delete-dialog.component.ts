import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IStudentOption } from '../student-option.model';
import { StudentOptionService } from '../service/student-option.service';

@Component({
  standalone: true,
  templateUrl: './student-option-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class StudentOptionDeleteDialogComponent {
  studentOption?: IStudentOption;

  protected studentOptionService = inject(StudentOptionService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.studentOptionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
