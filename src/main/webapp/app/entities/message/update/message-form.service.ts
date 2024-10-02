import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IMessage, NewMessage } from '../message.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMessage for edit and NewMessageFormGroupInput for create.
 */
type MessageFormGroupInput = IMessage | PartialWithRequiredKeyOf<NewMessage>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IMessage | NewMessage> = Omit<T, 'senderDate'> & {
  senderDate?: string | null;
};

type MessageFormRawValue = FormValueOf<IMessage>;

type NewMessageFormRawValue = FormValueOf<NewMessage>;

type MessageFormDefaults = Pick<NewMessage, 'id' | 'toAllCourseStudents' | 'senderDate' | 'deleted'>;

type MessageFormGroupContent = {
  id: FormControl<MessageFormRawValue['id'] | NewMessage['id']>;
  subject: FormControl<MessageFormRawValue['subject']>;
  body: FormControl<MessageFormRawValue['body']>;
  toAllCourseStudents: FormControl<MessageFormRawValue['toAllCourseStudents']>;
  toSectionIds: FormControl<MessageFormRawValue['toSectionIds']>;
  senderDate: FormControl<MessageFormRawValue['senderDate']>;
  deleted: FormControl<MessageFormRawValue['deleted']>;
  course: FormControl<MessageFormRawValue['course']>;
  sender: FormControl<MessageFormRawValue['sender']>;
};

export type MessageFormGroup = FormGroup<MessageFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MessageFormService {
  createMessageFormGroup(message: MessageFormGroupInput = { id: null }): MessageFormGroup {
    const messageRawValue = this.convertMessageToMessageRawValue({
      ...this.getFormDefaults(),
      ...message,
    });
    return new FormGroup<MessageFormGroupContent>({
      id: new FormControl(
        { value: messageRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      subject: new FormControl(messageRawValue.subject),
      body: new FormControl(messageRawValue.body),
      toAllCourseStudents: new FormControl(messageRawValue.toAllCourseStudents),
      toSectionIds: new FormControl(messageRawValue.toSectionIds),
      senderDate: new FormControl(messageRawValue.senderDate),
      deleted: new FormControl(messageRawValue.deleted),
      course: new FormControl(messageRawValue.course),
      sender: new FormControl(messageRawValue.sender),
    });
  }

  getMessage(form: MessageFormGroup): IMessage | NewMessage {
    return this.convertMessageRawValueToMessage(form.getRawValue() as MessageFormRawValue | NewMessageFormRawValue);
  }

  resetForm(form: MessageFormGroup, message: MessageFormGroupInput): void {
    const messageRawValue = this.convertMessageToMessageRawValue({ ...this.getFormDefaults(), ...message });
    form.reset(
      {
        ...messageRawValue,
        id: { value: messageRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): MessageFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      toAllCourseStudents: false,
      senderDate: currentTime,
      deleted: false,
    };
  }

  private convertMessageRawValueToMessage(rawMessage: MessageFormRawValue | NewMessageFormRawValue): IMessage | NewMessage {
    return {
      ...rawMessage,
      senderDate: dayjs(rawMessage.senderDate, DATE_TIME_FORMAT),
    };
  }

  private convertMessageToMessageRawValue(
    message: IMessage | (Partial<NewMessage> & MessageFormDefaults),
  ): MessageFormRawValue | PartialWithRequiredKeyOf<NewMessageFormRawValue> {
    return {
      ...message,
      senderDate: message.senderDate ? message.senderDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
