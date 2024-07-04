import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ILessonMaterial } from '../lesson-material.model';

@Component({
  standalone: true,
  selector: 'jhi-lesson-material-detail',
  templateUrl: './lesson-material-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class LessonMaterialDetailComponent {
  lessonMaterial = input<ILessonMaterial | null>(null);

  previousState(): void {
    window.history.back();
  }
}
