import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IMessageAttachment, NewMessageAttachment } from '../message-attachment.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMessageAttachment for edit and NewMessageAttachmentFormGroupInput for create.
 */
type MessageAttachmentFormGroupInput = IMessageAttachment | PartialWithRequiredKeyOf<NewMessageAttachment>;

type MessageAttachmentFormDefaults = Pick<NewMessageAttachment, 'id'>;

type MessageAttachmentFormGroupContent = {
  id: FormControl<IMessageAttachment['id'] | NewMessageAttachment['id']>;
  message: FormControl<IMessageAttachment['message']>;
  attachment: FormControl<IMessageAttachment['attachment']>;
};

export type MessageAttachmentFormGroup = FormGroup<MessageAttachmentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MessageAttachmentFormService {
  createMessageAttachmentFormGroup(messageAttachment: MessageAttachmentFormGroupInput = { id: null }): MessageAttachmentFormGroup {
    const messageAttachmentRawValue = {
      ...this.getFormDefaults(),
      ...messageAttachment,
    };
    return new FormGroup<MessageAttachmentFormGroupContent>({
      id: new FormControl(
        { value: messageAttachmentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      message: new FormControl(messageAttachmentRawValue.message),
      attachment: new FormControl(messageAttachmentRawValue.attachment),
    });
  }

  getMessageAttachment(form: MessageAttachmentFormGroup): IMessageAttachment | NewMessageAttachment {
    return form.getRawValue() as IMessageAttachment | NewMessageAttachment;
  }

  resetForm(form: MessageAttachmentFormGroup, messageAttachment: MessageAttachmentFormGroupInput): void {
    const messageAttachmentRawValue = { ...this.getFormDefaults(), ...messageAttachment };
    form.reset(
      {
        ...messageAttachmentRawValue,
        id: { value: messageAttachmentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): MessageAttachmentFormDefaults {
    return {
      id: null,
    };
  }
}
