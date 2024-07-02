import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IAssignmentCourseSection } from '../assignment-course-section.model';
import { AssignmentCourseSectionService } from '../service/assignment-course-section.service';

@Component({
  standalone: true,
  templateUrl: './assignment-course-section-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class AssignmentCourseSectionDeleteDialogComponent {
  assignmentCourseSection?: IAssignmentCourseSection;

  protected assignmentCourseSectionService = inject(AssignmentCourseSectionService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.assignmentCourseSectionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
