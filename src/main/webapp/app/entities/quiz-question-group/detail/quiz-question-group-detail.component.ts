import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IQuizQuestionGroup } from '../quiz-question-group.model';

@Component({
  standalone: true,
  selector: 'jhi-quiz-question-group-detail',
  templateUrl: './quiz-question-group-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class QuizQuestionGroupDetailComponent {
  quizQuestionGroup = input<IQuizQuestionGroup | null>(null);

  previousState(): void {
    window.history.back();
  }
}
