import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 9768,
  enrollmentStatus: 'PENDING',
};

export const sampleWithPartialData: IEnrollment = {
  id: 11279,
  enrollmentStatus: 'ACTIVE',
  lastActivityAt: dayjs('2024-06-27T05:08'),
};

export const sampleWithFullData: IEnrollment = {
  id: 7162,
  enrollmentStatus: 'ACTIVE',
  lastActivityAt: dayjs('2024-06-27T05:16'),
  enrollmentDate: dayjs('2024-06-26T10:54'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
