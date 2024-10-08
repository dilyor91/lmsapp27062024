import { IAttendance, NewAttendance } from './attendance.model';

export const sampleWithRequiredData: IAttendance = {
  id: 26692,
};

export const sampleWithPartialData: IAttendance = {
  id: 3137,
  attendanceEnum: 'LATE',
};

export const sampleWithFullData: IAttendance = {
  id: 4313,
  attendanceEnum: 'ABSENT',
};

export const sampleWithNewData: NewAttendance = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
