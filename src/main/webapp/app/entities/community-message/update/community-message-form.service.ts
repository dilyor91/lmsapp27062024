import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICommunityMessage, NewCommunityMessage } from '../community-message.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICommunityMessage for edit and NewCommunityMessageFormGroupInput for create.
 */
type CommunityMessageFormGroupInput = ICommunityMessage | PartialWithRequiredKeyOf<NewCommunityMessage>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICommunityMessage | NewCommunityMessage> = Omit<T, 'senderDate'> & {
  senderDate?: string | null;
};

type CommunityMessageFormRawValue = FormValueOf<ICommunityMessage>;

type NewCommunityMessageFormRawValue = FormValueOf<NewCommunityMessage>;

type CommunityMessageFormDefaults = Pick<NewCommunityMessage, 'id' | 'senderDate'>;

type CommunityMessageFormGroupContent = {
  id: FormControl<CommunityMessageFormRawValue['id'] | NewCommunityMessage['id']>;
  message: FormControl<CommunityMessageFormRawValue['message']>;
  senderDate: FormControl<CommunityMessageFormRawValue['senderDate']>;
  community: FormControl<CommunityMessageFormRawValue['community']>;
  sender: FormControl<CommunityMessageFormRawValue['sender']>;
};

export type CommunityMessageFormGroup = FormGroup<CommunityMessageFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CommunityMessageFormService {
  createCommunityMessageFormGroup(communityMessage: CommunityMessageFormGroupInput = { id: null }): CommunityMessageFormGroup {
    const communityMessageRawValue = this.convertCommunityMessageToCommunityMessageRawValue({
      ...this.getFormDefaults(),
      ...communityMessage,
    });
    return new FormGroup<CommunityMessageFormGroupContent>({
      id: new FormControl(
        { value: communityMessageRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      message: new FormControl(communityMessageRawValue.message),
      senderDate: new FormControl(communityMessageRawValue.senderDate),
      community: new FormControl(communityMessageRawValue.community),
      sender: new FormControl(communityMessageRawValue.sender),
    });
  }

  getCommunityMessage(form: CommunityMessageFormGroup): ICommunityMessage | NewCommunityMessage {
    return this.convertCommunityMessageRawValueToCommunityMessage(
      form.getRawValue() as CommunityMessageFormRawValue | NewCommunityMessageFormRawValue,
    );
  }

  resetForm(form: CommunityMessageFormGroup, communityMessage: CommunityMessageFormGroupInput): void {
    const communityMessageRawValue = this.convertCommunityMessageToCommunityMessageRawValue({
      ...this.getFormDefaults(),
      ...communityMessage,
    });
    form.reset(
      {
        ...communityMessageRawValue,
        id: { value: communityMessageRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CommunityMessageFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      senderDate: currentTime,
    };
  }

  private convertCommunityMessageRawValueToCommunityMessage(
    rawCommunityMessage: CommunityMessageFormRawValue | NewCommunityMessageFormRawValue,
  ): ICommunityMessage | NewCommunityMessage {
    return {
      ...rawCommunityMessage,
      senderDate: dayjs(rawCommunityMessage.senderDate, DATE_TIME_FORMAT),
    };
  }

  private convertCommunityMessageToCommunityMessageRawValue(
    communityMessage: ICommunityMessage | (Partial<NewCommunityMessage> & CommunityMessageFormDefaults),
  ): CommunityMessageFormRawValue | PartialWithRequiredKeyOf<NewCommunityMessageFormRawValue> {
    return {
      ...communityMessage,
      senderDate: communityMessage.senderDate ? communityMessage.senderDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
