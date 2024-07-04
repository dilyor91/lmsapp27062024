import dayjs from 'dayjs/esm';
import { ICourse } from 'app/entities/course/course.model';
import { ICourseWeek } from 'app/entities/course-week/course-week.model';
import { LessonTypeEnum } from 'app/entities/enumerations/lesson-type-enum.model';

export interface ILesson {
  id: number;
  lessonTitle?: string | null;
  startPlanDate?: dayjs.Dayjs | null;
  actualLessonDate?: dayjs.Dayjs | null;
  lessonType?: keyof typeof LessonTypeEnum | null;
  videoUrl?: string | null;
  course?: Pick<ICourse, 'id'> | null;
  courseWeek?: Pick<ICourseWeek, 'id'> | null;
}

export type NewLesson = Omit<ILesson, 'id'> & { id: null };
