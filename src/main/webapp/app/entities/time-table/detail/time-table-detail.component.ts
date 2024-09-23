import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { ITimeTable } from '../time-table.model';

@Component({
  standalone: true,
  selector: 'jhi-time-table-detail',
  templateUrl: './time-table-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TimeTableDetailComponent {
  timeTable = input<ITimeTable | null>(null);

  previousState(): void {
    window.history.back();
  }
}
