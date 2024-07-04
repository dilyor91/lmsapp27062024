import dayjs from 'dayjs/esm';
import { ICourse } from 'app/entities/course/course.model';

export interface ICourseWeekInfo {
  id: number;
  totalWeek?: number | null;
  lessonPerWeek?: number | null;
  startDate?: dayjs.Dayjs | null;
  weekDayCount?: number | null;
  course?: Pick<ICourse, 'id'> | null;
}

export type NewCourseWeekInfo = Omit<ICourseWeekInfo, 'id'> & { id: null };
