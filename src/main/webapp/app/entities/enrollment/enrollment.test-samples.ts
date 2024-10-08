import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 551,
  enrollmentStatus: 'ACTIVE',
};

export const sampleWithPartialData: IEnrollment = {
  id: 6373,
  enrollmentStatus: 'REJECTED',
  lastActivityAt: dayjs('2024-06-26T06:37'),
  enrollmentDate: dayjs('2024-06-27T02:20'),
};

export const sampleWithFullData: IEnrollment = {
  id: 19765,
  enrollmentStatus: 'PENDING',
  lastActivityAt: dayjs('2024-06-26T10:14'),
  enrollmentDate: dayjs('2024-06-26T11:47'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
