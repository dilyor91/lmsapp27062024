import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IMessage } from 'app/entities/message/message.model';
import { MessageService } from 'app/entities/message/service/message.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { MessageToUserService } from '../service/message-to-user.service';
import { IMessageToUser } from '../message-to-user.model';
import { MessageToUserFormGroup, MessageToUserFormService } from './message-to-user-form.service';

@Component({
  standalone: true,
  selector: 'jhi-message-to-user-update',
  templateUrl: './message-to-user-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class MessageToUserUpdateComponent implements OnInit {
  isSaving = false;
  messageToUser: IMessageToUser | null = null;

  messagesSharedCollection: IMessage[] = [];
  usersSharedCollection: IUser[] = [];

  protected messageToUserService = inject(MessageToUserService);
  protected messageToUserFormService = inject(MessageToUserFormService);
  protected messageService = inject(MessageService);
  protected userService = inject(UserService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: MessageToUserFormGroup = this.messageToUserFormService.createMessageToUserFormGroup();

  compareMessage = (o1: IMessage | null, o2: IMessage | null): boolean => this.messageService.compareMessage(o1, o2);

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ messageToUser }) => {
      this.messageToUser = messageToUser;
      if (messageToUser) {
        this.updateForm(messageToUser);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const messageToUser = this.messageToUserFormService.getMessageToUser(this.editForm);
    if (messageToUser.id !== null) {
      this.subscribeToSaveResponse(this.messageToUserService.update(messageToUser));
    } else {
      this.subscribeToSaveResponse(this.messageToUserService.create(messageToUser));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMessageToUser>>): void {
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

  protected updateForm(messageToUser: IMessageToUser): void {
    this.messageToUser = messageToUser;
    this.messageToUserFormService.resetForm(this.editForm, messageToUser);

    this.messagesSharedCollection = this.messageService.addMessageToCollectionIfMissing<IMessage>(
      this.messagesSharedCollection,
      messageToUser.message,
    );
    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, messageToUser.receiver);
  }

  protected loadRelationshipsOptions(): void {
    this.messageService
      .query()
      .pipe(map((res: HttpResponse<IMessage[]>) => res.body ?? []))
      .pipe(
        map((messages: IMessage[]) => this.messageService.addMessageToCollectionIfMissing<IMessage>(messages, this.messageToUser?.message)),
      )
      .subscribe((messages: IMessage[]) => (this.messagesSharedCollection = messages));

    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.messageToUser?.receiver)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }
}
