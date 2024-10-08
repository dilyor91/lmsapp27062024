import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { ICourseSection } from '../course-section.model';

@Component({
  standalone: true,
  selector: 'jhi-course-section-detail',
  templateUrl: './course-section-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CourseSectionDetailComponent {
  courseSection = input<ICourseSection | null>(null);

  previousState(): void {
    window.history.back();
  }
}
