import { IAttendance, NewAttendance } from './attendance.model';

export const sampleWithRequiredData: IAttendance = {
  id: 25248,
};

export const sampleWithPartialData: IAttendance = {
  id: 8628,
};

export const sampleWithFullData: IAttendance = {
  id: 27694,
  attendanceEnum: 'ABSENT',
};

export const sampleWithNewData: NewAttendance = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
