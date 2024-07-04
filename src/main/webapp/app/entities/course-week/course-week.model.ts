import dayjs from 'dayjs/esm';
import { ICourse } from 'app/entities/course/course.model';

export interface ICourseWeek {
  id: number;
  name?: string | null;
  published?: boolean | null;
  weekDate?: dayjs.Dayjs | null;
  course?: Pick<ICourse, 'id'> | null;
}

export type NewCourseWeek = Omit<ICourseWeek, 'id'> & { id: null };
