import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 1877,
  enrollmentStatus: 'REJECTED',
};

export const sampleWithPartialData: IEnrollment = {
  id: 10416,
  enrollmentStatus: 'PENDING',
  enrollmentDate: dayjs('2024-06-27T01:41'),
};

export const sampleWithFullData: IEnrollment = {
  id: 11443,
  enrollmentStatus: 'PENDING',
  lastActivityAt: dayjs('2024-06-27T04:58'),
  enrollmentDate: dayjs('2024-06-26T06:48'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'PENDING',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
