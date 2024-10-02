import { IMessage } from 'app/entities/message/message.model';
import { IAttachment } from 'app/entities/attachment/attachment.model';

export interface IMessageAttachment {
  id: number;
  message?: Pick<IMessage, 'id'> | null;
  attachment?: Pick<IAttachment, 'id'> | null;
}

export type NewMessageAttachment = Omit<IMessageAttachment, 'id'> & { id: null };
