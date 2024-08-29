import { IAttendance, NewAttendance } from './attendance.model';

export const sampleWithRequiredData: IAttendance = {
  id: 8913,
};

export const sampleWithPartialData: IAttendance = {
  id: 14378,
};

export const sampleWithFullData: IAttendance = {
  id: 7601,
  attendanceEnum: 'PRESENT',
};

export const sampleWithNewData: NewAttendance = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
