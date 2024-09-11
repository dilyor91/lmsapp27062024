import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IBuilding } from '../building.model';

@Component({
  standalone: true,
  selector: 'jhi-building-detail',
  templateUrl: './building-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class BuildingDetailComponent {
  building = input<IBuilding | null>(null);

  previousState(): void {
    window.history.back();
  }
}
