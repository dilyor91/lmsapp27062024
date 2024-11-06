import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 22175,
  enrollmentStatus: 'REJECTED',
};

export const sampleWithPartialData: IEnrollment = {
  id: 5316,
  enrollmentStatus: 'REJECTED',
  lastActivityAt: dayjs('2024-06-26T22:58'),
  enrollmentDate: dayjs('2024-06-27T02:04'),
};

export const sampleWithFullData: IEnrollment = {
  id: 29115,
  enrollmentStatus: 'PENDING',
  lastActivityAt: dayjs('2024-06-26T15:11'),
  enrollmentDate: dayjs('2024-06-27T04:01'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'REJECTED',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
