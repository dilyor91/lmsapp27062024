import { IAttendance, NewAttendance } from './attendance.model';

export const sampleWithRequiredData: IAttendance = {
  id: 21123,
};

export const sampleWithPartialData: IAttendance = {
  id: 1520,
};

export const sampleWithFullData: IAttendance = {
  id: 19224,
  attendanceEnum: 'LATE',
};

export const sampleWithNewData: NewAttendance = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
