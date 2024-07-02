import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IAssignmentCourseSection } from '../assignment-course-section.model';

@Component({
  standalone: true,
  selector: 'jhi-assignment-course-section-detail',
  templateUrl: './assignment-course-section-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class AssignmentCourseSectionDetailComponent {
  assignmentCourseSection = input<IAssignmentCourseSection | null>(null);

  previousState(): void {
    window.history.back();
  }
}
