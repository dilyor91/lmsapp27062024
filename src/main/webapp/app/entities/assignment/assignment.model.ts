import dayjs from 'dayjs/esm';
import { ICourse } from 'app/entities/course/course.model';
import { ICourseSection } from 'app/entities/course-section/course-section.model';
import { SubmissionTypeEnum } from 'app/entities/enumerations/submission-type-enum.model';

export interface IAssignment {
  id: number;
  name?: string | null;
  content?: string | null;
  points?: number | null;
  submissionType?: keyof typeof SubmissionTypeEnum | null;
  allowedAttempts?: number | null;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  dueDate?: dayjs.Dayjs | null;
  published?: boolean | null;
  course?: Pick<ICourse, 'id'> | null;
  courseSections?: Pick<ICourseSection, 'id'>[] | null;
}

export type NewAssignment = Omit<IAssignment, 'id'> & { id: null };
