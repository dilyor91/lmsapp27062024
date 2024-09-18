import dayjs from 'dayjs/esm';
import { IAnnouncement } from 'app/entities/announcement/announcement.model';
import { IStudent } from 'app/entities/student/student.model';

export interface IAnnouncementStudentRead {
  id: number;
  read?: boolean | null;
  readAt?: dayjs.Dayjs | null;
  announcement?: Pick<IAnnouncement, 'id'> | null;
  student?: Pick<IStudent, 'id'> | null;
}

export type NewAnnouncementStudentRead = Omit<IAnnouncementStudentRead, 'id'> & { id: null };
