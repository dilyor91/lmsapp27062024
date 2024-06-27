import { IAttendanceDetail, NewAttendanceDetail } from './attendance-detail.model';

export const sampleWithRequiredData: IAttendanceDetail = {
  id: 14293,
};

export const sampleWithPartialData: IAttendanceDetail = {
  id: 15523,
  attendanceEnum: 'PRESENT',
};

export const sampleWithFullData: IAttendanceDetail = {
  id: 24156,
  attendanceEnum: 'LATE',
};

export const sampleWithNewData: NewAttendanceDetail = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
