import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { ICourseWeek } from '../course-week.model';

@Component({
  standalone: true,
  selector: 'jhi-course-week-detail',
  templateUrl: './course-week-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CourseWeekDetailComponent {
  courseWeek = input<ICourseWeek | null>(null);

  previousState(): void {
    window.history.back();
  }
}
