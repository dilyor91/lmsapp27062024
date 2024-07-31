import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 5876,
  enrollmentStatus: 'PENDING',
};

export const sampleWithPartialData: IEnrollment = {
  id: 3554,
  enrollmentStatus: 'ACTIVE',
  enrollmentDate: dayjs('2024-06-26T17:10'),
};

export const sampleWithFullData: IEnrollment = {
  id: 28481,
  enrollmentStatus: 'REJECTED',
  lastActivityAt: dayjs('2024-06-27T01:42'),
  enrollmentDate: dayjs('2024-06-26T23:53'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'PENDING',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
