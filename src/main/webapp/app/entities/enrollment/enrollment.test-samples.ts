import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 26808,
  enrollmentStatus: 'ACTIVE',
};

export const sampleWithPartialData: IEnrollment = {
  id: 16027,
  enrollmentStatus: 'REJECTED',
  lastActivityAt: dayjs('2024-06-26T07:14'),
  enrollmentDate: dayjs('2024-06-26T18:00'),
};

export const sampleWithFullData: IEnrollment = {
  id: 11401,
  enrollmentStatus: 'REJECTED',
  lastActivityAt: dayjs('2024-06-26T20:05'),
  enrollmentDate: dayjs('2024-06-26T08:43'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'REJECTED',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
