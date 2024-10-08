import { ICommunity } from 'app/entities/community/community.model';
import { ICourse } from 'app/entities/course/course.model';

export interface ICommunityCourse {
  id: number;
  community?: Pick<ICommunity, 'id'> | null;
  course?: Pick<ICourse, 'id'> | null;
}

export type NewCommunityCourse = Omit<ICommunityCourse, 'id'> & { id: null };
