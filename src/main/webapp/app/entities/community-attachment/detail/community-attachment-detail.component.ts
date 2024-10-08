import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { ICommunityAttachment } from '../community-attachment.model';

@Component({
  standalone: true,
  selector: 'jhi-community-attachment-detail',
  templateUrl: './community-attachment-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CommunityAttachmentDetailComponent {
  communityAttachment = input<ICommunityAttachment | null>(null);

  previousState(): void {
    window.history.back();
  }
}
