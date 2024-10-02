import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IMessage } from 'app/entities/message/message.model';
import { MessageService } from 'app/entities/message/service/message.service';
import { IAttachment } from 'app/entities/attachment/attachment.model';
import { AttachmentService } from 'app/entities/attachment/service/attachment.service';
import { MessageAttachmentService } from '../service/message-attachment.service';
import { IMessageAttachment } from '../message-attachment.model';
import { MessageAttachmentFormGroup, MessageAttachmentFormService } from './message-attachment-form.service';

@Component({
  standalone: true,
  selector: 'jhi-message-attachment-update',
  templateUrl: './message-attachment-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class MessageAttachmentUpdateComponent implements OnInit {
  isSaving = false;
  messageAttachment: IMessageAttachment | null = null;

  messagesSharedCollection: IMessage[] = [];
  attachmentsSharedCollection: IAttachment[] = [];

  protected messageAttachmentService = inject(MessageAttachmentService);
  protected messageAttachmentFormService = inject(MessageAttachmentFormService);
  protected messageService = inject(MessageService);
  protected attachmentService = inject(AttachmentService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: MessageAttachmentFormGroup = this.messageAttachmentFormService.createMessageAttachmentFormGroup();

  compareMessage = (o1: IMessage | null, o2: IMessage | null): boolean => this.messageService.compareMessage(o1, o2);

  compareAttachment = (o1: IAttachment | null, o2: IAttachment | null): boolean => this.attachmentService.compareAttachment(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ messageAttachment }) => {
      this.messageAttachment = messageAttachment;
      if (messageAttachment) {
        this.updateForm(messageAttachment);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const messageAttachment = this.messageAttachmentFormService.getMessageAttachment(this.editForm);
    if (messageAttachment.id !== null) {
      this.subscribeToSaveResponse(this.messageAttachmentService.update(messageAttachment));
    } else {
      this.subscribeToSaveResponse(this.messageAttachmentService.create(messageAttachment));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMessageAttachment>>): void {
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

  protected updateForm(messageAttachment: IMessageAttachment): void {
    this.messageAttachment = messageAttachment;
    this.messageAttachmentFormService.resetForm(this.editForm, messageAttachment);

    this.messagesSharedCollection = this.messageService.addMessageToCollectionIfMissing<IMessage>(
      this.messagesSharedCollection,
      messageAttachment.message,
    );
    this.attachmentsSharedCollection = this.attachmentService.addAttachmentToCollectionIfMissing<IAttachment>(
      this.attachmentsSharedCollection,
      messageAttachment.attachment,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.messageService
      .query()
      .pipe(map((res: HttpResponse<IMessage[]>) => res.body ?? []))
      .pipe(
        map((messages: IMessage[]) =>
          this.messageService.addMessageToCollectionIfMissing<IMessage>(messages, this.messageAttachment?.message),
        ),
      )
      .subscribe((messages: IMessage[]) => (this.messagesSharedCollection = messages));

    this.attachmentService
      .query()
      .pipe(map((res: HttpResponse<IAttachment[]>) => res.body ?? []))
      .pipe(
        map((attachments: IAttachment[]) =>
          this.attachmentService.addAttachmentToCollectionIfMissing<IAttachment>(attachments, this.messageAttachment?.attachment),
        ),
      )
      .subscribe((attachments: IAttachment[]) => (this.attachmentsSharedCollection = attachments));
  }
}
