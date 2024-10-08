import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICommunity, NewCommunity } from '../community.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICommunity for edit and NewCommunityFormGroupInput for create.
 */
type CommunityFormGroupInput = ICommunity | PartialWithRequiredKeyOf<NewCommunity>;

type CommunityFormDefaults = Pick<NewCommunity, 'id' | 'setAsAnonymous' | 'onlyMe' | 'toAllStudents' | 'status'>;

type CommunityFormGroupContent = {
  id: FormControl<ICommunity['id'] | NewCommunity['id']>;
  title: FormControl<ICommunity['title']>;
  body: FormControl<ICommunity['body']>;
  setAsAnonymous: FormControl<ICommunity['setAsAnonymous']>;
  onlyMe: FormControl<ICommunity['onlyMe']>;
  toAllStudents: FormControl<ICommunity['toAllStudents']>;
  status: FormControl<ICommunity['status']>;
  user: FormControl<ICommunity['user']>;
};

export type CommunityFormGroup = FormGroup<CommunityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CommunityFormService {
  createCommunityFormGroup(community: CommunityFormGroupInput = { id: null }): CommunityFormGroup {
    const communityRawValue = {
      ...this.getFormDefaults(),
      ...community,
    };
    return new FormGroup<CommunityFormGroupContent>({
      id: new FormControl(
        { value: communityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      title: new FormControl(communityRawValue.title),
      body: new FormControl(communityRawValue.body),
      setAsAnonymous: new FormControl(communityRawValue.setAsAnonymous),
      onlyMe: new FormControl(communityRawValue.onlyMe),
      toAllStudents: new FormControl(communityRawValue.toAllStudents),
      status: new FormControl(communityRawValue.status),
      user: new FormControl(communityRawValue.user),
    });
  }

  getCommunity(form: CommunityFormGroup): ICommunity | NewCommunity {
    return form.getRawValue() as ICommunity | NewCommunity;
  }

  resetForm(form: CommunityFormGroup, community: CommunityFormGroupInput): void {
    const communityRawValue = { ...this.getFormDefaults(), ...community };
    form.reset(
      {
        ...communityRawValue,
        id: { value: communityRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CommunityFormDefaults {
    return {
      id: null,
      setAsAnonymous: false,
      onlyMe: false,
      toAllStudents: false,
      status: false,
    };
  }
}
