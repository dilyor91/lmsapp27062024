import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 16350,
  enrollmentStatus: 'ACTIVE',
};

export const sampleWithPartialData: IEnrollment = {
  id: 7289,
  enrollmentStatus: 'REJECTED',
  lastActivityAt: dayjs('2024-06-26T19:53'),
  enrollmentDate: dayjs('2024-06-26T16:43'),
};

export const sampleWithFullData: IEnrollment = {
  id: 11859,
  enrollmentStatus: 'REJECTED',
  lastActivityAt: dayjs('2024-06-26T06:52'),
  enrollmentDate: dayjs('2024-06-26T22:00'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'PENDING',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
