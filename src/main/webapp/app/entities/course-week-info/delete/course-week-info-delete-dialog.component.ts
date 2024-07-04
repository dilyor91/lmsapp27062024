import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICourseWeekInfo } from '../course-week-info.model';
import { CourseWeekInfoService } from '../service/course-week-info.service';

@Component({
  standalone: true,
  templateUrl: './course-week-info-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CourseWeekInfoDeleteDialogComponent {
  courseWeekInfo?: ICourseWeekInfo;

  protected courseWeekInfoService = inject(CourseWeekInfoService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.courseWeekInfoService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
