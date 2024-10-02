import dayjs from 'dayjs/esm';

import { IGrade, NewGrade } from './grade.model';

export const sampleWithRequiredData: IGrade = {
  id: 17082,
};

export const sampleWithPartialData: IGrade = {
  id: 27684,
  gradedDate: dayjs('2024-07-09T12:16'),
};

export const sampleWithFullData: IGrade = {
  id: 17460,
  point: 1733,
  gradedDate: dayjs('2024-07-09T23:06'),
};

export const sampleWithNewData: NewGrade = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
