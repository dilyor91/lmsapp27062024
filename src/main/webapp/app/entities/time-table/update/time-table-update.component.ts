import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ITeacher } from 'app/entities/teacher/teacher.model';
import { TeacherService } from 'app/entities/teacher/service/teacher.service';
import { IBuilding } from 'app/entities/building/building.model';
import { BuildingService } from 'app/entities/building/service/building.service';
import { IRoom } from 'app/entities/room/room.model';
import { RoomService } from 'app/entities/room/service/room.service';
import { IStudyTerm } from 'app/entities/study-term/study-term.model';
import { StudyTermService } from 'app/entities/study-term/service/study-term.service';
import { TimeTableService } from '../service/time-table.service';
import { ITimeTable } from '../time-table.model';
import { TimeTableFormGroup, TimeTableFormService } from './time-table-form.service';

@Component({
  standalone: true,
  selector: 'jhi-time-table-update',
  templateUrl: './time-table-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class TimeTableUpdateComponent implements OnInit {
  isSaving = false;
  timeTable: ITimeTable | null = null;

  coursesSharedCollection: ICourse[] = [];
  teachersSharedCollection: ITeacher[] = [];
  buildingsSharedCollection: IBuilding[] = [];
  roomsSharedCollection: IRoom[] = [];
  studyTermsSharedCollection: IStudyTerm[] = [];

  protected timeTableService = inject(TimeTableService);
  protected timeTableFormService = inject(TimeTableFormService);
  protected courseService = inject(CourseService);
  protected teacherService = inject(TeacherService);
  protected buildingService = inject(BuildingService);
  protected roomService = inject(RoomService);
  protected studyTermService = inject(StudyTermService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TimeTableFormGroup = this.timeTableFormService.createTimeTableFormGroup();

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  compareTeacher = (o1: ITeacher | null, o2: ITeacher | null): boolean => this.teacherService.compareTeacher(o1, o2);

  compareBuilding = (o1: IBuilding | null, o2: IBuilding | null): boolean => this.buildingService.compareBuilding(o1, o2);

  compareRoom = (o1: IRoom | null, o2: IRoom | null): boolean => this.roomService.compareRoom(o1, o2);

  compareStudyTerm = (o1: IStudyTerm | null, o2: IStudyTerm | null): boolean => this.studyTermService.compareStudyTerm(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ timeTable }) => {
      this.timeTable = timeTable;
      if (timeTable) {
        this.updateForm(timeTable);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const timeTable = this.timeTableFormService.getTimeTable(this.editForm);
    if (timeTable.id !== null) {
      this.subscribeToSaveResponse(this.timeTableService.update(timeTable));
    } else {
      this.subscribeToSaveResponse(this.timeTableService.create(timeTable));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITimeTable>>): void {
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

  protected updateForm(timeTable: ITimeTable): void {
    this.timeTable = timeTable;
    this.timeTableFormService.resetForm(this.editForm, timeTable);

    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(
      this.coursesSharedCollection,
      timeTable.course,
    );
    this.teachersSharedCollection = this.teacherService.addTeacherToCollectionIfMissing<ITeacher>(
      this.teachersSharedCollection,
      timeTable.teacher,
    );
    this.buildingsSharedCollection = this.buildingService.addBuildingToCollectionIfMissing<IBuilding>(
      this.buildingsSharedCollection,
      timeTable.building,
    );
    this.roomsSharedCollection = this.roomService.addRoomToCollectionIfMissing<IRoom>(this.roomsSharedCollection, timeTable.room);
    this.studyTermsSharedCollection = this.studyTermService.addStudyTermToCollectionIfMissing<IStudyTerm>(
      this.studyTermsSharedCollection,
      timeTable.studyTerm,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.timeTable?.course)))
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));

    this.teacherService
      .query()
      .pipe(map((res: HttpResponse<ITeacher[]>) => res.body ?? []))
      .pipe(map((teachers: ITeacher[]) => this.teacherService.addTeacherToCollectionIfMissing<ITeacher>(teachers, this.timeTable?.teacher)))
      .subscribe((teachers: ITeacher[]) => (this.teachersSharedCollection = teachers));

    this.buildingService
      .query()
      .pipe(map((res: HttpResponse<IBuilding[]>) => res.body ?? []))
      .pipe(
        map((buildings: IBuilding[]) =>
          this.buildingService.addBuildingToCollectionIfMissing<IBuilding>(buildings, this.timeTable?.building),
        ),
      )
      .subscribe((buildings: IBuilding[]) => (this.buildingsSharedCollection = buildings));

    this.roomService
      .query()
      .pipe(map((res: HttpResponse<IRoom[]>) => res.body ?? []))
      .pipe(map((rooms: IRoom[]) => this.roomService.addRoomToCollectionIfMissing<IRoom>(rooms, this.timeTable?.room)))
      .subscribe((rooms: IRoom[]) => (this.roomsSharedCollection = rooms));

    this.studyTermService
      .query()
      .pipe(map((res: HttpResponse<IStudyTerm[]>) => res.body ?? []))
      .pipe(
        map((studyTerms: IStudyTerm[]) =>
          this.studyTermService.addStudyTermToCollectionIfMissing<IStudyTerm>(studyTerms, this.timeTable?.studyTerm),
        ),
      )
      .subscribe((studyTerms: IStudyTerm[]) => (this.studyTermsSharedCollection = studyTerms));
  }
}
