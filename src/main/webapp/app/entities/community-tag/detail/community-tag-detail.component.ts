import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { ICommunityTag } from '../community-tag.model';

@Component({
  standalone: true,
  selector: 'jhi-community-tag-detail',
  templateUrl: './community-tag-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CommunityTagDetailComponent {
  communityTag = input<ICommunityTag | null>(null);

  previousState(): void {
    window.history.back();
  }
}
