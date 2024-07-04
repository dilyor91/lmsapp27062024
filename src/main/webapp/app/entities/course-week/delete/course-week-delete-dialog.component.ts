import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICourseWeek } from '../course-week.model';
import { CourseWeekService } from '../service/course-week.service';

@Component({
  standalone: true,
  templateUrl: './course-week-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CourseWeekDeleteDialogComponent {
  courseWeek?: ICourseWeek;

  protected courseWeekService = inject(CourseWeekService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.courseWeekService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
