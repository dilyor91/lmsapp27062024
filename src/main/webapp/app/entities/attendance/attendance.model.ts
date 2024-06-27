import { IStudent } from 'app/entities/student/student.model';
import { ILesson } from 'app/entities/lesson/lesson.model';
import { ICourse } from 'app/entities/course/course.model';
import { ICourseSection } from 'app/entities/course-section/course-section.model';
import { IUser } from 'app/entities/user/user.model';
import { AttendanceEnum } from 'app/entities/enumerations/attendance-enum.model';

export interface IAttendance {
  id: number;
  attendanceEnum?: keyof typeof AttendanceEnum | null;
  student?: Pick<IStudent, 'id'> | null;
  lesson?: Pick<ILesson, 'id'> | null;
  course?: Pick<ICourse, 'id'> | null;
  courseSection?: Pick<ICourseSection, 'id'> | null;
  teacher?: Pick<IUser, 'id'> | null;
}

export type NewAttendance = Omit<IAttendance, 'id'> & { id: null };
