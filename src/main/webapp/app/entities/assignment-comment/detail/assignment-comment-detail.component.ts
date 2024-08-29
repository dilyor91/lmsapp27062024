import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IAssignmentComment } from '../assignment-comment.model';

@Component({
  standalone: true,
  selector: 'jhi-assignment-comment-detail',
  templateUrl: './assignment-comment-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class AssignmentCommentDetailComponent {
  assignmentComment = input<IAssignmentComment | null>(null);

  previousState(): void {
    window.history.back();
  }
}
