import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 19114,
  enrollmentStatus: 'ACTIVE',
};

export const sampleWithPartialData: IEnrollment = {
  id: 32005,
  enrollmentStatus: 'REJECTED',
  lastActivityAt: dayjs('2024-06-26T17:19'),
  enrollmentDate: dayjs('2024-06-26T08:29'),
};

export const sampleWithFullData: IEnrollment = {
  id: 20086,
  enrollmentStatus: 'ACTIVE',
  lastActivityAt: dayjs('2024-06-26T11:56'),
  enrollmentDate: dayjs('2024-06-26T11:16'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'PENDING',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
