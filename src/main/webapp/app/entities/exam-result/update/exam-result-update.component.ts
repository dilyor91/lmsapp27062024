import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IStudent } from 'app/entities/student/student.model';
import { StudentService } from 'app/entities/student/service/student.service';
import { IExam } from 'app/entities/exam/exam.model';
import { ExamService } from 'app/entities/exam/service/exam.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ExamResultService } from '../service/exam-result.service';
import { IExamResult } from '../exam-result.model';
import { ExamResultFormGroup, ExamResultFormService } from './exam-result-form.service';

@Component({
  standalone: true,
  selector: 'jhi-exam-result-update',
  templateUrl: './exam-result-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ExamResultUpdateComponent implements OnInit {
  isSaving = false;
  examResult: IExamResult | null = null;

  studentsSharedCollection: IStudent[] = [];
  examsSharedCollection: IExam[] = [];
  coursesSharedCollection: ICourse[] = [];

  protected examResultService = inject(ExamResultService);
  protected examResultFormService = inject(ExamResultFormService);
  protected studentService = inject(StudentService);
  protected examService = inject(ExamService);
  protected courseService = inject(CourseService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ExamResultFormGroup = this.examResultFormService.createExamResultFormGroup();

  compareStudent = (o1: IStudent | null, o2: IStudent | null): boolean => this.studentService.compareStudent(o1, o2);

  compareExam = (o1: IExam | null, o2: IExam | null): boolean => this.examService.compareExam(o1, o2);

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ examResult }) => {
      this.examResult = examResult;
      if (examResult) {
        this.updateForm(examResult);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const examResult = this.examResultFormService.getExamResult(this.editForm);
    if (examResult.id !== null) {
      this.subscribeToSaveResponse(this.examResultService.update(examResult));
    } else {
      this.subscribeToSaveResponse(this.examResultService.create(examResult));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExamResult>>): void {
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

  protected updateForm(examResult: IExamResult): void {
    this.examResult = examResult;
    this.examResultFormService.resetForm(this.editForm, examResult);

    this.studentsSharedCollection = this.studentService.addStudentToCollectionIfMissing<IStudent>(
      this.studentsSharedCollection,
      examResult.student,
    );
    this.examsSharedCollection = this.examService.addExamToCollectionIfMissing<IExam>(this.examsSharedCollection, examResult.exam);
    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(
      this.coursesSharedCollection,
      examResult.course,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.studentService
      .query()
      .pipe(map((res: HttpResponse<IStudent[]>) => res.body ?? []))
      .pipe(
        map((students: IStudent[]) => this.studentService.addStudentToCollectionIfMissing<IStudent>(students, this.examResult?.student)),
      )
      .subscribe((students: IStudent[]) => (this.studentsSharedCollection = students));

    this.examService
      .query()
      .pipe(map((res: HttpResponse<IExam[]>) => res.body ?? []))
      .pipe(map((exams: IExam[]) => this.examService.addExamToCollectionIfMissing<IExam>(exams, this.examResult?.exam)))
      .subscribe((exams: IExam[]) => (this.examsSharedCollection = exams));

    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.examResult?.course)))
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));
  }
}
