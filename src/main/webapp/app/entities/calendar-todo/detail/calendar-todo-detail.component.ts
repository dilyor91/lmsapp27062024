import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { ICalendarTodo } from '../calendar-todo.model';

@Component({
  standalone: true,
  selector: 'jhi-calendar-todo-detail',
  templateUrl: './calendar-todo-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CalendarTodoDetailComponent {
  calendarTodo = input<ICalendarTodo | null>(null);

  previousState(): void {
    window.history.back();
  }
}
