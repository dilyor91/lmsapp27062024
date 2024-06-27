import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IFaculty } from '../faculty.model';
import { FacultyService } from '../service/faculty.service';

@Component({
  standalone: true,
  templateUrl: './faculty-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class FacultyDeleteDialogComponent {
  faculty?: IFaculty;

  protected facultyService = inject(FacultyService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.facultyService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
