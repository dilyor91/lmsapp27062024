import dayjs from 'dayjs/esm';

import { IEnrollment, NewEnrollment } from './enrollment.model';

export const sampleWithRequiredData: IEnrollment = {
  id: 9582,
  enrollmentStatus: 'REJECTED',
};

export const sampleWithPartialData: IEnrollment = {
  id: 3415,
  enrollmentStatus: 'PENDING',
  lastActivityAt: dayjs('2024-06-27T00:26'),
  enrollmentDate: dayjs('2024-06-26T11:48'),
};

export const sampleWithFullData: IEnrollment = {
  id: 25116,
  enrollmentStatus: 'REJECTED',
  lastActivityAt: dayjs('2024-06-26T11:56'),
  enrollmentDate: dayjs('2024-06-27T02:02'),
};

export const sampleWithNewData: NewEnrollment = {
  enrollmentStatus: 'PENDING',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
