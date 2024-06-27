import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICourse } from 'app/entities/course/course.model';
import { CourseService } from 'app/entities/course/service/course.service';
import { WhoAllowed } from 'app/entities/enumerations/who-allowed.model';
import { WikiPageService } from '../service/wiki-page.service';
import { IWikiPage } from '../wiki-page.model';
import { WikiPageFormService, WikiPageFormGroup } from './wiki-page-form.service';

@Component({
  standalone: true,
  selector: 'jhi-wiki-page-update',
  templateUrl: './wiki-page-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class WikiPageUpdateComponent implements OnInit {
  isSaving = false;
  wikiPage: IWikiPage | null = null;
  whoAllowedValues = Object.keys(WhoAllowed);

  coursesSharedCollection: ICourse[] = [];

  protected wikiPageService = inject(WikiPageService);
  protected wikiPageFormService = inject(WikiPageFormService);
  protected courseService = inject(CourseService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: WikiPageFormGroup = this.wikiPageFormService.createWikiPageFormGroup();

  compareCourse = (o1: ICourse | null, o2: ICourse | null): boolean => this.courseService.compareCourse(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wikiPage }) => {
      this.wikiPage = wikiPage;
      if (wikiPage) {
        this.updateForm(wikiPage);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const wikiPage = this.wikiPageFormService.getWikiPage(this.editForm);
    if (wikiPage.id !== null) {
      this.subscribeToSaveResponse(this.wikiPageService.update(wikiPage));
    } else {
      this.subscribeToSaveResponse(this.wikiPageService.create(wikiPage));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWikiPage>>): void {
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

  protected updateForm(wikiPage: IWikiPage): void {
    this.wikiPage = wikiPage;
    this.wikiPageFormService.resetForm(this.editForm, wikiPage);

    this.coursesSharedCollection = this.courseService.addCourseToCollectionIfMissing<ICourse>(
      this.coursesSharedCollection,
      wikiPage.course,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.courseService
      .query()
      .pipe(map((res: HttpResponse<ICourse[]>) => res.body ?? []))
      .pipe(map((courses: ICourse[]) => this.courseService.addCourseToCollectionIfMissing<ICourse>(courses, this.wikiPage?.course)))
      .subscribe((courses: ICourse[]) => (this.coursesSharedCollection = courses));
  }
}
