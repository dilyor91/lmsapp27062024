import { IAttendance, NewAttendance } from './attendance.model';

export const sampleWithRequiredData: IAttendance = {
  id: 2547,
};

export const sampleWithPartialData: IAttendance = {
  id: 8341,
};

export const sampleWithFullData: IAttendance = {
  id: 13441,
  attendanceEnum: 'ABSENT',
};

export const sampleWithNewData: NewAttendance = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
