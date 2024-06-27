import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ISpeciality } from '../speciality.model';

@Component({
  standalone: true,
  selector: 'jhi-speciality-detail',
  templateUrl: './speciality-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class SpecialityDetailComponent {
  speciality = input<ISpeciality | null>(null);

  previousState(): void {
    window.history.back();
  }
}
