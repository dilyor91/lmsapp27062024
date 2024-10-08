import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { ICommunity } from '../community.model';

@Component({
  standalone: true,
  selector: 'jhi-community-detail',
  templateUrl: './community-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CommunityDetailComponent {
  community = input<ICommunity | null>(null);

  previousState(): void {
    window.history.back();
  }
}
