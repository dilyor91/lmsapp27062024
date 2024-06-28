import { IAttendance, NewAttendance } from './attendance.model';

export const sampleWithRequiredData: IAttendance = {
  id: 4848,
};

export const sampleWithPartialData: IAttendance = {
  id: 29936,
  attendanceEnum: 'LATE',
};

export const sampleWithFullData: IAttendance = {
  id: 8038,
  attendanceEnum: 'ABSENT',
};

export const sampleWithNewData: NewAttendance = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
