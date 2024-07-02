import { IAttendance, NewAttendance } from './attendance.model';

export const sampleWithRequiredData: IAttendance = {
  id: 18740,
};

export const sampleWithPartialData: IAttendance = {
  id: 3190,
  attendanceEnum: 'ABSENT',
};

export const sampleWithFullData: IAttendance = {
  id: 30978,
  attendanceEnum: 'ABSENT',
};

export const sampleWithNewData: NewAttendance = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
