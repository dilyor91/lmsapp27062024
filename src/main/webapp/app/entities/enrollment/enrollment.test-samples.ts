import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 19621,
  enrollmentStatus: 'PENDING',
};

export const sampleWithPartialData: IEnrollment = {
  id: 19276,
  enrollmentStatus: 'PENDING',
};

export const sampleWithFullData: IEnrollment = {
  id: 3578,
  enrollmentStatus: 'REJECTED',
  lastActivityAt: dayjs('2024-06-26T23:43'),
  enrollmentDate: dayjs('2024-06-26T10:28'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
