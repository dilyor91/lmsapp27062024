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
import { AnnouncementService } from '../service/announcement.service';
import { IAnnouncement } from '../announcement.model';
import { AnnouncementFormService, AnnouncementFormGroup } from './announcement-form.service';

@Component({
  standalone: true,
  selector: 'jhi-announcement-update',
  templateUrl: './announcement-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AnnouncementUpdateComponent implements OnInit {
  isSaving = false;
  announcement: IAnnouncement | null = null;

  coursesSharedCollection: ICourse[] = [];
  courseSectionsSharedCollection: ICourseSection[] = [];

  protected announcementService = inject(AnnouncementService);
  protected announcementFormService = inject(AnnouncementFormService);
  protected courseService = inject(CourseService);
  protected courseSectionService = inject(CourseSectionService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AnnouncementFormGroup = this.announcementFormService.createAnnouncementFormGroup();

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  compareCourseSection = (o1: ICourseSection | null, o2: ICourseSection | null): boolean =>
    this.courseSectionService.compareCourseSection(o1, o2);

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

    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(
      this.coursesSharedCollection,
      announcement.course,
    );
    this.courseSectionsSharedCollection = this.courseSectionService.addCourseSectionToCollectionIfMissing<ICourseSection>(
      this.courseSectionsSharedCollection,
      ...(announcement.courseSections ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.announcement?.course)))
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));

    this.courseSectionService
      .query()
      .pipe(map((res: HttpResponse<ICourseSection[]>) => res.body ?? []))
      .pipe(
        map((courseSections: ICourseSection[]) =>
          this.courseSectionService.addCourseSectionToCollectionIfMissing<ICourseSection>(
            courseSections,
            ...(this.announcement?.courseSections ?? []),
          ),
        ),
      )
      .subscribe((courseSections: ICourseSection[]) => (this.courseSectionsSharedCollection = courseSections));
  }
}
