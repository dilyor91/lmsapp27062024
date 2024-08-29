import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 14474,
  enrollmentStatus: 'REJECTED',
};

export const sampleWithPartialData: IEnrollment = {
  id: 17232,
  enrollmentStatus: 'PENDING',
  lastActivityAt: dayjs('2024-06-26T23:35'),
};

export const sampleWithFullData: IEnrollment = {
  id: 11278,
  enrollmentStatus: 'ACTIVE',
  lastActivityAt: dayjs('2024-06-27T04:32'),
  enrollmentDate: dayjs('2024-06-26T20:07'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'REJECTED',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
