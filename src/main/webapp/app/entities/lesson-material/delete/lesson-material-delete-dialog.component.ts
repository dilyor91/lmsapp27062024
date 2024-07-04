import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ILessonMaterial } from '../lesson-material.model';
import { LessonMaterialService } from '../service/lesson-material.service';

@Component({
  standalone: true,
  templateUrl: './lesson-material-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class LessonMaterialDeleteDialogComponent {
  lessonMaterial?: ILessonMaterial;

  protected lessonMaterialService = inject(LessonMaterialService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.lessonMaterialService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
