import { IUser } from 'app/entities/user/user.model';

export interface ICommunity {
  id: number;
  title?: string | null;
  body?: string | null;
  setAsAnonymous?: boolean | null;
  onlyMe?: boolean | null;
  toAllStudents?: boolean | null;
  status?: boolean | null;
  user?: Pick<IUser, 'id'> | null;
}

export type NewCommunity = Omit<ICommunity, 'id'> & { id: null };
