import dayjs from 'dayjs/esm';
import { IAssignment } from 'app/entities/assignment/assignment.model';
import { ICourse } from 'app/entities/course/course.model';
import { ICourseSection } from 'app/entities/course-section/course-section.model';

export interface IAssignmentCourseSection {
  id: number;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  assignment?: Pick<IAssignment, 'id'> | null;
  course?: Pick<ICourse, 'id'> | null;
  courseSection?: Pick<ICourseSection, 'id'> | null;
}

export type NewAssignmentCourseSection = Omit<IAssignmentCourseSection, 'id'> & { id: null };
