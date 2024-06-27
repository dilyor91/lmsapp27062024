import { IStudent } from 'app/entities/student/student.model';
import { ILesson } from 'app/entities/lesson/lesson.model';
import { AttendanceEnum } from 'app/entities/enumerations/attendance-enum.model';

export interface IAttendance {
  id: number;
  attendanceEnum?: keyof typeof AttendanceEnum | null;
  student?: Pick<IStudent, 'id'> | null;
  lesson?: Pick<ILesson, 'id'> | null;
}

export type NewAttendance = Omit<IAttendance, 'id'> & { id: null };
