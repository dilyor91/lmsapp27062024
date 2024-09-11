import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 18701,
  enrollmentStatus: 'PENDING',
};

export const sampleWithPartialData: IEnrollment = {
  id: 6888,
  enrollmentStatus: 'PENDING',
};

export const sampleWithFullData: IEnrollment = {
  id: 14138,
  enrollmentStatus: 'ACTIVE',
  lastActivityAt: dayjs('2024-06-26T18:41'),
  enrollmentDate: dayjs('2024-06-27T00:53'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'REJECTED',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
