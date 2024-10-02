import dayjs from 'dayjs/esm';
import { IMessage } from 'app/entities/message/message.model';
import { IUser } from 'app/entities/user/user.model';

export interface IMessageToUser {
  id: number;
  read?: boolean | null;
  readAt?: dayjs.Dayjs | null;
  deleted?: boolean | null;
  message?: Pick<IMessage, 'id'> | null;
  receiver?: Pick<IUser, 'id'> | null;
}

export type NewMessageToUser = Omit<IMessageToUser, 'id'> & { id: null };
