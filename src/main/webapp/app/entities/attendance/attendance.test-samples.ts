import { IAttendance, NewAttendance } from './attendance.model';

export const sampleWithRequiredData: IAttendance = {
  id: 16627,
};

export const sampleWithPartialData: IAttendance = {
  id: 26461,
};

export const sampleWithFullData: IAttendance = {
  id: 364,
  attendanceEnum: 'ABSENT',
};

export const sampleWithNewData: NewAttendance = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
