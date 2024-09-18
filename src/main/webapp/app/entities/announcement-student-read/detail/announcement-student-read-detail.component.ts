import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IAnnouncementStudentRead } from '../announcement-student-read.model';

@Component({
  standalone: true,
  selector: 'jhi-announcement-student-read-detail',
  templateUrl: './announcement-student-read-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class AnnouncementStudentReadDetailComponent {
  announcementStudentRead = input<IAnnouncementStudentRead | null>(null);

  previousState(): void {
    window.history.back();
  }
}
