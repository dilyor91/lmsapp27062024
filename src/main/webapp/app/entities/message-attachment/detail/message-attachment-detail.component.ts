import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IMessageAttachment } from '../message-attachment.model';

@Component({
  standalone: true,
  selector: 'jhi-message-attachment-detail',
  templateUrl: './message-attachment-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class MessageAttachmentDetailComponent {
  messageAttachment = input<IMessageAttachment | null>(null);

  previousState(): void {
    window.history.back();
  }
}
