import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IAnnouncementCourseSection } from '../announcement-course-section.model';

@Component({
  standalone: true,
  selector: 'jhi-announcement-course-section-detail',
  templateUrl: './announcement-course-section-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class AnnouncementCourseSectionDetailComponent {
  announcementCourseSection = input<IAnnouncementCourseSection | null>(null);

  previousState(): void {
    window.history.back();
  }
}
