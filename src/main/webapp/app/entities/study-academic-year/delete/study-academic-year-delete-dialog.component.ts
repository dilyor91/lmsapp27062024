import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IStudyAcademicYear } from '../study-academic-year.model';
import { StudyAcademicYearService } from '../service/study-academic-year.service';

@Component({
  standalone: true,
  templateUrl: './study-academic-year-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class StudyAcademicYearDeleteDialogComponent {
  studyAcademicYear?: IStudyAcademicYear;

  protected studyAcademicYearService = inject(StudyAcademicYearService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.studyAcademicYearService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
