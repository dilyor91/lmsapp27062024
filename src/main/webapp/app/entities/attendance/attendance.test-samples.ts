import { IAttendance, NewAttendance } from './attendance.model';

export const sampleWithRequiredData: IAttendance = {
  id: 14931,
};

export const sampleWithPartialData: IAttendance = {
  id: 139,
  attendanceEnum: 'PRESENT',
};

export const sampleWithFullData: IAttendance = {
  id: 29187,
  attendanceEnum: 'PRESENT',
};

export const sampleWithNewData: NewAttendance = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
