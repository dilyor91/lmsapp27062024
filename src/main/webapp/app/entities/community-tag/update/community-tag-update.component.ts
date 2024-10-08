import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICommunity } from 'app/entities/community/community.model';
import { CommunityService } from 'app/entities/community/service/community.service';
import { ITag } from 'app/entities/tag/tag.model';
import { TagService } from 'app/entities/tag/service/tag.service';
import { CommunityTagService } from '../service/community-tag.service';
import { ICommunityTag } from '../community-tag.model';
import { CommunityTagFormGroup, CommunityTagFormService } from './community-tag-form.service';

@Component({
  standalone: true,
  selector: 'jhi-community-tag-update',
  templateUrl: './community-tag-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CommunityTagUpdateComponent implements OnInit {
  isSaving = false;
  communityTag: ICommunityTag | null = null;

  communitiesSharedCollection: ICommunity[] = [];
  tagsSharedCollection: ITag[] = [];

  protected communityTagService = inject(CommunityTagService);
  protected communityTagFormService = inject(CommunityTagFormService);
  protected communityService = inject(CommunityService);
  protected tagService = inject(TagService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CommunityTagFormGroup = this.communityTagFormService.createCommunityTagFormGroup();

  compareCommunity = (o1: ICommunity | null, o2: ICommunity | null): boolean => this.communityService.compareCommunity(o1, o2);

  compareTag = (o1: ITag | null, o2: ITag | null): boolean => this.tagService.compareTag(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ communityTag }) => {
      this.communityTag = communityTag;
      if (communityTag) {
        this.updateForm(communityTag);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const communityTag = this.communityTagFormService.getCommunityTag(this.editForm);
    if (communityTag.id !== null) {
      this.subscribeToSaveResponse(this.communityTagService.update(communityTag));
    } else {
      this.subscribeToSaveResponse(this.communityTagService.create(communityTag));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommunityTag>>): void {
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

  protected updateForm(communityTag: ICommunityTag): void {
    this.communityTag = communityTag;
    this.communityTagFormService.resetForm(this.editForm, communityTag);

    this.communitiesSharedCollection = this.communityService.addCommunityToCollectionIfMissing<ICommunity>(
      this.communitiesSharedCollection,
      communityTag.community,
    );
    this.tagsSharedCollection = this.tagService.addTagToCollectionIfMissing<ITag>(this.tagsSharedCollection, communityTag.tag);
  }

  protected loadRelationshipsOptions(): void {
    this.communityService
      .query()
      .pipe(map((res: HttpResponse<ICommunity[]>) => res.body ?? []))
      .pipe(
        map((communities: ICommunity[]) =>
          this.communityService.addCommunityToCollectionIfMissing<ICommunity>(communities, this.communityTag?.community),
        ),
      )
      .subscribe((communities: ICommunity[]) => (this.communitiesSharedCollection = communities));

    this.tagService
      .query()
      .pipe(map((res: HttpResponse<ITag[]>) => res.body ?? []))
      .pipe(map((tags: ITag[]) => this.tagService.addTagToCollectionIfMissing<ITag>(tags, this.communityTag?.tag)))
      .subscribe((tags: ITag[]) => (this.tagsSharedCollection = tags));
  }
}
