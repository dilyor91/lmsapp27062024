import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAttachment } from '../attachment.model';
import { AttachmentService } from '../service/attachment.service';
import { AttachmentFormGroup, AttachmentFormService } from './attachment-form.service';

@Component({
  standalone: true,
  selector: 'jhi-attachment-update',
  templateUrl: './attachment-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AttachmentUpdateComponent implements OnInit {
  isSaving = false;
  attachment: IAttachment | null = null;

  protected attachmentService = inject(AttachmentService);
  protected attachmentFormService = inject(AttachmentFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AttachmentFormGroup = this.attachmentFormService.createAttachmentFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ attachment }) => {
      this.attachment = attachment;
      if (attachment) {
        this.updateForm(attachment);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const attachment = this.attachmentFormService.getAttachment(this.editForm);
    this.subscribeToSaveResponse(this.attachmentService.create(attachment));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttachment>>): void {
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

  protected updateForm(attachment: IAttachment): void {
    this.attachment = attachment;
    this.attachmentFormService.resetForm(this.editForm, attachment);
  }
}
