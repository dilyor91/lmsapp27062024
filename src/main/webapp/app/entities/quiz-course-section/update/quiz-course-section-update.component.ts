import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ICourseSection } from 'app/entities/course-section/course-section.model';
import { CourseSectionService } from 'app/entities/course-section/service/course-section.service';
import { IQuiz } from 'app/entities/quiz/quiz.model';
import { QuizService } from 'app/entities/quiz/service/quiz.service';
import { QuizCourseSectionService } from '../service/quiz-course-section.service';
import { IQuizCourseSection } from '../quiz-course-section.model';
import { QuizCourseSectionFormService, QuizCourseSectionFormGroup } from './quiz-course-section-form.service';

@Component({
  standalone: true,
  selector: 'jhi-quiz-course-section-update',
  templateUrl: './quiz-course-section-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class QuizCourseSectionUpdateComponent implements OnInit {
  isSaving = false;
  quizCourseSection: IQuizCourseSection | null = null;

  coursesSharedCollection: ICourse[] = [];
  courseSectionsSharedCollection: ICourseSection[] = [];
  quizzesSharedCollection: IQuiz[] = [];

  protected quizCourseSectionService = inject(QuizCourseSectionService);
  protected quizCourseSectionFormService = inject(QuizCourseSectionFormService);
  protected courseService = inject(CourseService);
  protected courseSectionService = inject(CourseSectionService);
  protected quizService = inject(QuizService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: QuizCourseSectionFormGroup = this.quizCourseSectionFormService.createQuizCourseSectionFormGroup();

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  compareCourseSection = (o1: ICourseSection | null, o2: ICourseSection | null): boolean =>
    this.courseSectionService.compareCourseSection(o1, o2);

  compareQuiz = (o1: IQuiz | null, o2: IQuiz | null): boolean => this.quizService.compareQuiz(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quizCourseSection }) => {
      this.quizCourseSection = quizCourseSection;
      if (quizCourseSection) {
        this.updateForm(quizCourseSection);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const quizCourseSection = this.quizCourseSectionFormService.getQuizCourseSection(this.editForm);
    if (quizCourseSection.id !== null) {
      this.subscribeToSaveResponse(this.quizCourseSectionService.update(quizCourseSection));
    } else {
      this.subscribeToSaveResponse(this.quizCourseSectionService.create(quizCourseSection));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuizCourseSection>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(quizCourseSection: IQuizCourseSection): void {
    this.quizCourseSection = quizCourseSection;
    this.quizCourseSectionFormService.resetForm(this.editForm, quizCourseSection);

    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(
      this.coursesSharedCollection,
      quizCourseSection.course,
    );
    this.courseSectionsSharedCollection = this.courseSectionService.addCourseSectionToCollectionIfMissing<ICourseSection>(
      this.courseSectionsSharedCollection,
      quizCourseSection.courseSection,
    );
    this.quizzesSharedCollection = this.quizService.addQuizToCollectionIfMissing<IQuiz>(
      this.quizzesSharedCollection,
      quizCourseSection.quiz,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(
        map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.quizCourseSection?.course)),
      )
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));

    this.courseSectionService
      .query()
      .pipe(map((res: HttpResponse<ICourseSection[]>) => res.body ?? []))
      .pipe(
        map((courseSections: ICourseSection[]) =>
          this.courseSectionService.addCourseSectionToCollectionIfMissing<ICourseSection>(
            courseSections,
            this.quizCourseSection?.courseSection,
          ),
        ),
      )
      .subscribe((courseSections: ICourseSection[]) => (this.courseSectionsSharedCollection = courseSections));

    this.quizService
      .query()
      .pipe(map((res: HttpResponse<IQuiz[]>) => res.body ?? []))
      .pipe(map((quizzes: IQuiz[]) => this.quizService.addQuizToCollectionIfMissing<IQuiz>(quizzes, this.quizCourseSection?.quiz)))
      .subscribe((quizzes: IQuiz[]) => (this.quizzesSharedCollection = quizzes));
  }
}
