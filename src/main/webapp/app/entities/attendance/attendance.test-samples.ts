import { IAttendance, NewAttendance } from './attendance.model';

export const sampleWithRequiredData: IAttendance = {
  id: 26210,
};

export const sampleWithPartialData: IAttendance = {
  id: 19970,
  attendanceEnum: 'LATE',
};

export const sampleWithFullData: IAttendance = {
  id: 17237,
  attendanceEnum: 'ABSENT',
};

export const sampleWithNewData: NewAttendance = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
