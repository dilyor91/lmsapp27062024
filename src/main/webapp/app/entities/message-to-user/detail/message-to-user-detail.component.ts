import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IMessageToUser } from '../message-to-user.model';

@Component({
  standalone: true,
  selector: 'jhi-message-to-user-detail',
  templateUrl: './message-to-user-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class MessageToUserDetailComponent {
  messageToUser = input<IMessageToUser | null>(null);

  previousState(): void {
    window.history.back();
  }
}
