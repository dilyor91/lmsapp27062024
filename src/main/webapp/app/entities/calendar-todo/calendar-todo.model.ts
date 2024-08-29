import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';

export interface ICalendarTodo {
  id: number;
  title?: string | null;
  date?: dayjs.Dayjs | null;
  time?: string | null;
  details?: string | null;
  user?: Pick<IUser, 'id'> | null;
}

export type NewCalendarTodo = Omit<ICalendarTodo, 'id'> & { id: null };
