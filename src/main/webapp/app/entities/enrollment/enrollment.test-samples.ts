import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 29885,
  enrollmentStatus: 'ACTIVE',
};

export const sampleWithPartialData: IEnrollment = {
  id: 25026,
  enrollmentStatus: 'REJECTED',
  lastActivityAt: dayjs('2024-06-26T14:52'),
};

export const sampleWithFullData: IEnrollment = {
  id: 20333,
  enrollmentStatus: 'REJECTED',
  lastActivityAt: dayjs('2024-06-26T12:24'),
  enrollmentDate: dayjs('2024-06-27T05:11'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'PENDING',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
