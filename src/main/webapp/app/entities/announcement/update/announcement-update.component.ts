import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAttachment } from 'app/entities/attachment/attachment.model';
import { AttachmentService } from 'app/entities/attachment/service/attachment.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { AnnouncementService } from '../service/announcement.service';
import { IAnnouncement } from '../announcement.model';
import { AnnouncementFormGroup, AnnouncementFormService } from './announcement-form.service';

@Component({
  standalone: true,
  selector: 'jhi-announcement-update',
  templateUrl: './announcement-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AnnouncementUpdateComponent implements OnInit {
  isSaving = false;
  announcement: IAnnouncement | null = null;

  attachmentsSharedCollection: IAttachment[] = [];
  coursesSharedCollection: ICourse[] = [];

  protected announcementService = inject(AnnouncementService);
  protected announcementFormService = inject(AnnouncementFormService);
  protected attachmentService = inject(AttachmentService);
  protected courseService = inject(CourseService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AnnouncementFormGroup = this.announcementFormService.createAnnouncementFormGroup();

  compareAttachment = (o1: IAttachment | null, o2: IAttachment | null): boolean => this.attachmentService.compareAttachment(o1, o2);

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ announcement }) => {
      this.announcement = announcement;
      if (announcement) {
        this.updateForm(announcement);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const announcement = this.announcementFormService.getAnnouncement(this.editForm);
    if (announcement.id !== null) {
      this.subscribeToSaveResponse(this.announcementService.update(announcement));
    } else {
      this.subscribeToSaveResponse(this.announcementService.create(announcement));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnnouncement>>): void {
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

  protected updateForm(announcement: IAnnouncement): void {
    this.announcement = announcement;
    this.announcementFormService.resetForm(this.editForm, announcement);

    this.attachmentsSharedCollection = this.attachmentService.addAttachmentToCollectionIfMissing<IAttachment>(
      this.attachmentsSharedCollection,
      announcement.attachment,
    );
    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(
      this.coursesSharedCollection,
      announcement.course,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.attachmentService
      .query()
      .pipe(map((res: HttpResponse<IAttachment[]>) => res.body ?? []))
      .pipe(
        map((attachments: IAttachment[]) =>
          this.attachmentService.addAttachmentToCollectionIfMissing<IAttachment>(attachments, this.announcement?.attachment),
        ),
      )
      .subscribe((attachments: IAttachment[]) => (this.attachmentsSharedCollection = attachments));

    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.announcement?.course)))
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));
  }
}
