import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 14708,
  enrollmentStatus: 'PENDING',
};

export const sampleWithPartialData: IEnrollment = {
  id: 29637,
  enrollmentStatus: 'ACTIVE',
};

export const sampleWithFullData: IEnrollment = {
  id: 12263,
  enrollmentStatus: 'REJECTED',
  lastActivityAt: dayjs('2024-06-27T02:26'),
  enrollmentDate: dayjs('2024-06-26T19:33'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'REJECTED',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
