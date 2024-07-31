import { IAttendance, NewAttendance } from './attendance.model';

export const sampleWithRequiredData: IAttendance = {
  id: 31296,
};

export const sampleWithPartialData: IAttendance = {
  id: 32276,
  attendanceEnum: 'LATE',
};

export const sampleWithFullData: IAttendance = {
  id: 19179,
  attendanceEnum: 'ABSENT',
};

export const sampleWithNewData: NewAttendance = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
