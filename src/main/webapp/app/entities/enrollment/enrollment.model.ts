import dayjs from 'dayjs/esm';
import { IStudent } from 'app/entities/student/student.model';
import { ICourseSection } from 'app/entities/course-section/course-section.model';
import { ICourse } from 'app/entities/course/course.model';
import { EnrollmentStatusEnum } from 'app/entities/enumerations/enrollment-status-enum.model';

export interface IEnrollment {
  id: number;
  enrollmentStatus?: keyof typeof EnrollmentStatusEnum | null;
  lastActivityAt?: dayjs.Dayjs | null;
  enrollmentDate?: dayjs.Dayjs | null;
  student?: Pick<IStudent, 'id'> | null;
  courseSection?: Pick<ICourseSection, 'id'> | null;
  course?: Pick<ICourse, 'id'> | null;
}

export type NewEnrollment = Omit<IEnrollment, 'id'> & { id: null };
