import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IStudentOption } from '../student-option.model';

@Component({
  standalone: true,
  selector: 'jhi-student-option-detail',
  templateUrl: './student-option-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class StudentOptionDetailComponent {
  studentOption = input<IStudentOption | null>(null);

  previousState(): void {
    window.history.back();
  }
}
