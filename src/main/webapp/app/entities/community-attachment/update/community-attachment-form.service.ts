import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICommunityAttachment, NewCommunityAttachment } from '../community-attachment.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICommunityAttachment for edit and NewCommunityAttachmentFormGroupInput for create.
 */
type CommunityAttachmentFormGroupInput = ICommunityAttachment | PartialWithRequiredKeyOf<NewCommunityAttachment>;

type CommunityAttachmentFormDefaults = Pick<NewCommunityAttachment, 'id'>;

type CommunityAttachmentFormGroupContent = {
  id: FormControl<ICommunityAttachment['id'] | NewCommunityAttachment['id']>;
  community: FormControl<ICommunityAttachment['community']>;
  attachment: FormControl<ICommunityAttachment['attachment']>;
};

export type CommunityAttachmentFormGroup = FormGroup<CommunityAttachmentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CommunityAttachmentFormService {
  createCommunityAttachmentFormGroup(communityAttachment: CommunityAttachmentFormGroupInput = { id: null }): CommunityAttachmentFormGroup {
    const communityAttachmentRawValue = {
      ...this.getFormDefaults(),
      ...communityAttachment,
    };
    return new FormGroup<CommunityAttachmentFormGroupContent>({
      id: new FormControl(
        { value: communityAttachmentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      community: new FormControl(communityAttachmentRawValue.community),
      attachment: new FormControl(communityAttachmentRawValue.attachment),
    });
  }

  getCommunityAttachment(form: CommunityAttachmentFormGroup): ICommunityAttachment | NewCommunityAttachment {
    return form.getRawValue() as ICommunityAttachment | NewCommunityAttachment;
  }

  resetForm(form: CommunityAttachmentFormGroup, communityAttachment: CommunityAttachmentFormGroupInput): void {
    const communityAttachmentRawValue = { ...this.getFormDefaults(), ...communityAttachment };
    form.reset(
      {
        ...communityAttachmentRawValue,
        id: { value: communityAttachmentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CommunityAttachmentFormDefaults {
    return {
      id: null,
    };
  }
}
