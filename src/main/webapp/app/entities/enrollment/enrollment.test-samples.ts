import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 32458,
  enrollmentStatus: 'REJECTED',
};

export const sampleWithPartialData: IEnrollment = {
  id: 29708,
  enrollmentStatus: 'PENDING',
};

export const sampleWithFullData: IEnrollment = {
  id: 11973,
  enrollmentStatus: 'PENDING',
  lastActivityAt: dayjs('2024-06-26T08:47'),
  enrollmentDate: dayjs('2024-06-26T22:06'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'PENDING',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
