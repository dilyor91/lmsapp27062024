import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { IQuizCourseSection } from '../quiz-course-section.model';

@Component({
  standalone: true,
  selector: 'jhi-quiz-course-section-detail',
  templateUrl: './quiz-course-section-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class QuizCourseSectionDetailComponent {
  quizCourseSection = input<IQuizCourseSection | null>(null);

  previousState(): void {
    window.history.back();
  }
}
