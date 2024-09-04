import dayjs from 'dayjs/esm';
import { IAttachment } from 'app/entities/attachment/attachment.model';
import { ICourse } from 'app/entities/course/course.model';

export interface IAnnouncement {
  id: number;
  title?: string | null;
  content?: string | null;
  availableFromDate?: dayjs.Dayjs | null;
  availableUntilDate?: dayjs.Dayjs | null;
  published?: boolean | null;
  attachment?: Pick<IAttachment, 'id'> | null;
  course?: Pick<ICourse, 'id'> | null;
}

export type NewAnnouncement = Omit<IAnnouncement, 'id'> & { id: null };
