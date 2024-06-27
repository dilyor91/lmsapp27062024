import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IQuizSession } from '../quiz-session.model';

@Component({
  standalone: true,
  selector: 'jhi-quiz-session-detail',
  templateUrl: './quiz-session-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class QuizSessionDetailComponent {
  quizSession = input<IQuizSession | null>(null);

  previousState(): void {
    window.history.back();
  }
}
