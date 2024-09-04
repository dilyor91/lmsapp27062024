import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAnnouncement } from 'app/entities/announcement/announcement.model';
import { AnnouncementService } from 'app/entities/announcement/service/announcement.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { ICourseSection } from 'app/entities/course-section/course-section.model';
import { CourseSectionService } from 'app/entities/course-section/service/course-section.service';
import { AnnouncementCourseSectionService } from '../service/announcement-course-section.service';
import { IAnnouncementCourseSection } from '../announcement-course-section.model';
import { AnnouncementCourseSectionFormGroup, AnnouncementCourseSectionFormService } from './announcement-course-section-form.service';

@Component({
  standalone: true,
  selector: 'jhi-announcement-course-section-update',
  templateUrl: './announcement-course-section-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AnnouncementCourseSectionUpdateComponent implements OnInit {
  isSaving = false;
  announcementCourseSection: IAnnouncementCourseSection | null = null;

  announcementsSharedCollection: IAnnouncement[] = [];
  coursesSharedCollection: ICourse[] = [];
  courseSectionsSharedCollection: ICourseSection[] = [];

  protected announcementCourseSectionService = inject(AnnouncementCourseSectionService);
  protected announcementCourseSectionFormService = inject(AnnouncementCourseSectionFormService);
  protected announcementService = inject(AnnouncementService);
  protected courseService = inject(CourseService);
  protected courseSectionService = inject(CourseSectionService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AnnouncementCourseSectionFormGroup = this.announcementCourseSectionFormService.createAnnouncementCourseSectionFormGroup();

  compareAnnouncement = (o1: IAnnouncement | null, o2: IAnnouncement | null): boolean =>
    this.announcementService.compareAnnouncement(o1, o2);

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  compareCourseSection = (o1: ICourseSection | null, o2: ICourseSection | null): boolean =>
    this.courseSectionService.compareCourseSection(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ announcementCourseSection }) => {
      this.announcementCourseSection = announcementCourseSection;
      if (announcementCourseSection) {
        this.updateForm(announcementCourseSection);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const announcementCourseSection = this.announcementCourseSectionFormService.getAnnouncementCourseSection(this.editForm);
    if (announcementCourseSection.id !== null) {
      this.subscribeToSaveResponse(this.announcementCourseSectionService.update(announcementCourseSection));
    } else {
      this.subscribeToSaveResponse(this.announcementCourseSectionService.create(announcementCourseSection));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnnouncementCourseSection>>): void {
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

  protected updateForm(announcementCourseSection: IAnnouncementCourseSection): void {
    this.announcementCourseSection = announcementCourseSection;
    this.announcementCourseSectionFormService.resetForm(this.editForm, announcementCourseSection);

    this.announcementsSharedCollection = this.announcementService.addAnnouncementToCollectionIfMissing<IAnnouncement>(
      this.announcementsSharedCollection,
      announcementCourseSection.announcement,
    );
    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(
      this.coursesSharedCollection,
      announcementCourseSection.course,
    );
    this.courseSectionsSharedCollection = this.courseSectionService.addCourseSectionToCollectionIfMissing<ICourseSection>(
      this.courseSectionsSharedCollection,
      announcementCourseSection.courseSection,
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
            this.announcementCourseSection?.announcement,
          ),
        ),
      )
      .subscribe((announcements: IAnnouncement[]) => (this.announcementsSharedCollection = announcements));

    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(
        map((courses: ICourse[]) =>
          this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.announcementCourseSection?.course),
        ),
      )
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));

    this.courseSectionService
      .query()
      .pipe(map((res: HttpResponse<ICourseSection[]>) => res.body ?? []))
      .pipe(
        map((courseSections: ICourseSection[]) =>
          this.courseSectionService.addCourseSectionToCollectionIfMissing<ICourseSection>(
            courseSections,
            this.announcementCourseSection?.courseSection,
          ),
        ),
      )
      .subscribe((courseSections: ICourseSection[]) => (this.courseSectionsSharedCollection = courseSections));
  }
}
