import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IStudyTerm } from '../study-term.model';

@Component({
  standalone: true,
  selector: 'jhi-study-term-detail',
  templateUrl: './study-term-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class StudyTermDetailComponent {
  studyTerm = input<IStudyTerm | null>(null);

  previousState(): void {
    window.history.back();
  }
}
