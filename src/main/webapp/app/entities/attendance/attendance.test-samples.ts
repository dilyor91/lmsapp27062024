import { IAttendance, NewAttendance } from './attendance.model';

export const sampleWithRequiredData: IAttendance = {
  id: 23071,
};

export const sampleWithPartialData: IAttendance = {
  id: 24473,
  attendanceEnum: 'ABSENT',
};

export const sampleWithFullData: IAttendance = {
  id: 2100,
  attendanceEnum: 'LATE',
};

export const sampleWithNewData: NewAttendance = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
