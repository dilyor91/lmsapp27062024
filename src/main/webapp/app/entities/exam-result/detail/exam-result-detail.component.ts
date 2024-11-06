import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IExamResult } from '../exam-result.model';

@Component({
  standalone: true,
  selector: 'jhi-exam-result-detail',
  templateUrl: './exam-result-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class ExamResultDetailComponent {
  examResult = input<IExamResult | null>(null);

  previousState(): void {
    window.history.back();
  }
}
