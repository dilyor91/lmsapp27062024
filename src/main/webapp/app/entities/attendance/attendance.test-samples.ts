import { IAttendance, NewAttendance } from './attendance.model';

export const sampleWithRequiredData: IAttendance = {
  id: 8632,
};

export const sampleWithPartialData: IAttendance = {
  id: 15915,
  attendanceEnum: 'LATE',
};

export const sampleWithFullData: IAttendance = {
  id: 11057,
  attendanceEnum: 'LATE',
};

export const sampleWithNewData: NewAttendance = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
