import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ILesson } from '../lesson.model';

@Component({
  standalone: true,
  selector: 'jhi-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class LessonDetailComponent {
  lesson = input<ILesson | null>(null);

  previousState(): void {
    window.history.back();
  }
}
