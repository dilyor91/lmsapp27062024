import { IAttendance, NewAttendance } from './attendance.model';

export const sampleWithRequiredData: IAttendance = {
  id: 20791,
};

export const sampleWithPartialData: IAttendance = {
  id: 26426,
  attendanceEnum: 'PRESENT',
};

export const sampleWithFullData: IAttendance = {
  id: 9315,
  attendanceEnum: 'LATE',
};

export const sampleWithNewData: NewAttendance = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
