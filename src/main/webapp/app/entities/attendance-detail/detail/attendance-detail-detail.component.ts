import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IAttendanceDetail } from '../attendance-detail.model';

@Component({
  standalone: true,
  selector: 'jhi-attendance-detail-detail',
  templateUrl: './attendance-detail-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class AttendanceDetailDetailComponent {
  attendanceDetail = input<IAttendanceDetail | null>(null);

  previousState(): void {
    window.history.back();
  }
}
