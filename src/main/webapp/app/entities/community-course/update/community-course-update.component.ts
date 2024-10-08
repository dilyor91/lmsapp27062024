import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICommunity } from 'app/entities/community/community.model';
import { CommunityService } from 'app/entities/community/service/community.service';
import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { CommunityCourseService } from '../service/community-course.service';
import { ICommunityCourse } from '../community-course.model';
import { CommunityCourseFormGroup, CommunityCourseFormService } from './community-course-form.service';

@Component({
  standalone: true,
  selector: 'jhi-community-course-update',
  templateUrl: './community-course-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CommunityCourseUpdateComponent implements OnInit {
  isSaving = false;
  communityCourse: ICommunityCourse | null = null;

  communitiesSharedCollection: ICommunity[] = [];
  coursesSharedCollection: ICourse[] = [];

  protected communityCourseService = inject(CommunityCourseService);
  protected communityCourseFormService = inject(CommunityCourseFormService);
  protected communityService = inject(CommunityService);
  protected courseService = inject(CourseService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CommunityCourseFormGroup = this.communityCourseFormService.createCommunityCourseFormGroup();

  compareCommunity = (o1: ICommunity | null, o2: ICommunity | null): boolean => this.communityService.compareCommunity(o1, o2);

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ communityCourse }) => {
      this.communityCourse = communityCourse;
      if (communityCourse) {
        this.updateForm(communityCourse);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const communityCourse = this.communityCourseFormService.getCommunityCourse(this.editForm);
    if (communityCourse.id !== null) {
      this.subscribeToSaveResponse(this.communityCourseService.update(communityCourse));
    } else {
      this.subscribeToSaveResponse(this.communityCourseService.create(communityCourse));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommunityCourse>>): void {
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

  protected updateForm(communityCourse: ICommunityCourse): void {
    this.communityCourse = communityCourse;
    this.communityCourseFormService.resetForm(this.editForm, communityCourse);

    this.communitiesSharedCollection = this.communityService.addCommunityToCollectionIfMissing<ICommunity>(
      this.communitiesSharedCollection,
      communityCourse.community,
    );
    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(
      this.coursesSharedCollection,
      communityCourse.course,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.communityService
      .query()
      .pipe(map((res: HttpResponse<ICommunity[]>) => res.body ?? []))
      .pipe(
        map((communities: ICommunity[]) =>
          this.communityService.addCommunityToCollectionIfMissing<ICommunity>(communities, this.communityCourse?.community),
        ),
      )
      .subscribe((communities: ICommunity[]) => (this.communitiesSharedCollection = communities));

    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.communityCourse?.course)))
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));
  }
}
