import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAnnouncement } from 'app/entities/announcement/announcement.model';
import { AnnouncementService } from 'app/entities/announcement/service/announcement.service';
import { IStudent } from 'app/entities/student/student.model';
import { StudentService } from 'app/entities/student/service/student.service';
import { AnnouncementStudentReadService } from '../service/announcement-student-read.service';
import { IAnnouncementStudentRead } from '../announcement-student-read.model';
import { AnnouncementStudentReadFormGroup, AnnouncementStudentReadFormService } from './announcement-student-read-form.service';

@Component({
  standalone: true,
  selector: 'jhi-announcement-student-read-update',
  templateUrl: './announcement-student-read-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AnnouncementStudentReadUpdateComponent implements OnInit {
  isSaving = false;
  announcementStudentRead: IAnnouncementStudentRead | null = null;

  announcementsSharedCollection: IAnnouncement[] = [];
  studentsSharedCollection: IStudent[] = [];

  protected announcementStudentReadService = inject(AnnouncementStudentReadService);
  protected announcementStudentReadFormService = inject(AnnouncementStudentReadFormService);
  protected announcementService = inject(AnnouncementService);
  protected studentService = inject(StudentService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AnnouncementStudentReadFormGroup = this.announcementStudentReadFormService.createAnnouncementStudentReadFormGroup();

  compareAnnouncement = (o1: IAnnouncement | null, o2: IAnnouncement | null): boolean =>
    this.announcementService.compareAnnouncement(o1, o2);

  compareStudent = (o1: IStudent | null, o2: IStudent | null): boolean => this.studentService.compareStudent(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ announcementStudentRead }) => {
      this.announcementStudentRead = announcementStudentRead;
      if (announcementStudentRead) {
        this.updateForm(announcementStudentRead);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const announcementStudentRead = this.announcementStudentReadFormService.getAnnouncementStudentRead(this.editForm);
    if (announcementStudentRead.id !== null) {
      this.subscribeToSaveResponse(this.announcementStudentReadService.update(announcementStudentRead));
    } else {
      this.subscribeToSaveResponse(this.announcementStudentReadService.create(announcementStudentRead));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnnouncementStudentRead>>): void {
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

  protected updateForm(announcementStudentRead: IAnnouncementStudentRead): void {
    this.announcementStudentRead = announcementStudentRead;
    this.announcementStudentReadFormService.resetForm(this.editForm, announcementStudentRead);

    this.announcementsSharedCollection = this.announcementService.addAnnouncementToCollectionIfMissing<IAnnouncement>(
      this.announcementsSharedCollection,
      announcementStudentRead.announcement,
    );
    this.studentsSharedCollection = this.studentService.addStudentToCollectionIfMissing<IStudent>(
      this.studentsSharedCollection,
      announcementStudentRead.student,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.announcementService
      .query()
      .pipe(map((res: HttpResponse<IAnnouncement[]>) => res.body ?? []))
      .pipe(
        map((announcements: IAnnouncement[]) =>
          this.announcementService.addAnnouncementToCollectionIfMissing<IAnnouncement>(
            announcements,
            this.announcementStudentRead?.announcement,
          ),
        ),
      )
      .subscribe((announcements: IAnnouncement[]) => (this.announcementsSharedCollection = announcements));

    this.studentService
      .query()
      .pipe(map((res: HttpResponse<IStudent[]>) => res.body ?? []))
      .pipe(
        map((students: IStudent[]) =>
          this.studentService.addStudentToCollectionIfMissing<IStudent>(students, this.announcementStudentRead?.student),
        ),
      )
      .subscribe((students: IStudent[]) => (this.studentsSharedCollection = students));
  }
}
