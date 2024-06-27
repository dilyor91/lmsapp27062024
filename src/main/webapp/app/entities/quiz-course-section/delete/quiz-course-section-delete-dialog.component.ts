import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IQuizCourseSection } from '../quiz-course-section.model';
import { QuizCourseSectionService } from '../service/quiz-course-section.service';

@Component({
  standalone: true,
  templateUrl: './quiz-course-section-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class QuizCourseSectionDeleteDialogComponent {
  quizCourseSection?: IQuizCourseSection;

  protected quizCourseSectionService = inject(QuizCourseSectionService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.quizCourseSectionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
