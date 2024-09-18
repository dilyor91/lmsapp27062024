import { IAttendance, NewAttendance } from './attendance.model';

export const sampleWithRequiredData: IAttendance = {
  id: 4686,
};

export const sampleWithPartialData: IAttendance = {
  id: 22942,
};

export const sampleWithFullData: IAttendance = {
  id: 28935,
  attendanceEnum: 'LATE',
};

export const sampleWithNewData: NewAttendance = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
