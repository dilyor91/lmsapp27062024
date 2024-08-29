import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { ICourseWeekInfo } from '../course-week-info.model';

@Component({
  standalone: true,
  selector: 'jhi-course-week-info-detail',
  templateUrl: './course-week-info-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CourseWeekInfoDetailComponent {
  courseWeekInfo = input<ICourseWeekInfo | null>(null);

  previousState(): void {
    window.history.back();
  }
}
