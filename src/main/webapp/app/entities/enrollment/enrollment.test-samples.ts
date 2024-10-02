import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 1292,
  enrollmentStatus: 'ACTIVE',
};

export const sampleWithPartialData: IEnrollment = {
  id: 12772,
  enrollmentStatus: 'PENDING',
  lastActivityAt: dayjs('2024-06-26T19:55'),
  enrollmentDate: dayjs('2024-06-27T03:17'),
};

export const sampleWithFullData: IEnrollment = {
  id: 22907,
  enrollmentStatus: 'PENDING',
  lastActivityAt: dayjs('2024-06-26T20:29'),
  enrollmentDate: dayjs('2024-06-26T14:15'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'REJECTED',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
