import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ISubmissionAssignment } from '../submission-assignment.model';

@Component({
  standalone: true,
  selector: 'jhi-submission-assignment-detail',
  templateUrl: './submission-assignment-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class SubmissionAssignmentDetailComponent {
  submissionAssignment = input<ISubmissionAssignment | null>(null);

  previousState(): void {
    window.history.back();
  }
}
