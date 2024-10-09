import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICommunity } from 'app/entities/community/community.model';
import { CommunityService } from 'app/entities/community/service/community.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { CommunityMessageService } from '../service/community-message.service';
import { ICommunityMessage } from '../community-message.model';
import { CommunityMessageFormGroup, CommunityMessageFormService } from './community-message-form.service';

@Component({
  standalone: true,
  selector: 'jhi-community-message-update',
  templateUrl: './community-message-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CommunityMessageUpdateComponent implements OnInit {
  isSaving = false;
  communityMessage: ICommunityMessage | null = null;

  communitiesSharedCollection: ICommunity[] = [];
  usersSharedCollection: IUser[] = [];

  protected communityMessageService = inject(CommunityMessageService);
  protected communityMessageFormService = inject(CommunityMessageFormService);
  protected communityService = inject(CommunityService);
  protected userService = inject(UserService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CommunityMessageFormGroup = this.communityMessageFormService.createCommunityMessageFormGroup();

  compareCommunity = (o1: ICommunity | null, o2: ICommunity | null): boolean => this.communityService.compareCommunity(o1, o2);

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ communityMessage }) => {
      this.communityMessage = communityMessage;
      if (communityMessage) {
        this.updateForm(communityMessage);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const communityMessage = this.communityMessageFormService.getCommunityMessage(this.editForm);
    if (communityMessage.id !== null) {
      this.subscribeToSaveResponse(this.communityMessageService.update(communityMessage));
    } else {
      this.subscribeToSaveResponse(this.communityMessageService.create(communityMessage));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommunityMessage>>): void {
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

  protected updateForm(communityMessage: ICommunityMessage): void {
    this.communityMessage = communityMessage;
    this.communityMessageFormService.resetForm(this.editForm, communityMessage);

    this.communitiesSharedCollection = this.communityService.addCommunityToCollectionIfMissing<ICommunity>(
      this.communitiesSharedCollection,
      communityMessage.community,
    );
    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, communityMessage.sender);
  }

  protected loadRelationshipsOptions(): void {
    this.communityService
      .query()
      .pipe(map((res: HttpResponse<ICommunity[]>) => res.body ?? []))
      .pipe(
        map((communities: ICommunity[]) =>
          this.communityService.addCommunityToCollectionIfMissing<ICommunity>(communities, this.communityMessage?.community),
        ),
      )
      .subscribe((communities: ICommunity[]) => (this.communitiesSharedCollection = communities));

    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.communityMessage?.sender)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
