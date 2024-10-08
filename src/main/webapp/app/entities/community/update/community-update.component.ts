import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { ICommunity } from '../community.model';
import { CommunityService } from '../service/community.service';
import { CommunityFormGroup, CommunityFormService } from './community-form.service';

@Component({
  standalone: true,
  selector: 'jhi-community-update',
  templateUrl: './community-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CommunityUpdateComponent implements OnInit {
  isSaving = false;
  community: ICommunity | null = null;

  usersSharedCollection: IUser[] = [];

  protected communityService = inject(CommunityService);
  protected communityFormService = inject(CommunityFormService);
  protected userService = inject(UserService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CommunityFormGroup = this.communityFormService.createCommunityFormGroup();

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ community }) => {
      this.community = community;
      if (community) {
        this.updateForm(community);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const community = this.communityFormService.getCommunity(this.editForm);
    if (community.id !== null) {
      this.subscribeToSaveResponse(this.communityService.update(community));
    } else {
      this.subscribeToSaveResponse(this.communityService.create(community));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommunity>>): void {
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

  protected updateForm(community: ICommunity): void {
    this.community = community;
    this.communityFormService.resetForm(this.editForm, community);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, community.user);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.community?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
