import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ICalendarEvent } from '../calendar-event.model';

@Component({
  standalone: true,
  selector: 'jhi-calendar-event-detail',
  templateUrl: './calendar-event-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CalendarEventDetailComponent {
  calendarEvent = input<ICalendarEvent | null>(null);

  previousState(): void {
    window.history.back();
  }
}
