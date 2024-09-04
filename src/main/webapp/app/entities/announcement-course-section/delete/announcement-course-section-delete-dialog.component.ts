import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IAnnouncementCourseSection } from '../announcement-course-section.model';
import { AnnouncementCourseSectionService } from '../service/announcement-course-section.service';

@Component({
  standalone: true,
  templateUrl: './announcement-course-section-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class AnnouncementCourseSectionDeleteDialogComponent {
  announcementCourseSection?: IAnnouncementCourseSection;

  protected announcementCourseSectionService = inject(AnnouncementCourseSectionService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.announcementCourseSectionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
