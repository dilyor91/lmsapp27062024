import { ICommunity } from 'app/entities/community/community.model';
import { IAttachment } from 'app/entities/attachment/attachment.model';

export interface ICommunityAttachment {
  id: number;
  community?: Pick<ICommunity, 'id'> | null;
  attachment?: Pick<IAttachment, 'id'> | null;
}

export type NewCommunityAttachment = Omit<ICommunityAttachment, 'id'> & { id: null };
