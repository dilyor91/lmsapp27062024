import dayjs from 'dayjs/esm';
import { ICourse } from 'app/entities/course/course.model';
import { IUser } from 'app/entities/user/user.model';

export interface IMessage {
  id: number;
  subject?: string | null;
  body?: string | null;
  toAllCourseStudents?: boolean | null;
  toSectionIds?: string | null;
  senderDate?: dayjs.Dayjs | null;
  deleted?: boolean | null;
  course?: Pick<ICourse, 'id'> | null;
  sender?: Pick<IUser, 'id'> | null;
}

export type NewMessage = Omit<IMessage, 'id'> & { id: null };
