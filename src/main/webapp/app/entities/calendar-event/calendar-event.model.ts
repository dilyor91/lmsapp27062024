import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';
import { EventFrequency } from 'app/entities/enumerations/event-frequency.model';

export interface ICalendarEvent {
  id: number;
  title?: string | null;
  content?: string | null;
  date?: dayjs.Dayjs | null;
  startTime?: number | null;
  endTime?: number | null;
  location?: string | null;
  address?: string | null;
  eventFrequency?: keyof typeof EventFrequency | null;
  user?: Pick<IUser, 'id'> | null;
}

export type NewCalendarEvent = Omit<ICalendarEvent, 'id'> & { id: null };
