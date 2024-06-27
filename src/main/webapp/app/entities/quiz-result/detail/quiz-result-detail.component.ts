import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IQuizResult } from '../quiz-result.model';

@Component({
  standalone: true,
  selector: 'jhi-quiz-result-detail',
  templateUrl: './quiz-result-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class QuizResultDetailComponent {
  quizResult = input<IQuizResult | null>(null);

  previousState(): void {
    window.history.back();
  }
}
