import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IAnnouncement } from '../announcement.model';

@Component({
  standalone: true,
  selector: 'jhi-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class AnnouncementDetailComponent {
  announcement = input<IAnnouncement | null>(null);

  previousState(): void {
    window.history.back();
  }
}
