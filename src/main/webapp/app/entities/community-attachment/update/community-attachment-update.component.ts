import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICommunity } from 'app/entities/community/community.model';
import { CommunityService } from 'app/entities/community/service/community.service';
import { IAttachment } from 'app/entities/attachment/attachment.model';
import { AttachmentService } from 'app/entities/attachment/service/attachment.service';
import { CommunityAttachmentService } from '../service/community-attachment.service';
import { ICommunityAttachment } from '../community-attachment.model';
import { CommunityAttachmentFormGroup, CommunityAttachmentFormService } from './community-attachment-form.service';

@Component({
  standalone: true,
  selector: 'jhi-community-attachment-update',
  templateUrl: './community-attachment-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CommunityAttachmentUpdateComponent implements OnInit {
  isSaving = false;
  communityAttachment: ICommunityAttachment | null = null;

  communitiesSharedCollection: ICommunity[] = [];
  attachmentsSharedCollection: IAttachment[] = [];

  protected communityAttachmentService = inject(CommunityAttachmentService);
  protected communityAttachmentFormService = inject(CommunityAttachmentFormService);
  protected communityService = inject(CommunityService);
  protected attachmentService = inject(AttachmentService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CommunityAttachmentFormGroup = this.communityAttachmentFormService.createCommunityAttachmentFormGroup();

  compareCommunity = (o1: ICommunity | null, o2: ICommunity | null): boolean => this.communityService.compareCommunity(o1, o2);

  compareAttachment = (o1: IAttachment | null, o2: IAttachment | null): boolean => this.attachmentService.compareAttachment(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ communityAttachment }) => {
      this.communityAttachment = communityAttachment;
      if (communityAttachment) {
        this.updateForm(communityAttachment);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const communityAttachment = this.communityAttachmentFormService.getCommunityAttachment(this.editForm);
    if (communityAttachment.id !== null) {
      this.subscribeToSaveResponse(this.communityAttachmentService.update(communityAttachment));
    } else {
      this.subscribeToSaveResponse(this.communityAttachmentService.create(communityAttachment));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommunityAttachment>>): void {
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

  protected updateForm(communityAttachment: ICommunityAttachment): void {
    this.communityAttachment = communityAttachment;
    this.communityAttachmentFormService.resetForm(this.editForm, communityAttachment);

    this.communitiesSharedCollection = this.communityService.addCommunityToCollectionIfMissing<ICommunity>(
      this.communitiesSharedCollection,
      communityAttachment.community,
    );
    this.attachmentsSharedCollection = this.attachmentService.addAttachmentToCollectionIfMissing<IAttachment>(
      this.attachmentsSharedCollection,
      communityAttachment.attachment,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.communityService
      .query()
      .pipe(map((res: HttpResponse<ICommunity[]>) => res.body ?? []))
      .pipe(
        map((communities: ICommunity[]) =>
          this.communityService.addCommunityToCollectionIfMissing<ICommunity>(communities, this.communityAttachment?.community),
        ),
      )
      .subscribe((communities: ICommunity[]) => (this.communitiesSharedCollection = communities));

    this.attachmentService
      .query()
      .pipe(map((res: HttpResponse<IAttachment[]>) => res.body ?? []))
      .pipe(
        map((attachments: IAttachment[]) =>
          this.attachmentService.addAttachmentToCollectionIfMissing<IAttachment>(attachments, this.communityAttachment?.attachment),
        ),
      )
      .subscribe((attachments: IAttachment[]) => (this.attachmentsSharedCollection = attachments));
  }
}
