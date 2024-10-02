import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IMessageToUser, NewMessageToUser } from '../message-to-user.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMessageToUser for edit and NewMessageToUserFormGroupInput for create.
 */
type MessageToUserFormGroupInput = IMessageToUser | PartialWithRequiredKeyOf<NewMessageToUser>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IMessageToUser | NewMessageToUser> = Omit<T, 'readAt'> & {
  readAt?: string | null;
};

type MessageToUserFormRawValue = FormValueOf<IMessageToUser>;

type NewMessageToUserFormRawValue = FormValueOf<NewMessageToUser>;

type MessageToUserFormDefaults = Pick<NewMessageToUser, 'id' | 'read' | 'readAt' | 'deleted'>;

type MessageToUserFormGroupContent = {
  id: FormControl<MessageToUserFormRawValue['id'] | NewMessageToUser['id']>;
  read: FormControl<MessageToUserFormRawValue['read']>;
  readAt: FormControl<MessageToUserFormRawValue['readAt']>;
  deleted: FormControl<MessageToUserFormRawValue['deleted']>;
  message: FormControl<MessageToUserFormRawValue['message']>;
  receiver: FormControl<MessageToUserFormRawValue['receiver']>;
};

export type MessageToUserFormGroup = FormGroup<MessageToUserFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MessageToUserFormService {
  createMessageToUserFormGroup(messageToUser: MessageToUserFormGroupInput = { id: null }): MessageToUserFormGroup {
    const messageToUserRawValue = this.convertMessageToUserToMessageToUserRawValue({
      ...this.getFormDefaults(),
      ...messageToUser,
    });
    return new FormGroup<MessageToUserFormGroupContent>({
      id: new FormControl(
        { value: messageToUserRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      read: new FormControl(messageToUserRawValue.read),
      readAt: new FormControl(messageToUserRawValue.readAt),
      deleted: new FormControl(messageToUserRawValue.deleted),
      message: new FormControl(messageToUserRawValue.message),
      receiver: new FormControl(messageToUserRawValue.receiver),
    });
  }

  getMessageToUser(form: MessageToUserFormGroup): IMessageToUser | NewMessageToUser {
    return this.convertMessageToUserRawValueToMessageToUser(form.getRawValue() as MessageToUserFormRawValue | NewMessageToUserFormRawValue);
  }

  resetForm(form: MessageToUserFormGroup, messageToUser: MessageToUserFormGroupInput): void {
    const messageToUserRawValue = this.convertMessageToUserToMessageToUserRawValue({ ...this.getFormDefaults(), ...messageToUser });
    form.reset(
      {
        ...messageToUserRawValue,
        id: { value: messageToUserRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): MessageToUserFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      read: false,
      readAt: currentTime,
      deleted: false,
    };
  }

  private convertMessageToUserRawValueToMessageToUser(
    rawMessageToUser: MessageToUserFormRawValue | NewMessageToUserFormRawValue,
  ): IMessageToUser | NewMessageToUser {
    return {
      ...rawMessageToUser,
      readAt: dayjs(rawMessageToUser.readAt, DATE_TIME_FORMAT),
    };
  }

  private convertMessageToUserToMessageToUserRawValue(
    messageToUser: IMessageToUser | (Partial<NewMessageToUser> & MessageToUserFormDefaults),
  ): MessageToUserFormRawValue | PartialWithRequiredKeyOf<NewMessageToUserFormRawValue> {
    return {
      ...messageToUser,
      readAt: messageToUser.readAt ? messageToUser.readAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
