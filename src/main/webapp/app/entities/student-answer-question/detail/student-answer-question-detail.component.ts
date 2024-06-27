import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IStudentAnswerQuestion } from '../student-answer-question.model';

@Component({
  standalone: true,
  selector: 'jhi-student-answer-question-detail',
  templateUrl: './student-answer-question-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class StudentAnswerQuestionDetailComponent {
  studentAnswerQuestion = input<IStudentAnswerQuestion | null>(null);

  previousState(): void {
    window.history.back();
  }
}
