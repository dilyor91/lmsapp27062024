import { IAttendance } from 'app/entities/attendance/attendance.model';
import { IUser } from 'app/entities/user/user.model';
import { AttendanceEnum } from 'app/entities/enumerations/attendance-enum.model';

export interface IAttendanceDetail {
  id: number;
  attendanceEnum?: keyof typeof AttendanceEnum | null;
  attendance?: Pick<IAttendance, 'id'> | null;
  student?: Pick<IUser, 'id'> | null;
}

export type NewAttendanceDetail = Omit<IAttendanceDetail, 'id'> & { id: null };
