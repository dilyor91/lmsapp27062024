import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IStudent } from 'app/entities/student/student.model';
import { StudentService } from 'app/entities/student/service/student.service';
import { ILesson } from 'app/entities/lesson/lesson.model';
import { LessonService } from 'app/entities/lesson/service/lesson.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ICourseSection } from 'app/entities/course-section/course-section.model';
import { CourseSectionService } from 'app/entities/course-section/service/course-section.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { AttendanceEnum } from 'app/entities/enumerations/attendance-enum.model';
import { AttendanceService } from '../service/attendance.service';
import { IAttendance } from '../attendance.model';
import { AttendanceFormService, AttendanceFormGroup } from './attendance-form.service';

@Component({
  standalone: true,
  selector: 'jhi-attendance-update',
  templateUrl: './attendance-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AttendanceUpdateComponent implements OnInit {
  isSaving = false;
  attendance: IAttendance | null = null;
  attendanceEnumValues = Object.keys(AttendanceEnum);

  studentsSharedCollection: IStudent[] = [];
  lessonsSharedCollection: ILesson[] = [];
  coursesSharedCollection: ICourse[] = [];
  courseSectionsSharedCollection: ICourseSection[] = [];
  usersSharedCollection: IUser[] = [];

  protected attendanceService = inject(AttendanceService);
  protected attendanceFormService = inject(AttendanceFormService);
  protected studentService = inject(StudentService);
  protected lessonService = inject(LessonService);
  protected courseService = inject(CourseService);
  protected courseSectionService = inject(CourseSectionService);
  protected userService = inject(UserService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AttendanceFormGroup = this.attendanceFormService.createAttendanceFormGroup();

  compareStudent = (o1: IStudent | null, o2: IStudent | null): boolean => this.studentService.compareStudent(o1, o2);

  compareLesson = (o1: ILesson | null, o2: ILesson | null): boolean => this.lessonService.compareLesson(o1, o2);

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  compareCourseSection = (o1: ICourseSection | null, o2: ICourseSection | null): boolean =>
    this.courseSectionService.compareCourseSection(o1, o2);

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ attendance }) => {
      this.attendance = attendance;
      if (attendance) {
        this.updateForm(attendance);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const attendance = this.attendanceFormService.getAttendance(this.editForm);
    if (attendance.id !== null) {
      this.subscribeToSaveResponse(this.attendanceService.update(attendance));
    } else {
      this.subscribeToSaveResponse(this.attendanceService.create(attendance));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttendance>>): void {
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

  protected updateForm(attendance: IAttendance): void {
    this.attendance = attendance;
    this.attendanceFormService.resetForm(this.editForm, attendance);

    this.studentsSharedCollection = this.studentService.addStudentToCollectionIfMissing<IStudent>(
      this.studentsSharedCollection,
      attendance.student,
    );
    this.lessonsSharedCollection = this.lessonService.addLessonToCollectionIfMissing<ILesson>(
      this.lessonsSharedCollection,
      attendance.lesson,
    );
    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(
      this.coursesSharedCollection,
      attendance.course,
    );
    this.courseSectionsSharedCollection = this.courseSectionService.addCourseSectionToCollectionIfMissing<ICourseSection>(
      this.courseSectionsSharedCollection,
      attendance.courseSection,
    );
    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, attendance.teacher);
  }

  protected loadRelationshipsOptions(): void {
    this.studentService
      .query()
      .pipe(map((res: HttpResponse<IStudent[]>) => res.body ?? []))
      .pipe(
        map((students: IStudent[]) => this.studentService.addStudentToCollectionIfMissing<IStudent>(students, this.attendance?.student)),
      )
      .subscribe((students: IStudent[]) => (this.studentsSharedCollection = students));

    this.lessonService
      .query()
      .pipe(map((res: HttpResponse<ILesson[]>) => res.body ?? []))
      .pipe(map((lessons: ILesson[]) => this.lessonService.addLessonToCollectionIfMissing<ILesson>(lessons, this.attendance?.lesson)))
      .subscribe((lessons: ILesson[]) => (this.lessonsSharedCollection = lessons));

    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.attendance?.course)))
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));

    this.courseSectionService
      .query()
      .pipe(map((res: HttpResponse<ICourseSection[]>) => res.body ?? []))
      .pipe(
        map((courseSections: ICourseSection[]) =>
          this.courseSectionService.addCourseSectionToCollectionIfMissing<ICourseSection>(courseSections, this.attendance?.courseSection),
        ),
      )
      .subscribe((courseSections: ICourseSection[]) => (this.courseSectionsSharedCollection = courseSections));

    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.attendance?.teacher)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
