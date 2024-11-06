import { IAttendance, NewAttendance } from './attendance.model';

export const sampleWithRequiredData: IAttendance = {
  id: 28485,
};

export const sampleWithPartialData: IAttendance = {
  id: 27097,
};

export const sampleWithFullData: IAttendance = {
  id: 30405,
  attendanceEnum: 'ABSENT',
};

export const sampleWithNewData: NewAttendance = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
