import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IFaculty } from '../faculty.model';

@Component({
  standalone: true,
  selector: 'jhi-faculty-detail',
  templateUrl: './faculty-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class FacultyDetailComponent {
  faculty = input<IFaculty | null>(null);

  previousState(): void {
    window.history.back();
  }
}
