import { IAttendance, NewAttendance } from './attendance.model';

export const sampleWithRequiredData: IAttendance = {
  id: 8452,
};

export const sampleWithPartialData: IAttendance = {
  id: 17486,
  attendanceEnum: 'LATE',
};

export const sampleWithFullData: IAttendance = {
  id: 1326,
  attendanceEnum: 'ABSENT',
};

export const sampleWithNewData: NewAttendance = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
