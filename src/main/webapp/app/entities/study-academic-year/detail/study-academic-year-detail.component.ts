import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IStudyAcademicYear } from '../study-academic-year.model';

@Component({
  standalone: true,
  selector: 'jhi-study-academic-year-detail',
  templateUrl: './study-academic-year-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class StudyAcademicYearDetailComponent {
  studyAcademicYear = input<IStudyAcademicYear | null>(null);

  previousState(): void {
    window.history.back();
  }
}
