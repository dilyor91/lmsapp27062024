import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 11124,
  enrollmentStatus: 'REJECTED',
};

export const sampleWithPartialData: IEnrollment = {
  id: 30832,
  enrollmentStatus: 'PENDING',
  enrollmentDate: dayjs('2024-06-26T12:55'),
};

export const sampleWithFullData: IEnrollment = {
  id: 31997,
  enrollmentStatus: 'ACTIVE',
  lastActivityAt: dayjs('2024-06-27T03:30'),
  enrollmentDate: dayjs('2024-06-27T05:59'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
