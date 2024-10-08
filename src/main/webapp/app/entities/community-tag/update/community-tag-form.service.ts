import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICommunityTag, NewCommunityTag } from '../community-tag.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICommunityTag for edit and NewCommunityTagFormGroupInput for create.
 */
type CommunityTagFormGroupInput = ICommunityTag | PartialWithRequiredKeyOf<NewCommunityTag>;

type CommunityTagFormDefaults = Pick<NewCommunityTag, 'id'>;

type CommunityTagFormGroupContent = {
  id: FormControl<ICommunityTag['id'] | NewCommunityTag['id']>;
  community: FormControl<ICommunityTag['community']>;
  tag: FormControl<ICommunityTag['tag']>;
};

export type CommunityTagFormGroup = FormGroup<CommunityTagFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CommunityTagFormService {
  createCommunityTagFormGroup(communityTag: CommunityTagFormGroupInput = { id: null }): CommunityTagFormGroup {
    const communityTagRawValue = {
      ...this.getFormDefaults(),
      ...communityTag,
    };
    return new FormGroup<CommunityTagFormGroupContent>({
      id: new FormControl(
        { value: communityTagRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      community: new FormControl(communityTagRawValue.community),
      tag: new FormControl(communityTagRawValue.tag),
    });
  }

  getCommunityTag(form: CommunityTagFormGroup): ICommunityTag | NewCommunityTag {
    return form.getRawValue() as ICommunityTag | NewCommunityTag;
  }

  resetForm(form: CommunityTagFormGroup, communityTag: CommunityTagFormGroupInput): void {
    const communityTagRawValue = { ...this.getFormDefaults(), ...communityTag };
    form.reset(
      {
        ...communityTagRawValue,
        id: { value: communityTagRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CommunityTagFormDefaults {
    return {
      id: null,
    };
  }
}
