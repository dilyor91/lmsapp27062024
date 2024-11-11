import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';

export interface IActivity {
  id: number;
  activityDate?: dayjs.Dayjs | null;
  user?: Pick<IUser, 'id'> | null;
}

export type NewActivity = Omit<IActivity, 'id'> & { id: null };
