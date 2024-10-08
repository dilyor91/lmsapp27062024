import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { ICommunityCourse } from '../community-course.model';

@Component({
  standalone: true,
  selector: 'jhi-community-course-detail',
  templateUrl: './community-course-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CommunityCourseDetailComponent {
  communityCourse = input<ICommunityCourse | null>(null);

  previousState(): void {
    window.history.back();
  }
}
