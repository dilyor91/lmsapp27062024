import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IStudentQuestion } from '../student-question.model';

@Component({
  standalone: true,
  selector: 'jhi-student-question-detail',
  templateUrl: './student-question-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class StudentQuestionDetailComponent {
  studentQuestion = input<IStudentQuestion | null>(null);

  previousState(): void {
    window.history.back();
  }
}
