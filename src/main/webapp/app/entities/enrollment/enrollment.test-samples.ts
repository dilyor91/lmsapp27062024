import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 31892,
  enrollmentStatus: 'ACTIVE',
};

export const sampleWithPartialData: IEnrollment = {
  id: 5129,
  enrollmentStatus: 'ACTIVE',
  lastActivityAt: dayjs('2024-06-26T11:17'),
};

export const sampleWithFullData: IEnrollment = {
  id: 19693,
  enrollmentStatus: 'REJECTED',
  lastActivityAt: dayjs('2024-06-26T13:39'),
  enrollmentDate: dayjs('2024-06-26T08:06'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'PENDING',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
