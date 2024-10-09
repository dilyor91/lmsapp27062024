import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICommunityCourse } from '../community-course.model';
import { CommunityCourseService } from '../service/community-course.service';

@Component({
  standalone: true,
  templateUrl: './community-course-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CommunityCourseDeleteDialogComponent {
  communityCourse?: ICommunityCourse;

  protected communityCourseService = inject(CommunityCourseService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.communityCourseService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}