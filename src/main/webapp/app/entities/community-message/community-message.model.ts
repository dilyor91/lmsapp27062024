import dayjs from 'dayjs/esm';
import { ICommunity } from 'app/entities/community/community.model';
import { IUser } from 'app/entities/user/user.model';

export interface ICommunityMessage {
  id: number;
  message?: string | null;
  senderDate?: dayjs.Dayjs | null;
  community?: Pick<ICommunity, 'id'> | null;
  sender?: Pick<IUser, 'id'> | null;
}

export type NewCommunityMessage = Omit<ICommunityMessage, 'id'> & { id: null };
