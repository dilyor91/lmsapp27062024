import { ICommunity } from 'app/entities/community/community.model';
import { ITag } from 'app/entities/tag/tag.model';

export interface ICommunityTag {
  id: number;
  community?: Pick<ICommunity, 'id'> | null;
  tag?: Pick<ITag, 'id'> | null;
}

export type NewCommunityTag = Omit<ICommunityTag, 'id'> & { id: null };
