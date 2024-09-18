import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 13041,
  enrollmentStatus: 'REJECTED',
};

export const sampleWithPartialData: IEnrollment = {
  id: 12228,
  enrollmentStatus: 'ACTIVE',
  lastActivityAt: dayjs('2024-06-26T19:38'),
};

export const sampleWithFullData: IEnrollment = {
  id: 17295,
  enrollmentStatus: 'PENDING',
  lastActivityAt: dayjs('2024-06-26T21:31'),
  enrollmentDate: dayjs('2024-06-26T14:19'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
