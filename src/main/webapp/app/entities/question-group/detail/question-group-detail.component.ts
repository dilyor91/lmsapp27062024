import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IQuestionGroup } from '../question-group.model';

@Component({
  standalone: true,
  selector: 'jhi-question-group-detail',
  templateUrl: './question-group-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class QuestionGroupDetailComponent {
  questionGroup = input<IQuestionGroup | null>(null);

  previousState(): void {
    window.history.back();
  }
}
